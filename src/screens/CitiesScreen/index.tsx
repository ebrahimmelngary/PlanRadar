import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import Header from '../../components/Header';
import { useWeatherData } from '../../hooks/useWeatherData';
import { CONFIG } from '../../configs';
import { Colors } from '../../constant/colors';
import { STORAGE_KEY } from '../../constant/keys';
import { useDebounce } from '../../hooks/useDebounce';
import { storage } from '../../../App';
import { Icons } from '../../constant/icons';

const CitiesScreen = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [savedCities, setSavedCities] = useState<string[]>([]);
  const { city, weather, loading, error, fetchWeather } = useWeatherData('');

  const debouncedQuery = useDebounce(query, 800);

  useEffect(() => {
    if (debouncedQuery.trim().length > 2) {
      fetchWeather(debouncedQuery.trim());
    }
  }, [debouncedQuery]);

  useEffect(() => {
    try {
      const data = storage.getString(STORAGE_KEY);
      if (data) {
        setSavedCities(JSON.parse(data));
      }
    } catch (e) {
      console.log('Error loading saved cities:', e);
    }
  }, []);

  useEffect(() => {
    if (weather?.name) {
      saveCity(weather.name);
    }
  }, [weather]);

  const saveCity = (newCity: string) => {
    try {
      const updated = Array.from(new Set([newCity, ...savedCities]));
      setSavedCities(updated);
      storage.set(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.log('Error saving city:', e);
    }
  };

  const handleCitySelect = (cityName: string) => {
    setQuery(cityName);
    navigation.navigate('DetailsScreen', { cityName });
  };

  const toggleModal = () => setIsVisible(!isVisible);

  const renderCityItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      onPress={() => handleCitySelect(item)}
      style={styles.cityCard}
    >
      <View style={styles.cityCardInfo}>
        <Image source={Icons.location} style={styles.locationIcon} />
        <Text style={styles.cityText}>{item}</Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('HistoricalScreen', { cityName: item })
        }
      >
        <Image source={Icons.info} style={styles.infoIcon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const citiesKeyExtractor = (item: string, index: number) =>
    `${item}-${index}`;

  return (
    <View style={styles.container}>
      <Header title="Cities" />
      <FlatList
        data={savedCities}
        keyExtractor={citiesKeyExtractor}
        renderItem={renderCityItem}
        style={styles.list}
        ListEmptyComponent={<Text>No saved cities yet.</Text>}
      />
      <ImageBackground style={styles.container} source={Icons.background}>
        <ReactNativeModal
          isVisible={isVisible}
          style={styles.modal}
          onBackdropPress={toggleModal}
        >
          <View style={styles.modalContent}>
            <View style={styles.searchContainer}>
              <Image source={Icons.search} style={styles.searchIcon} />
              <TextInput
                placeholder="Enter city name"
                value={query}
                onChangeText={setQuery}
              />
            </View>

            {loading && <ActivityIndicator color={Colors.primary} />}

            {error && <Text style={styles.error}>{error}</Text>}

            {weather && (
              <View style={styles.weatherBox}>
                <Text style={styles.city}>{city}</Text>
                <Text>{Math.round(weather.main.temp)}°C</Text>
                <Text style={styles.desc}>
                  {weather?.weather[0].description}
                </Text>
                <Image
                  style={styles.forecastIcon}
                  source={{
                    uri: `${CONFIG.Base_URL}/img/wn/${weather.weather[0].icon}@4x.png`,
                  }}
                />
              </View>
            )}
          </View>
        </ReactNativeModal>

        <TouchableOpacity style={styles.button} onPress={toggleModal}>
          <Text style={styles.text}>Add City</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default CitiesScreen;
