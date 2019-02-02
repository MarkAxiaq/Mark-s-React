const graphql = require('graphql');
const UserMongoModel = require('./userMongoDB.model');
const {UserType, AddUserType, UserLoginType} = require('./user.model');
const JWT = require("jsonwebtoken");
const passwordHash = require('password-hash');
const _ = require('lodash');

//ES6 Distructure - Grabbing a variable from something else. In this case grabbing GraphQLObjectType and others from graphql
const {
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull
} = graphql;

// QUERIES (GRABBING DATA)
const user = {
  type: UserType,
    args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    try {
      return UserMongoModel.findById(args.id);
    }
    catch(e){
      console.log(e)
    }
  }
};

const users = {
  type: new GraphQLList(UserType),
    resolve(parent, args) {
    try {
      return UserMongoModel.find({});
    }
    catch(e){
      console.log(e)
    }
  }
}

// MUTATIONS (ADD, UPDATE, DELETE)
const addUser = {
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
      const user = UserMongoModel.findOne({email: args.email});
      return user.then(user => {
        if(user){
          return {success: false, message: 'A user with the same email already exist'};
        }

        let newUser = new UserMongoModel({
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
};

const userLogin = {
  type: UserLoginType,
    args: {
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) }
  },
  resolve(parent, args) {
    try {
      const user = UserMongoModel.findOne({email: args.email});
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
};

module.exports = {user, users, addUser, userLogin};