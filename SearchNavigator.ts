import { createStackNavigator } from 'react-navigation';
import SearchScreen from './SearchScreen';
import GifDetailsScreen from './GifDetailsScreen';

const SearchNavigator = createStackNavigator({
  list: {
    screen: SearchScreen,
    navigationOptions: {
      title: 'Search Gifs',
    },
  },
  details: {
    screen: GifDetailsScreen,
    navigationOptions: {
      title: 'Details of Gif',
    },
  },
});

export default SearchNavigator;
