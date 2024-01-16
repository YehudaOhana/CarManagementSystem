import { GraphQLError } from 'graphql/error';

export const isGraphQLError = (error: unknown): error is GraphQLError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as GraphQLError).message === 'string'
  );
};
