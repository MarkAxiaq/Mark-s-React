const graphql = require('graphql');
const _ = require('lodash');
const UserModel = require('../mongoDBModels/user.model');
const WebsiteModel = require('../mongoDBModels/website.model');

//ES6 Distructure - Grabbing a variable from something else. In this case grabbing GraphQLObjectType and others from graphql
const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList, GraphQLBoolean, GraphQLInt} = graphql;

// WebsiteType is now a GraphQl Object
const WebsiteType = new GraphQLObjectType({
    name: 'Website',
    fields: () => ({
        // GraphQLID returns a string so the IDs have to be string
        id: {type: GraphQLID},
        name: {type: GraphQLString},
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt},
        contactNumber: {type: GraphQLInt},
        admin: {type: GraphQLBoolean},
        websites: {
            type: new GraphQLList(WebsiteType),
            resolve(parent, args){
                // if admin returns all websites else return the websites associated with the user
                return parent.admin? WebsiteModel.find({}) : WebsiteModel.find({_id : {$in: parent.websiteId}})
            }
        }
    })
});

// Root Queries are defined to retrieve data from front
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        website:{
            type: WebsiteType,
            args:{id: {type: GraphQLID}},
            resolve(parent, args) {
                // code to get data from MongoDB - findById is a mongoose function
                return WebsiteModel.findById(args.id);
            }
        },
        user:{
            type: UserType,
            args:{id: {type: GraphQLID}},
            resolve(parent, args) {
                return UserModel.findById(args.id);
            }
        },
        websites:{
            type: new GraphQLList(WebsiteType),
            resolve(parent, args){
                return WebsiteModel.find({});
            }
        },
        users:{
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return UserModel.find({});
            }
        }
    }
});

// Mutations are defined to add, edit or delete data from front
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addWebsite:{
            type: WebsiteType,
            args:{
                name: {type: GraphQLString}
            },
            resolve(parent, args){
                let website = new WebsiteModel({
                    name: args.name
                });
                // save is a function from mongoose to save to MongoDB - (WebsiteModel is a mongoose model, that's why save is available)
                return website.save();
            }
        },
        addUser:{
            type: UserType,
            args:{
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                age: {type: GraphQLInt},
                contactNumber: {type: GraphQLInt},
                admin: {type: GraphQLBoolean},
                websiteId: {type: new GraphQLList(GraphQLID)}
            },
            resolve(parent, args){
                let user = new UserModel({
                    name: args.name,
                    email: args.email,
                    age: args.age,
                    contactNumber: args.contactNumber,
                    admin: args.admin,
                    websiteId: args.websiteId
                });
                return user.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})