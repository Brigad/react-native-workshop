import React, { ReactNode, FunctionComponent } from 'react';
import { Query, QueryResult, QueryProps } from 'react-apollo';

import {
  gif as GifQueryData,
  gifVariables as GifQueryVariables,
  gif_gif as Gif,
} from './gif';

import gifQuery from './gif.gql';

class BaseGifQuery extends Query<GifQueryData, GifQueryVariables> {}

interface GifQueryProps {
  children: (
    result: Omit<QueryResult<GifQueryData>, 'data'> & {
      gif: Gif | null;
    },
  ) => ReactNode;
  variables: GifQueryVariables;
}

const GifQuery: FunctionComponent<
  Omit<QueryProps<GifQueryData>, 'query' | 'children' | 'variables'> &
    GifQueryProps
> = ({ children, ...otherProps }) => (
  <BaseGifQuery {...otherProps} query={gifQuery}>
    {({ data, ...otherArgs }) =>
      children({
        ...otherArgs,
        gif: data && data.gif ? data.gif : null,
      })
    }
  </BaseGifQuery>
);

export default GifQuery;

export { Gif, GifQueryData, GifQueryVariables, GifQuery };
