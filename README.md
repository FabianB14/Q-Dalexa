# Java 401 Final Project

**Team Name** :

- Team tenykS

**Team Members** :

- Fabian Brooks - CodeStar/Dashboar
- Joachen Bush - Grunt Labourer #1
- Padmapriya Ganapathi - Github Guru
- Kevin Couture - Grunt labourer #2
- Christopher Coulon - Overlord/Dictator/Emotional Support

**Project Name** :

- Q&Alexa 

**Project Description** :  Interactive trivia game that implements an Alexa device and allows users to submit responses via SMS, to be displayed on a screen for a group.

**MVP** :

- IAM &amp; +3 AWS services
  - Lambda
  - CodeStar
  - Dynamo (Storing trivia questions and answers)
  - S3 (Java Zip Files)
  - Code Pipeline
    - Codeguide
- Alexa
  - Alexa Skill Kit
  - Alexa Developer Portal
  - Alexa Device
  - List of Questions (Trivia API)
- Track Leaderboard
- Testing (unit and integrated)
- README
- Presentation

**Stretch Goals** :

- Additional AWS Services
  - Pinpoint
  - Raspberry Pi (Display Results)
  - SNS
- User Interface front-end, display leadership board and answers on screen

**Project Requirements as stated on Canvas** :

- a coherent thing (product, service, tool, etc)
- uses IAM and at least 3 other AWS services to run (i.e. not including build/test/deploy tools)
- I would prefer it to contain a bit of java where possible
- contains CI/CD with CodePipeline
- testing, README, all the normal requirements (yes I&#39;ll put this in better words before project week)
- is professionally appropriate

**AWS Services:**

- IAM - Roles.
- S3 - Holds static files.
- DynamoDB - Holds questions and answers.
- Lambda - Functions.
- SNS - Used to send question to all subscribed users. Stretch: Text answer back.
- SQS - Queue, if required with SNS incoming responses.
- CodeStar - Makes our initial setup easier.

**User Stories** : ( **Stretch Goals** )

- **End User**
  - I want to have the ability to invocate the game with my Alexa.
  - I want the game to be interactive.
  - I want to be able to subscribe to and participate in the game.
  - I want to be able to respond to game questions by texting answers to a phone number.
  - I would like the questions in the game to be engaging and covering a variety of topics.
  - I would prefer to have a leaderboard to make competing fun.
  - I would like to be able to select the number of questions to be asked in the game.
  - I would like to be able to select easier or harder questions based on the people playing.
  - I want to be told whether my answer is correct or wrong.
  - I would like to be able to select from several categories of questions.
  - I would like to be able to ask Alexa for more clear instructions.
  - I would like to be able to invite other users to play via SMS.
  - I would like to be able to see a leaderboard up on a screen tracking each player&#39;s score as the game progresses.
  - On-going games that are interactive



- **Developer**
  - I want DRY, readable and modular code
  - I want to have well defined intents for the Alexa skill being implemented
  - I would like to use a deployment pipeline to make code deployments automated.
  - I would like to implement CodeStar to assist in managing our project work-flow and assist with initial start-up.
  - I would like to implement both unit and interface testing on the application.
  - I want users to be able to subscribe to the game on the fly, able to join games that are currently in progress.
  - I want users to be able to quickly start a game without having to select the category, difficulty and number of questions.

**Important Links:**

**Wireframe:** 
[https://drive.google.com/file/d/1jgKjZctFarJKGJA7gzThuQbuIekbd5CB/view?usp=sharing](https://drive.google.com/file/d/1jgKjZctFarJKGJA7gzThuQbuIekbd5CB/view?usp=sharing)

**Trello Board:**
[https://trello.com/b/qgsNGzFx/qalexa](https://trello.com/b/qgsNGzFx/qalexa)

**GitHub Repo:**
[https://github.com/FabianB14/QandAlexa](https://github.com/FabianB14/QandAlexa)

As a team we will utilize the AWS service CodeStar to track both tasks and work performed. We will use our time at daily standup/retro to track progress, assign new tasks, and communicate what our needs and blocks are to one another.

**Git Process**

**Never allow Kevin the opportunity to Push to Master!**

As a team we will utilize CodeStar to manage version control and submit Pull Requests. We will make use of dev and prod environments and for PR review one other member not on the pair coding the given PR will review and sign off on the PR and merge it into the dev branch.

**Conflict Resolution**

If disagreements arise during the production of Game Night, the following procedures will be followed in order to facilitate effective discourse and reach a commonly agreed upon solution in a timely manner.

An opportunity will be provided for each side to present their respective side to the group as a whole. This discourse will last 5-10 minutes at which time, the group as a whole will decide, through popular vote, which course of action to pursue. Once the decision has been made there will no longer be further debate and the group will move forward adopting the agreed upon decision.

Poor performance by one member will be addressed as a group. The intent of this intervention will be to highlight and address the issues on hand and more importantly to highlight a way forward that is agreed upon by the majority of group.

Individuals will be approached twice by the group for any one issue. If that individual is disinclined to display any effort to improve the issue will be raised to the next higher level. In this case it will be the class instructor.

Daily workflow:

- 0930 Internal team synch - identify goals and obstacles for the day
- 1000 Stand-up with instructor and TAs
- 1645 End-of-Day team wrap-up
- AD HOC: Group review of code (set for 1 hour blocks)

Primary means of communication: Team Slack Channel