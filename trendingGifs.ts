/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: trendingGifs
// ====================================================

export interface trendingGifs_trendingGifs_user {
  __typename: "User";
  displayName: string;
  avatarUrl: string;
}

export interface trendingGifs_trendingGifs {
  __typename: "Gif";
  id: string;
  title: string;
  url: string;
  urlSmall: string;
  source: string | null;
  user: trendingGifs_trendingGifs_user | null;
}

export interface trendingGifs {
  trendingGifs: trendingGifs_trendingGifs[];
}

export interface trendingGifsVariables {
  offset?: number | null;
}
