import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { AutoSkeletonView } from 'react-native-auto-skeleton';
import { useRoute } from '@react-navigation/native';

import { useWeatherData } from '../../hooks/useWeatherData';
import styles from './styles';
import Header from '../../components/Header';
import { CONFIG } from '../../configs';
import { RowCard } from '../../components/RowCard';
import { WeatherData } from '../../types';

const DetailsScreen = () => {
  const { cityName, weatherData } = useRoute().params as {
    cityName: string;
    weatherData: WeatherData;
  };
  const { weather, loading } = useWeatherData(cityName);

  return (
    <View style={styles.container}>
      <Header title={''} withBackButton />
      <View style={styles.contentContainer}>
        <AutoSkeletonView isLoading={loading}>
          <Text style={styles.city}>{cityName}</Text>
          <Image
            style={styles.forecastIcon}
            source={{
              uri: `${CONFIG.Base_URL}/img/wn/${
                weatherData
                  ? weatherData?.weather[0]?.icon
                  : weather?.weather[0]?.icon
              }@4x.png`,
            }}
          />
          <RowCard
            label="Description"
            value={
              weather
                ? `${
                    weatherData
                      ? weatherData.weather[0].description
                      : weather.weather[0].description
                  } `
                : 'N/A'
            }
          />
          <RowCard
            label="Temperature"
            value={
              weather
                ? `${
                    weatherData ? weatherData.main.temp : weather.main.temp
                  } °C`
                : 'N/A'
            }
          />
          <RowCard
            label="Humidity"
            value={
              weather
                ? `${
                    weatherData
                      ? weatherData.main.humidity
                      : weather.main.humidity
                  }%`
                : 'N/A'
            }
          />

          <RowCard
            label="Wind Speed"
            value={
              weather
                ? `${
                    weatherData ? weatherData.wind.speed : weather.wind.speed
                  } km/s`
                : 'N/A'
            }
          />
        </AutoSkeletonView>
      </View>
    </View>
  );
};

export default DetailsScreen;
