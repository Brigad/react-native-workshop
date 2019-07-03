import React from 'react';
import GifQuery from './GifQuery';
import { ActivityIndicator, View, Image, Text } from 'react-native';

const GifDetailsScreen = ({ navigation }) => {
  const gifId = navigation.getParam('id');
  if (!gifId) {
    return null;
  }
  return (
    <GifQuery variables={{ id: gifId }}>
      {({ gif }) => {
        if (!gif) {
          return (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ActivityIndicator />
            </View>
          );
        }
        return (
          <View style={{ flex: 1 }}>
            <Image source={{ uri: gif.url }} style={{ height: 300 }} />
            <Text>{gif.title}</Text>
            <Text>{gif.source}</Text>
            {gif.user && gif.user.displayName && (
              <Text>{gif.user.displayName}</Text>
            )}
            {gif.user && gif.user.avatarUrl && (
              <Image
                source={{ uri: gif.user.avatarUrl }}
                style={{ height: 100, width: 100 }}
              />
            )}
          </View>
        );
      }}
    </GifQuery>
  );
};

export default GifDetailsScreen;
