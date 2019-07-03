/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: gif
// ====================================================

export interface gif_gif_user {
  __typename: "User";
  displayName: string;
  avatarUrl: string;
}

export interface gif_gif {
  __typename: "Gif";
  id: string;
  title: string;
  url: string;
  urlSmall: string;
  source: string | null;
  user: gif_gif_user | null;
}

export interface gif {
  gif: gif_gif;
}

export interface gifVariables {
  id: string;
}
