// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const aws = require('aws-sdk');
const Alexa = require('ask-sdk-core');
var lambda = new aws.Lambda({
  region: 'us-west-2' //change to your region
});

const LaunchRequestHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
      sessionAttributes.score = 0;
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      const speechText = 'Welcome to tenyks, choose a mode.';
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    }
};
const SatrtGameIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'StartGameIntent';
  },
  handle(handlerInput) {
    const speechText = 'Choose a category, a difficulty and a number of questions';
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt('You could choose categories like Japanese Anime and Manga, Video Games, Geography or Science and Nature')
      .getResponse();
  }
};
const GameSetupIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GameSetupIntent';
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    sessionAttributes.score = 0;
    const difficulty = Alexa.getSlotValue(handlerInput.requestEnvelope, 'Difficulty');
    const numberOfQuestions = Alexa.getSlotValue(handlerInput.requestEnvelope, 'NumberOfQuestions');
    sessionAttributes.totalQs = numberOfQuestions;
    const category = Alexa.getSlotValue(handlerInput.requestEnvelope, 'Category');
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
    console.log(category)
    const speakOutput = 'I am generating your questions, when you are ready you can say start game or ready to go.';
    //const speechText = 'Ready to Start!';
    var input = {
      'category': category,
       'difficulty':difficulty,
       'numberOfQuestions': numberOfQuestions
    };
    lambda.invoke({
      FunctionName: 'retrieveFromDB',
      Payload: JSON.stringify(input), // pass params
      InvocationType: 'Event'
     }, function(error, data) {
      if (error) {
        console.log('This is an error'+ error);
      }
      if(data){
       console.log('This should show the payload'+ data.Payload)
      }
     });
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};
const AskQuestionIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AskQuestionIntent';
  },
  async handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    let speechText = 'Choose a different category difficulty or number of questions ';
   var questReturn = lambda.invoke({
     FunctionName: 'getQuestionsFromQueue',
     InvocationType: 'RequestResponse'
   }, function (error, data) {
     if (error) {
       console.log('This is an error' + error);
     }
     if (data) {
       console.log('This should show the payload' + data.Payload);
     }
   }).promise();
   sessionAttributes.questionAndAnswer = await questReturn.then(x =>JSON.parse((x.Payload)).split('||'));
   handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
    return handlerInput.responseBuilder
      .speak(sessionAttributes.questionAndAnswer[0])
      .reprompt('You could choose categories like History, General Knowledge, Geography or Science and Nature')
      .getResponse();
  }
};
const AnswerIntentHandler = {
  canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
          && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AnswerIntent'
  },
  handle(handlerInput) {
      var CorrectAnswer;
      var Question;
      var nextIntent = 'QueueUpQuestionIntent';
      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
      if (sessionAttributes.questionAndAnswer[0] !== 'game over, would you like to hear your score') {
        CorrectAnswer = sessionAttributes.questionAndAnswer[1].toLowerCase();
        Question = sessionAttributes.questionAndAnswer[0];
      } else {
        return handlerInput.responseBuilder
          .speak('Your score is ' + sessionAttributes.score + ' correct answers out of ' + sessionAttributes.totalQs + ' total questions. If you would like to to play again just provide a number of questions and a difficulty.')
          .reprompt('Your score is ' + sessionAttributes.score + ' correct answers out of ' + sessionAttributes.totalQs + ' total questions. If you would like to to play again just provide a number of questions and a difficulty.')
          .getResponse();
      }
      const userAnswer = Alexa.getSlotValue(handlerInput.requestEnvelope, 'userAnswer');
      var speakOutput = 'You got it'
      if(userAnswer === CorrectAnswer) {
          speakOutput += ' right. Please say ready for the next question.';
          sessionAttributes.score++;
          handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
          nextIntent = 'QueueUpQuestionIntent';
      }
      else {
          speakOutput += ' wrong. Please say ready for the next question.';
      }
      return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(speakOutput)
          .getResponse();
  }
}; 
// const HelloWorldIntentHandler = {
//     canHandle(handlerInput) {
//       return handlerInput.requestEnvelope.request.type === 'IntentRequest'
//         && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
//     },
//     handle(handlerInput) {
//       const speechText = 'Hello World!';
//       return handlerInput.responseBuilder
//         .speak(speechText)
//         //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
//         .getResponse();
//     }
// };
const HelpIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
      const speechText = 'You can say hello to me! How can I help?';
     
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
          || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
   handle(handlerInput) {
      const speechText = 'Goodbye!';
      return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
      // Any cleanup logic goes here.
      return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
      const intentName = handlerInput.requestEnvelope.request.intent.name;
      const speechText = `You just triggered ${intentName}`;
 
      return handlerInput.responseBuilder
        .speak(speechText)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse();
   }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
      return true;
    },
    handle(handlerInput, error) {
      console.log(`~~~~ Error handled: ${error.message}`);
      const speechText = `Sorry, I couldn't understand what you said. Please try again.`;

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    }
};

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    SatrtGameIntentHandler,
    GameSetupIntentHandler,
    AskQuestionIntentHandler,
    AnswerIntentHandler,
    // HelloWorldIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
  .addErrorHandlers(
    ErrorHandler)
  .lambda();
