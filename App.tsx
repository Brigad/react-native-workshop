import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import SearchNavigator from './SearchNavigator';
import TrendingNavigator from './TrendingNavigator';

const httpLink = new HttpLink({
  uri: 'https://giphy-graphql-api.herokuapp.com',
});
const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
});

const MainNavigator = createAppContainer(
  createBottomTabNavigator({
    trending: TrendingNavigator,
    search: SearchNavigator,
  }),
);

export default function App() {
  return (
    <ApolloProvider client={client}>
      <MainNavigator />
    </ApolloProvider>
  );
}
