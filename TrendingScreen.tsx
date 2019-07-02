import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import React, { useState } from 'react';
import GifList from './GifList';
import TrendingGifsQuery from './TrendingGifsQuery';

const TrendingScreen = ({ navigation }) => {
  return (
    <TrendingGifsQuery>
      {({ trendingGifs: gifs, fetchMore }) => {
        return (
          <View style={{ flex: 1 }}>
            {gifs ? (
              <GifList
                gifs={gifs}
                onEndReached={() =>
                  fetchMore({
                    variables: {
                      offset: gifs.length,
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) {
                        return prev;
                      }

                      return {
                        ...prev,
                        gifs: [
                          ...prev.trendingGifs,
                          ...fetchMoreResult.trendingGifs,
                        ],
                      };
                    },
                  })
                }
              />
            ) : (
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator />
              </View>
            )}
          </View>
        );
      }}
    </TrendingGifsQuery>
  );
};
export default TrendingScreen;
