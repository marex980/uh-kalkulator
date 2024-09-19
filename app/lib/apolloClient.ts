import { useMemo } from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export function useApollo() {
  const client = useMemo(() => {
    return new ApolloClient({
      link: new HttpLink({
        uri: '/api/graphql', // Your GraphQL endpoint
        credentials: 'same-origin', // Include cookies for authentication if needed
      }),
      cache: new InMemoryCache(),
    });
  }, []);

  return client;
}