/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: gifs
// ====================================================

export interface gifs_gifs_user {
  __typename: "User";
  displayName: string;
  avatarUrl: string;
}

export interface gifs_gifs {
  __typename: "Gif";
  id: string;
  title: string;
  url: string;
  urlSmall: string;
  source: string | null;
  user: gifs_gifs_user | null;
}

export interface gifs {
  gifs: gifs_gifs[];
}

export interface gifsVariables {
  search: string;
  offset?: number | null;
}
