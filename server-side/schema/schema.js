const graphql = require('graphql');
const _ = require('lodash');

//ES6 Distructure - Grabbing a variable from something else. In this case grabbing GraphQLObjectType and others from graphql
const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema} = graphql;

//TODO: Remove when data is grabed from DB
let websites = [
    {
        id: '1',
        name: 'Website 1'
    },
    {
        id: '2',
        name: 'Website 2'
    },
    {
        id: '3',
        name: 'Website 3'
    }
]


// WebsiteType is a GraphQl Object
const WebsiteType = new GraphQLObjectType({
    name: 'Website',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString}
    })
});

// Root Queries defined to get data from front
// Example:
// {
//     website(id: 2){
//         name
//     }
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
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})