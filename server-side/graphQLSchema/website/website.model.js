const graphql = require('graphql');

//ES6 Distructure - Grabbing a variable from something else. In this case grabbing GraphQLObjectType and others from graphql
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
} = graphql;

// WebsiteResponseType is now a GraphQl Object
const WebsiteResponseType = new GraphQLObjectType({
  name: 'WebsiteResponse',
  fields: () => ({
    success: { type: GraphQLBoolean },
    message: {type: GraphQLString},
    website: {type: WebsiteType},
  })
});

// WebsiteType is now a GraphQl Object
const WebsiteType = new GraphQLObjectType({
  name: 'Website',
  fields: () => ({
    // GraphQLID returns a string so the IDs have to be string
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});

module.exports = {WebsiteResponseType, WebsiteType}