import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CitiesScreen from '../screens/CitiesScreen';
import DetailsScreen from '../screens/DetailsScreen';
import HistoricalScreen from '../screens/HistoricalScreen';
import { WeatherData } from '../types';

export type RootStackParamList = {
  CitiesScreen: undefined;
  DetailsScreen: {
    cityName: string;
    weatherData?: WeatherData;
  };
  HistoricalScreen: {
    cityName: string;
  };
};

export const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigation() {
  return (
    <Stack.Navigator initialRouteName="CitiesScreen">
      <Stack.Screen
        name="CitiesScreen"
        component={CitiesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HistoricalScreen"
        component={HistoricalScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigation;
