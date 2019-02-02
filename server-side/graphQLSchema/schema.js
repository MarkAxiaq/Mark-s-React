const graphql = require('graphql');

//ES6 Distructure - Grabbing a variable from something else. In this case grabbing GraphQLObjectType and others from graphql
const {
  GraphQLObjectType,
  GraphQLSchema,
} = graphql;

const {website, websites, addWebsite, updateWebsite, deleteWebsite} = require('./website/website.schema');
const {user, users, addUser, userLogin} = require('./user/user.schema');

// Root Queries are defined to retrieve data from front
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // WEBSITE
    website,
    websites,
    // USER
    user,
    users,
  }
});

// Mutations are defined to add, edit or delete data from front
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // WEBSITE
    addWebsite,
    updateWebsite,
    deleteWebsite,
    // USER
    addUser,
    userLogin
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
