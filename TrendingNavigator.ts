import { createStackNavigator } from 'react-navigation';
import SearchScreen from './SearchScreen';
import TrendingScreen from './TrendingScreen';

const TrendingNavigator = createStackNavigator({
  list: {
    screen: TrendingScreen,
    navigationOptions: {
      title: 'Trending Gifs',
    },
  },
  details: SearchScreen,
});

export default TrendingNavigator;
