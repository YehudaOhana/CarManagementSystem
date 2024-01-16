import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      clientMutationId
    }
  }
`;

export const LOGIN = gql`
  mutation MyMutation($email: String = "", $password: String = "") {
    authenticate(input: { email: $email, password: $password }) {
      query {
        userByEmail(email: $email) {
          name
        }
      }
      jwtToken
    }
  }
`;
