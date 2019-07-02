import { createStackNavigator } from 'react-navigation';
import SearchScreen from './SearchScreen';

const SearchNavigator = createStackNavigator({
  list: {
    screen: SearchScreen,
    navigationOptions: {
      title: 'Search Gifs',
    },
  },
  details: SearchScreen,
});

export default SearchNavigator;
