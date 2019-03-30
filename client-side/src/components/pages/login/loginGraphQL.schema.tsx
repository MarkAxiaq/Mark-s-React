import gql from 'graphql-tag';

const userLogin = gql`
    mutation($email: String!, $password: String!){
        userLogin(email: $email, password: $password) {
            success
            user {
                _id
                name
                surname
                email
                age
                contactNumber
                admin
                websites {
                  id
                  name
                }
            }
            message
        }
    }
`;

export {userLogin};