const graphql = require('graphql');
const _ = require('lodash');

//ES6 Distructure - Grabbing a variable from something else. In this case grabbing GraphQLObjectType and others from graphql
const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList, GraphQLBoolean} = graphql;

//TODO: Remove when data is grabed from DB
let websites = [
    {
        id: '1',
        name: 'Website 1',
    },
    {
        id: '2',
        name: 'Website 2',
    },
    {
        id: '3',
        name: 'Website 3',
    },
    {
        id: '4',
        name: 'Website 4',
    }
]

let users = [
    {
        id: '0',
        name: 'User 0',
        admin: true,
        websiteId: ['']
    },
    {
        id: '1',
        name: 'User 1',
        admin: false,
        websiteId: ['1']
    },
    {
        id: '2',
        name: 'User 2',
        admin: false,
        websiteId: ['2']
    },
    {
        id: '3',
        name: 'User 3',
        admin: false,
        websiteId: ['3', '4']
    }
]


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
        admin: {type: GraphQLBoolean},
        websites: {
            type: new GraphQLList(WebsiteType),
            resolve(parent, args){
                // if admin returns all websites else return the websites associated with the user
                return parent.admin? websites : _.filter(websites, (web) => _.includes(parent.websiteId, web.id));
            }
        }
    })
});

// Root Queries defined to get data from front
// Example:
// {
//   user(id: 0) {
//     name,
//     id,
//     admin,
//     website{
//       name,
//       id
//     }
//   }
// }
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        website:{
            type: WebsiteType,
            args:{id: {type: GraphQLID}},
            resolve(parent, args) {
                // code to get data from DB
                // using lodash function to find website from array
                return _.find(websites, {id: args.id});
            }
        },
        user:{
            type: UserType,
            args:{id: {type: GraphQLID}},
            resolve(parent, args) {
                return _.find(users, {id: args.id});
            }
        },
        websites:{
            type: new GraphQLList(WebsiteType),
            resolve(parent, args){
                return websites;
            }
        },
        users:{
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return users;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})