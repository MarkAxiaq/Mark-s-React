const express = require("express");
const session = require('express-session');
const graphqlHTTP = require("express-graphql");
const schema = require('./graphQLSchema/schema');
const mongoose = require('mongoose');
const cors = require("cors");
const {security} = require('./authSecurity/security');
const {
  port,
  nodeEnv,
  sessionName,
  sessionSecretKey,
  sessionLifeTime} = require('./envConfig');

// Connecting to mLab - A database as a service for MongoDB
mongoose.connect('mongodb://mark.axq:Passw0rd@ds115523.mlab.com:15523/web-trend')
mongoose.connection.once('open', () => {
  console.log('Connected to mLab - MongoDB is ready')
});

const app = express();

// Visit - https://www.npmjs.com/package/cors - For configuration options details
const corsOptions = {
  // ToDo: Change as necessary
  origin: 'http://localhost:1234',
  credentials: true,
  exposedHeaders:'auth'
};
// Allow cross-origin requests
app.use(cors(corsOptions));

// Storing secure HTTPs only cookie session - used for authentication
app.use(
  session({
    name: sessionName,
    secret: sessionSecretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: nodeEnv == 'production',
      maxAge: parseInt(sessionLifeTime),
    }
  })
);

// For every route that includes '/graphql', we are going to use graphqlHTTP from express-graphql which will let express understand graphql
// In the context part we are always validating the session - for every request
app.use(
  "/graphql",
  graphqlHTTP((request, response, graphQLParams) => {
    return {
      schema,
      graphiql: true,
      context: security(request, response)
    }
  })
);

app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
});