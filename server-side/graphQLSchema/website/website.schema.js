const graphql = require('graphql');
const WebsitMongoeModel = require('./websiteMogoDB.model');
const {WebsiteType, WebsiteResponseType}= require('./website.model');
//ES6 Distructure - Grabbing a variable from something else. In this case grabbing GraphQLObjectType and others from graphql
const {
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// QUERIES (GRABBING DATA)
const website = {
  type: WebsiteType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    // code to get data from MongoDB - findById is a mongoose function
    try {
      return WebsitMongoeModel.findById(args.id);
    }
    catch(e){
      console.log(e)
    }
  }
};

const websites = {
  type: new GraphQLList(WebsiteType),
  resolve(parent, args) {
    try {
      return WebsitMongoeModel.find({});
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
  resolve(parent, args) {
    try {
      const website = WebsitMongoeModel.findOne({name: args.name});
      return website.then(website => {
        if(website){
          return {success: false, message: 'A website with the same name already exist'};
        }

        let newWebsite = new WebsitMongoeModel({
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
  resolve(parent, args) {
    try {
      const website = WebsitMongoeModel.findOne({name: args.name});
      return website.then(website => {
        if(website){
          return {success: false, message: 'A website with the same name already exist'};
        }

        return {
          success: true,
          message: 'Website updated successfully',
          website: WebsitMongoeModel.findOneAndUpdate({_id: args.id}, {name: args.name})
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
  resolve(parent, args) {
    try {
      const website = WebsitMongoeModel.findOne({_id: args.id});
      return website.then(website => {
        if(!website){
          return {success: false, message: 'Website ID is incorrect'};
        }

        return {
          success: true,
          message: 'Website deleted successfully',
          website: WebsitMongoeModel.findOneAndDelete({_id: args.id})
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

