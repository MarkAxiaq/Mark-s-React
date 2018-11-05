import {gql} from "apollo-boost";

const getAllWebsites = gql`
    {
      websites {
        name,
        id
      }
    }
`;

const addWebsite = gql`
    mutation($name: String!){
        addWebsite(name: $name) {
            id,
            name
        }
    }
`;

const updateWebsite = gql`
    mutation($id:ID!, $name: String!){
        updateWebsite(id: $id, name: $name) {
            id,
            name
        }
    }
`;

const deleteWebsite = gql`
    mutation($id:ID!){
        deleteWebsite(id: $id) {
            id
            name
        }
    }
`;

export {getAllWebsites, addWebsite, updateWebsite, deleteWebsite};