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
