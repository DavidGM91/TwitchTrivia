
  
#  TwitchTrivia  
  
A  small  project where a customizable trivia can be  integrated  into a  bot.  
  
  
  
#  BotConfiguration  
  
Like with all node projects start by executing "npm  install" on the root directory to  install  all dependencies.  
  
Before this Trivia can work you'll need to assign it to a bot and at least one channel, to do so you will follow the console configuration helper with the following information:  
  
  
  
- [ ]  "username": Will hold  the  name  of your  bot.  
  
- [ ]  "token": Will be  your  OAuth  token, you can  generate  it  [here](https://twitchapps.com/tmi/)  while being logged into  twitch  
  
- [ ]  "channels" : Will be  a  list  of the  channels  you  want  the  bot  to work on, like "person1  person2".  
  
- [ ]  "questionCommand" : The command your users will input in the chat to receive a question.  
  
- [ ]  "answerCommand" : The  command  your  users  will input in the  chat  to answer a question.  
  
  
  
#  TriviaConfiguration  
  
You can customize and  translate  the Trivia with this  bot, to do so  edit  the  questions.json  file that's already loaded with a  sample Trivia  in castillian(Spanish).  
The  file  has  the following  parameters  to  configure:  
  

    questions:  
    This  is  where your  questions  go  with the following format.  
    After  the "question"  you  write  your  questions, and in "options"  you  put  the right answer first, and the  wrong  ones  after  that.  
    Don't worry the  order  will be  randomized so  no one will  know  with one  is  the  correct  one.  
    You  can  use  #name  in the  question  to  get  the  name  of the  player.  
    [  
    {  
    question: "question1",  
    "options": ["Answer", "Wrong1", "Wrong2",  etc.]  
    },  
    {  
    "question": "question2",  
    "options": ["Answer", "Wrong1", "Wrong2",  etc.]  
    },  
    etc.  
    ],  
      
    "nonNumeralResponse": What the bot will  say  when they get an answer outside the  possible  ones  or not a  number, you can  use  #name  to  say  the  name  of the  player.  
      
    "noQuestion": What the  bot  will  say  after they get an answer without having been  asked  for a  question  before, you can  use  #name  to  say  the  name  of the  player.  
      
    "options": The  text  that  divides  the Question and the  Options, use "Options: " when in  doubt.  
      
    "right": What the  bot  will  say  when they  get  a  right  answer, you can  use  #name  to  say  the  name  of the  player  and  #answer  for the  right  answer.  
      
    "wrong": What the  bot  will  say  when they  get  a  wrong  answer, you can  use  #name  to  say  the  name  of the  player  and  #answer  for the right  answer.  
      
    "unanswered": What the bot will say when they  ask  for a second question without answering the  one  before. After that a new question will be appended.  
      
    "language": What  language  is  your  file  in, just for the  file  reader's  information.  
      
    "version": What's  the  version  of this  file, just for the  file  reader's  information.

