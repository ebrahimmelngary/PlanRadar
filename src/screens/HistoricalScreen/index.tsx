import * as React from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AutoSkeletonView } from 'react-native-auto-skeleton';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from './styles';
import { useWeatherData } from '../../hooks/useWeatherData';
import { CONFIG } from '../../configs';
import { WeatherData } from '../../types';
import Header from '../../components/Header';
import { Icons } from '../../constant/icons';

const HistoricalScreen = () => {
  const navigation = useNavigation();
  const { cityName } = useRoute().params as { cityName: string };
  const { forecast, loading } = useWeatherData(cityName);

  const renderItem = ({ item }: { item: WeatherData }) => (
    <AutoSkeletonView isLoading={loading}>
      <TouchableOpacity
        style={styles.forecastCard}
        onPress={() =>
          navigation.navigate(
            'DetailsScreen' as never,
            {
              cityName,
              weatherData: item,
            } as never,
          )
        }
      >
        <Image
          style={styles.forecastIcon}
          source={{
            uri: `${CONFIG.Base_URL}/img/wn/${item.weather[0].icon}@2x.png`,
          }}
        />
        <View>
          <Text style={styles.date}>
            {new Date(item.dt * 1000).toDateString()}
          </Text>

          <Text style={styles.forecastDate}>
            {`${item?.weather[0].description}, ${Math.round(item.main.temp)}`}°C
          </Text>
        </View>
      </TouchableOpacity>
    </AutoSkeletonView>
  );

  const keyExtractor = (item: WeatherData, index: number) =>
    `${item.dt}-${index}`;

  return (
    <View style={styles.container}>
      <Header title={`${cityName} ${' '}Historical`} withBackButton />
      <ImageBackground style={styles.container} source={Icons.background}>
        <FlatList
          data={forecast}
          style={styles.list}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </ImageBackground>
    </View>
  );
};

export default HistoricalScreen;
