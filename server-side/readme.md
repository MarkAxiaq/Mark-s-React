Server side Application built with NodeJs, Express and GraphQl

To start the application using nodemon which will monitor all changes and restart the app on every change --> nodemon app

To access the app go to localhost:4321 - Change port accordingly

If Error: listen EADDRINUSE :::4321 is displayed:
    1. lsof -i tcp:4321
    2. Copy PID
    3. kill -9 PID


