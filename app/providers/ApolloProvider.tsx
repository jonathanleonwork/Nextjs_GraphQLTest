'use client';

import { ApolloClient, InMemoryCache, ApolloProvider as Provider } from '@apollo/client';
import { ReactNode } from 'react';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

export const ApolloProvider = ({ children }: { children: ReactNode }) => {
  return <Provider client={client}>{children}</Provider>;
};