import GifsQuery from './GifsQuery';
import { View, FlatList, Text } from 'react-native';
import { TextInput, Card, ActivityIndicator } from 'react-native-paper';
import React, { useState } from 'react';
import debounce from 'lodash.debounce';
import GifList from './GifList';

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  return (
    <GifsQuery variables={{ search: search }}>
      {({ gifs, fetchMore, loading }) => {
        return (
          <View style={{ flex: 1 }}>
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderBottomColor: '#555',
                marginBottom: 10,
              }}
            >
              <TextInput
                label="Search"
                mode="outlined"
                onChangeText={debounce(setSearch, 400)}
                autoCorrect={false}
                style={{ backgroundColor: 'white' }}
              />
            </View>
            <View style={{ justifyContent: 'center', flex: 1 }}>
              {(() => {
                if (!search) {
                  return (
                    <Text style={{ textAlign: 'center' }}>
                      Search for gifs...
                    </Text>
                  );
                }
                if (loading) {
                  return <ActivityIndicator />;
                }
                if (!gifs) {
                  return <Text>{`No results for '${search}'`}</Text>;
                }

                return (
                  <GifList
                    gifs={gifs}
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
                  />
                );
              })()}
            </View>
          </View>
        );
      }}
    </GifsQuery>
  );
};
export default SearchScreen;
