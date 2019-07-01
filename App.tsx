import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider, Query } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import gifsQuery from './gifs.gql';

const httpLink = new HttpLink({
  uri: 'https://giphy-graphql-api.herokuapp.com',
});
const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Query query={gifsQuery}>
        {params => {
          console.log(params.data);
          return (
            <View style={styles.container}>
              <Text>Open up App.tsx to start working on your app!</Text>
            </View>
          );
        }}
      </Query>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
