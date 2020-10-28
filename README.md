# Overwatch Item Tracker -- DB Fork

Live version at: http://owarmory.com

**Overwatch Item Tracker enables you to track your Overwatch collection progress for every hero and event added to the game.** This fork adds a simple express backend, a sqlite database connection, and a button to generate a URL to share your item list. This was sponsored by a client I contacted on discord.

## Development
Development is done locally. You will need to host the site locally for it to work successfully. There are many methods to do this however it is recommended to use the provided package.json with NodeJS and Yarn.
NOTE: Google Drive integration has been disabled in this fork.

### Running

**Install NodeJS:** https://nodejs.org/en/
**Install Deps:** `yarn install`
**Run Migration:** `npx knex migrate:up`
**Run Server:** `node app.js` (or you can use pm2)

If you want to edit CSS you will also need to run gulp `gulp dev`

Then go to the provided url in your browser and DUN

# Donations and License note
While I have been told not to change the text of the LICENSE for this project, I do not drink beer, therefore please treat me to coffee instead.

# Future work
I will only be taking in bug fixes for this repo as well as pulling in changes from upstream as needed.
There is certainly room for growth in this project (See if it is possible to automatically fetch item lists? Use other unofficial OW APIs?), but I am not comfortable with building on top of this structure, and will thus be rewriting this application instead. Once that is completed, I will archive this repo and leave a link to that project in here (it will still be open source).

Intial design and concept created by Lalato & Izzepizze on [Reddit](https://www.reddit.com/r/Overwatch/comments/59bo66).
This codebase forked from: https://github.com/Js41637/Overwatch-Item-Tracker
