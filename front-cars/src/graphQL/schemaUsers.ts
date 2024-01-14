import { gql } from 'postgraphile';

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUsersTableInput!) {
    createUsersTable(input: $input) {
      clientMutationId
    }
  }
`;
