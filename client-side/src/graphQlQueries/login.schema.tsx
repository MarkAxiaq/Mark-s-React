import gql from 'graphql-tag';

const userLogin = gql`
    mutation($email: String!, $password: String!){
        userLogin(email: $email, password: $password) {
            success
            token
        }
    }
`;

export {userLogin};