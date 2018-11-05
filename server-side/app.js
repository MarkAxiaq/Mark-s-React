const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require('./graphQLSchema/schema')
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();

// Allow cross-origin requests
app.use(cors());

// Connecting to mLab - A database as a service for MongoDB
mongoose.connect('mongodb://mark.axq:Passw0rd@ds115523.mlab.com:15523/web-trend')
mongoose.connection.once('open', () => {
   console.log('Connected to mLab - MongoDB is ready')
});

// .use >> For every route that includes graphql >> We are going to use graphqlHTTP >> express-graphql which let express understand graphql
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(4321, () => {
    console.log("Listening on Port 4321");
});