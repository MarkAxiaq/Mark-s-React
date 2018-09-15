const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
const schema = require('./schema/schema')

// .use >> For every route that includes graphql >> We are going to use graphqlHTTP >> express-graphql which let express understand graphql
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(4321, () => {
    console.log("Listening on Port 4321");
});