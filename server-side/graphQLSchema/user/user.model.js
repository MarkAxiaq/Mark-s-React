const {WebsiteType} = require('../website/website.model');
const {WebsiteModel} = require('../website/websiteMogoDB.model');
const graphql = require('graphql');

//ES6 Distructure - Grabbing a variable from something else. In this case grabbing GraphQLObjectType and others from graphql
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
} = graphql;

// TODO: change user to token
const ReturnUserType = new GraphQLObjectType({
  name: 'ReturnUser',
  fields: () => ({
    success: { type: GraphQLBoolean },
    message: {type: GraphQLString},
    user: {type: UserType},
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    surname: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
    contactNumber: { type: GraphQLInt },
    admin: { type: GraphQLBoolean },
    websites: {
      type: new GraphQLList(WebsiteType),
      resolve(parent, args) {
        // if admin returns all websites else return the websites associated with the user
        try {
          return parent.admin
            ? WebsiteModel.find({})
            : WebsiteModel.find({ _id: { $in: parent.websiteId } });
        }
        catch(e){
          console.log(e)
        }
      }
    }
  })
});

module.exports = {UserType, ReturnUserType};