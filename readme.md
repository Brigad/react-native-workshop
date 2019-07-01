# BRIGAD Workshop

Welcome everyone 🤗!
Today we will learn the basics of several technologies we use everyday at Brigad:

- React-native
- Graphql
- TypeScript

1. Dependencies

We will use [expo](https://expo.io/) to build our app.

```
yarn global add expo-cli

expo-cli init giphyapp (or yourappname)

cd giphyapp (or yourappname)
```

Let's start our app !

```
yarn start
```

Let's also open the current folder in our favorite editor. If you don't have any, check out [VSCode](https://code.visualstudio.com/)

You can start playing with your app by adding any react-native [component](https://facebook.github.io/react-native/docs/view).

## STEP 1 - NETWORK

Let's connect our app to our API. We will use apollo to do so! You can explore the API here: https://giphy-graphql-api.herokuapp.com/

Let's install apollo:

```
yarn add apollo-client apollo-cache-inmemory apollo-link-http react-apollo graphql-tag graphql
```

1 - Let's create an apollo Client
https://www.apollographql.com/docs/react/api/apollo-client/#apolloclient
https://www.apollographql.com/docs/link/links/http/

You can make queries with the client to make sure everything is working fine

<details>
 <summary>Test hint</summary>

```
client
  .query({
    query: gql`
      {
        gifs(search: "banana") {
          id
          title
          urlSmall
       }
     }
    `
  })
  .then(result => console.log(result));
```

</details>
2 - Let's wrap our app inside an ApolloProvider
https://www.apollographql.com/docs/react/api/react-apollo/#apolloprovider

You can now use the Query component inside your app, so make sure it's working fine

3 - Let's move our queries to `.gql` files

```
yarn add -D @bam.tech/react-native-graphql-transformer@https://github.com/titozzz/react-native-graphql-transformer.git#cbd88cc5524b83f98e4f2cf8d5ed6430aac190a1
```

Create a `metro.config.js`

```
// eslint-disable-next-line import/no-extraneous-dependencies
const { getDefaultConfig } = require('metro-config');

const getSourceExts = async () => [
  ...(await getDefaultConfig()).resolver.sourceExts,
  'gql',
];

const getConfig = async () => ({
  ...(process.env.CI === 'true' ? { maxWorkers: 2 } : {}),
  transformer: {
    babelTransformerPath: require.resolve(
      '@bam.tech/react-native-graphql-transformer',
    ),
  },
  resolver: {
    sourceExts: await getSourceExts(),
  },
});

module.exports = getConfig();
```

gifs.gql

```
query gifs($search: String!) {
  gifs(search: $search) {
    id
    title
    urlSmall
  }
}
```

App.tsx

```
import gifsQuery from './gifs.gql';
```

gql.d.ts

```
declare module '*.gql' {
  const content: DocumentNode;
  export default content;
}
```

4 - Let's generate types from the back-end

Let's install the apollo CLI:

```
yarn add -D apollo
```

Create an `apollo.config.js` file containing

```
module.exports = {
  client: {
    service: {
      name: 'giphy',
      url: 'https://giphy-graphql-api.herokuapp.com',
      includes: [`./**/*.gql`],
    },
  },
};

```

And run:

```
yarn apollo client:codegen . -c=apollo.config.js --target=typescript --includes=./**/*.gql
```

Or add a new script in your package.json

```
"codegen": "yarn apollo client:codegen . -c=apollo.config.js --target=typescript --includes=./**/*.gql"
```

and run `yarn codegen`

You should have one generated `.ts` file per `.gql` file you have. You should re-run the command everytime you update your `.gql` files.

Last step: create a React component that will understand the types returned by the servers:

GifsQuery.tsx

```
import React, { ReactNode, FunctionComponent } from 'react';
import { Query, QueryResult, QueryProps } from 'react-apollo';

import {
  gifs as GifsQueryData,
  gifsVariables as GifsQueryVariables,
  gifs_gifs as Gif,
} from './gifs';

import gifsQuery from './gifs.gql';

class BaseGifsQuery extends Query<GifsQueryData, GifsQueryVariables> {}

interface GifsQueryProps {
  children: (
    result: Omit<QueryResult<GifsQueryData>, 'data'> & {
      gifs: Gif[] | null;
    },
  ) => ReactNode;
  variables: GifsQueryVariables;
}

const GifsQuery: FunctionComponent<
  Omit<QueryProps<GifsQueryData>, 'query' | 'children' | 'variables'> &
    GifsQueryProps
> = ({ children, ...otherProps }) => (
  <BaseGifsQuery {...otherProps} query={gifsQuery}>
    {({ data, ...otherArgs }) =>
      children({
        ...otherArgs,
        gifs: data && data.gifs ? data.gifs : null,
      })
    }
  </BaseGifsQuery>
);

export default GifsQuery;

export { Gif, GifsQueryData, GifsQueryVariables, GifsQuery };
```

```
import GifsQuery from './GifsQuery';
```

## STEP 2 - DISPLAY EVERYTHING

1 - You should display a list of gifs inside your app. Feel free to use any component you like to do so, be creative!

Bonus: You can add a text input to search any gifs you want! (if you do that maybe have a [look](https://www.npmjs.com/package/lodash.debounce) to this.

2 - Let's add some navigation to the app

```
 yarn add react-navigation
```

3 - Add some navigators... (stack, tab, etc)

4 - Infinite loading

If you have implemented a FlatList, try `onEndReached`

```
                onEndReached={() =>
                  fetchMore({
                    variables: {
                      search: search || 'banana',
                      offset: gifs.length,
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) {
                        return prev;
                      }

                      return {
                        ...prev,
                        gifs: [...prev.gifs, ...fetchMoreResult.gifs],
                      };
                    },
                  })
                }
```

Don't forget to update `gifs.gql` with the offset variable

```
query gifs($search: String!, $offset: Int) {
  gifs(search: $search, offset: $offset) {
    id
    title
    url
    urlSmall
    source
    user {
      displayName
      avatarUrl
    }
  }
}
```

## STEP 3 - BE CREATIVE

You now have enougth tools to build a small app!
List of things you could do:

- https://docs.expo.io/versions/latest/react-native/share/
- https://github.com/fram-x/FluidTransitions
- https://facebook.github.io/react-native/docs/animated // https://github.com/kmagiera/react-native-reanimated
