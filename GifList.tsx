import React, { FunctionComponent } from 'react';
import { Gif } from './GifsQuery';
import { FlatList } from 'react-native';
import { Card } from 'react-native-paper';

const GifList: FunctionComponent<{
  gifs: Gif[];
  onEndReached: () => void;
}> = ({ gifs, onEndReached }) => {
  return (
    <FlatList
      style={{ width: '100%', backgroundColor: '#F2F2F2' }}
      data={gifs}
      keyExtractor={item => item.id}
      renderItem={({ item: gif }) => (
        <Card style={{ marginHorizontal: 10, marginVertical: 5 }} elevation={5}>
          <Card.Cover source={{ uri: gif.urlSmall }} />
          <Card.Title title={gif.title} />
        </Card>
      )}
      onEndReached={onEndReached}
    />
  );
};

export default GifList;
