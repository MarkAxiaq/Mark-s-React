const graphql = require('graphql');
const WebsiteMongoModel = require('./websiteMogoDB.model');
const {WebsiteType, WebsiteResponseType}= require('./website.model');
//ES6 Distructure - Grabbing a variable from something else. In this case grabbing GraphQLObjectType and others from graphql
const {
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList
} = graphql;

// QUERIES (GRABBING DATA)
const website = {
  type: WebsiteType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args, context) {
    // code to get data from MongoDB - findById is a mongoose function
    try {
      return WebsiteMongoModel.findById(args.id);
    }
    catch(e){
      console.log(e)
    }
  }
};

const websites = {
  type: new GraphQLList(WebsiteType),
  resolve(parent, args, context) {
    try {
      return WebsiteMongoModel.find({});
    }
    catch(e){
      console.log(e)
    }
  }
};


// MUTATIONS (ADD, UPDATE, DELETE)
const addWebsite = {
  type: WebsiteResponseType,
    args: {
    name: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(parent, args, context) {
    try {
      const website = WebsiteMongoModel.findOne({name: args.name});
      return website.then(website => {
        if(website){
          return {success: false, message: 'A website with the same name already exist'};
        }

        let newWebsite = new WebsiteMongoModel({
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
};

const updateWebsite = {
  type: WebsiteResponseType,
    args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(parent, args, context) {
    try {
      const website = WebsiteMongoModel.findOne({name: args.name});
      return website.then(website => {
        if(website){
          return {success: false, message: 'A website with the same name already exist'};
        }

        return {
          success: true,
          message: 'Website updated successfully',
          website: WebsiteMongoModel.findOneAndUpdate({_id: args.id}, {name: args.name})
        };
      });
    }
    catch(e) {
      console.log(e)
      return {success:false, message: e}
    }
  }
};

const deleteWebsite = {
  type: WebsiteResponseType,
    args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(parent, args, context) {
    try {
      const website = WebsiteMongoModel.findOne({_id: args.id});
      return website.then(website => {
        if(!website){
          return {success: false, message: 'Website ID is incorrect'};
        }

        return {
          success: true,
          message: 'Website deleted successfully',
          website: WebsiteMongoModel.findOneAndDelete({_id: args.id})
        };
      });
    }
    catch(e) {
      console.log(e)
      return {success:false, message: e}
    }
  }
};

module.exports = {website, websites, addWebsite, updateWebsite, deleteWebsite};

