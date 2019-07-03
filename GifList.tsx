import React, { FunctionComponent } from 'react';
import { Gif } from './GifsQuery';
import { FlatList, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

const GifList: FunctionComponent<{
  gifs: Gif[];
  onEndReached: () => void;
  onCardPress?: (id) => void;
}> = ({ gifs, onEndReached, onCardPress }) => {
  return (
    <FlatList
      style={{ width: '100%', backgroundColor: '#F2F2F2' }}
      data={gifs}
      keyExtractor={item => item.id}
      renderItem={({ item: gif }) => (
        <TouchableOpacity
          onPress={() => {
            if (onCardPress) {
              onCardPress(gif.id);
            }
          }}
        >
          <Card
            style={{ marginHorizontal: 10, marginVertical: 5 }}
            elevation={5}
          >
            <Card.Cover source={{ uri: gif.urlSmall }} />
            <Card.Title title={gif.title} />
          </Card>
        </TouchableOpacity>
      )}
      onEndReached={onEndReached}
    />
  );
};

export default GifList;
