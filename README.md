# TwitchTrivia
 A small project where a customizable trivia can be integrated into a bot.

# Configuration 
Like with all node projects start by executing "npm install" on the root directory to install all dependencies.
Before this project can work you need to asign it to a bot and at least one channel, to do so you will rename and edit the 'configTEMPLATE.json' file, renaming it to 'config.json' with the next atributes:

 - [ ] "username": Will hold the name of your bot.
 - [ ] "token": Will be your OAuth token, you can generate it here while being logged into twitch
       [here](https://twitchapps.com/tmi/)
- [ ]  "channels" : Will be a list of the channels you want the bot to work on, like ["person 1"].
