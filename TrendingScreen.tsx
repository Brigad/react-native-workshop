import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import React from 'react';
import GifList from './GifList';
import TrendingGifsQuery from './TrendingGifsQuery';

const TrendingScreen = ({ navigation }) => {
  return (
    <TrendingGifsQuery>
      {({ trendingGifs, fetchMore }) => {
        return (
          <View style={{ flex: 1 }}>
            {trendingGifs ? (
              <GifList
                gifs={trendingGifs}
                onEndReached={() =>
                  fetchMore({
                    variables: {
                      offset: trendingGifs.length,
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) {
                        return prev;
                      }

                      return {
                        ...prev,
                        trendingGifs: [
                          ...prev.trendingGifs,
                          ...fetchMoreResult.trendingGifs,
                        ],
                      };
                    },
                  })
                }
                onCardPress={id => {
                  navigation.navigate('details', { id });
                }}
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
