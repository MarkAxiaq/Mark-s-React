const graphql = require('graphql');
const UserModel = require('../mongoDBModels/user.model');
const WebsiteModel = require('../mongoDBModels/website.model');
const JWT = require("jsonwebtoken");
const passwordHash = require('password-hash');
const _ = require('lodash');

//ES6 Distructure - Grabbing a variable from something else. In this case grabbing GraphQLObjectType and others from graphql
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull
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

const UserLoginType = new GraphQLObjectType({
  name: 'UserLogin',
  fields: () => ({
    success: {type: GraphQLBoolean},
    message: {type: GraphQLString},
    token: {type: GraphQLString}
  })
});

// TODO: change user to token
const AddUserType = new GraphQLObjectType({
  name: 'AddUser',
  fields: () => ({
    success: { type: GraphQLBoolean },
    message: {type: GraphQLString},
    user: {type: UserType}
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
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

// Root Queries are defined to retrieve data from front
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    website: {
      type: WebsiteType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from MongoDB - findById is a mongoose function
        try {
            return WebsiteModel.findById(args.id);
        }
        catch(e){
           console.log(e)
        }
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        try {
            return UserModel.findById(args.id);
        }
        catch(e){
           console.log(e)
        }
      }
    },
    websites: {
      type: new GraphQLList(WebsiteType),
      resolve(parent, args) {
        try {
            return WebsiteModel.find({});
        }
        catch(e){
            console.log(e)
        }
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        try {
            return UserModel.find({});
        }
        catch(e){
            console.log(e)
        }
      }
    }
  }
});

// Mutations are defined to add, edit or delete data from front
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addWebsite: {
      type: WebsiteResponseType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        try {
          const website = WebsiteModel.findOne({name: args.name});
          return website.then(website => {
            if(website){
              return {success: false, message: 'A website with the same name already exist'};
            }

            let newWebsite = new WebsiteModel({
              name: args.name
            });

            return {success: true, message: 'Website added successfully', website: newWebsite.save()};
          });
        }
        catch(e) {
          console.log(e)
          return {success:false, message: e}
        }
      }
    },
    updateWebsite: {
      type: WebsiteResponseType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        try {
          const website = WebsiteModel.findOne({name: args.name});
          return website.then(website => {
            if(website){
              return {success: false, message: 'A website with the same name already exist'};
            }

            return {
              success: true,
              message: 'Website updated successfully',
              website: WebsiteModel.findOneAndUpdate({_id: args.id}, {name: args.name})
            };
          });
        }
        catch(e) {
          console.log(e)
          return {success:false, message: e}
        }
      }
    },
    deleteWebsite: {
      type: WebsiteResponseType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        try {
          const website = WebsiteModel.findOne({_id: args.id});
          return website.then(website => {
            if(!website){
              return {success: false, message: 'Website ID is incorrect'};
            }

            return {
              success: true,
              message: 'Website deleted successfully',
              website: WebsiteModel.findOneAndDelete({_id: args.id})
            };
          });
        }
        catch(e) {
          console.log(e)
          return {success:false, message: e}
        }
      }
    },
    addUser: {
      type: AddUserType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        surname: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) },
        contactNumber: { type: GraphQLNonNull(GraphQLInt) },
        admin: { type: GraphQLNonNull(GraphQLBoolean) },
        websiteId: { type: GraphQLNonNull(new GraphQLList(GraphQLID)) }
      },
      resolve(parent, args) {
        try {
          const user = UserModel.findOne({email: args.email});
          return user.then(user => {
            if(user){
              return {success: false, message: 'A user with the same email already exist'};
            }

            let newUser = new UserModel({
                name: args.name,
                surname: args.surname,
                email: args.email,
                password: passwordHash.generate(args.password),
                age: args.age,
                contactNumber: args.contactNumber,
                admin: args.admin,
                websiteId: args.websiteId
              });

            return {success: true, user: newUser.save()};
          });
        }
        catch(e) {
           console.log(e)
           return {success:false, message: e}
        }
      }
    },


    userLogin: {
      type: UserLoginType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        try {
          const user = UserModel.findOne({email: args.email});
          return user.then(user => {

            if (!user) {
              return {success: false, message: 'User does not exist'};
            }

            if(user && !passwordHash.verify(args.password, user.password)) {
              return {success: false, message: 'Incorrect Password'};
            }

            // Include only necessary properties to return
            const userProperties = _.pick(user, ['name', 'email', 'age', 'contactNumber', 'admin', 'websiteId']);
            const token = JWT.sign(userProperties, 'MarkPassPhraseToChange', {expiresIn: "8h"});
            return {success: true, token: token};
          });
        }
        catch(e) {
          console.log(e)
        }
      }
    }

  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
