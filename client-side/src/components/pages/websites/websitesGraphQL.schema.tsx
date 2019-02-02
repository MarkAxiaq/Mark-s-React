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
            success,
            message,
            website {
                id,
                name,
            }
        }
    }
`;

const updateWebsite = gql`
    mutation($id:ID!, $name: String!){
        updateWebsite(id: $id, name: $name) {
            success,
            message,
            website {
                id,
                name,
            }
        }
    }
`;

const deleteWebsite = gql`
    mutation($id:ID!){
        deleteWebsite(id: $id) {
            success,
            message,
            website {
                id,
                name,
            }
        }
    }
`;

export {getAllWebsites, addWebsite, updateWebsite, deleteWebsite};