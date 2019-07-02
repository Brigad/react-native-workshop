import React, { ReactNode, FunctionComponent } from 'react';
import { Query, QueryResult, QueryProps } from 'react-apollo';

import {
  trendingGifs as TrendingGifsQueryData,
  trendingGifsVariables as TrendingGifsQueryVariables,
  trendingGifs_trendingGifs as TrendingGif,
} from './trendingGifs';

import trendingGifsQuery from './trendingGifs.gql';

class BaseTrendingGifsQuery extends Query<
  TrendingGifsQueryData,
  TrendingGifsQueryVariables
> {}

interface TrendingGifsQueryProps {
  children: (
    result: Omit<QueryResult<TrendingGifsQueryData>, 'data'> & {
      trendingGifs: TrendingGif[] | null;
    },
  ) => ReactNode;
}

const TrendingGifsQuery: FunctionComponent<
  Omit<QueryProps<TrendingGifsQueryData>, 'query' | 'children'> &
    TrendingGifsQueryProps
> = ({ children, ...otherProps }) => (
  <BaseTrendingGifsQuery {...otherProps} query={trendingGifsQuery}>
    {({ data, ...otherArgs }) =>
      children({
        ...otherArgs,
        trendingGifs: data && data.trendingGifs ? data.trendingGifs : null,
      })
    }
  </BaseTrendingGifsQuery>
);

export default TrendingGifsQuery;

export {
  TrendingGif,
  TrendingGifsQueryData,
  TrendingGifsQueryVariables,
  TrendingGifsQuery,
};
