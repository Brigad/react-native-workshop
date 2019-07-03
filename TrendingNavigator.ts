import { createStackNavigator } from 'react-navigation';
import SearchScreen from './SearchScreen';
import TrendingScreen from './TrendingScreen';
import GifDetailsScreen from './GifDetailsScreen';

const TrendingNavigator = createStackNavigator({
  list: {
    screen: TrendingScreen,
    navigationOptions: {
      title: 'Trending Gifs',
    },
  },
  details: {
    screen: GifDetailsScreen,
    navigationOptions: {
      title: 'Details of Gif',
    },
  },
});

export default TrendingNavigator;
