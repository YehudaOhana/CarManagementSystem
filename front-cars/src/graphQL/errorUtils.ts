import { ApolloError } from '@apollo/client';

export const isGraphQLError = (error: unknown): error is ApolloError => {
  return (
    error instanceof ApolloError &&
    error.graphQLErrors !== undefined &&
    error.graphQLErrors.length > 0
  );
};
