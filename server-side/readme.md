#Tech Used
This is a server side application built with NodeJs and Express

We are using express-graphql to build the GraphQL models, schema and resolvers

MLAB is being used as a Database-as-a-Service for MongoDB.

For database interaction we are using Mongoose.

For security and authentication we are using express-session and cors<br/>
• We are creating an HTTPS-only cookie and send it with every response<br/>
• This cookie is automatically sent back on every request made to this server and it is being constantly validated
* Against our secret key that should always be protected
* Session is not expired (We specify the time of expiration according to the needs)
* UserId is present in the session

#Usefull Info

Use **nodemon app** OR **npm start**, to start the application using nodemon which will monitor all changes and restart the app on every change (Hot Module Reloding)

To access the app go to localhost:4321 - Port can be changed accordingly

If Error: listen EADDRINUSE :::4321 is displayed: (Especially on MAC)
* lsof -i tcp:4321
* Copy PID
* kill -9 PID

# .ENV file
.env file is excluded from the project on purpose (git ignored) - as here we can store sensitive data required in the project.
If you clone the project you need to create your own .env file on the root folder.

Below there is an example of an .env file: (You can change accordingly)
####.env START
PORT=4321<br/>
NODE_ENV=development<br/>
SESSION_NAME=sId<br/>
SESSION_SECRET_KEY=MarkSecretKeyToChange<br/>
SESSION_LIFE_TIME=3600000
####.env END