import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
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
import { storage } from '../../../App';
import { Icons } from '../../constant/icons';

const CitiesScreen = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [savedCities, setSavedCities] = useState<string[]>([]);
  const { city, weather, loading, error, fetchWeather } = useWeatherData('');

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
    navigation.navigate('DetailsScreen', { cityName });
  };

  const handleSearch = async () => {
    if (query.trim().length < 2) return;
    await fetchWeather(query.trim());
    setQuery('');
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

  return (
    <View style={styles.container}>
      <Header title="Cities" />
      <FlatList
        data={savedCities}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={renderCityItem}
        style={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text>No saved cities yet.</Text>
          </View>
        }
      />
      <ImageBackground style={styles.container} source={Icons.background}>
        <ReactNativeModal
          isVisible={isVisible}
          style={styles.modal}
          onBackdropPress={toggleModal}
        >
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.modalContent}>
              <View style={styles.searchContainer}>
                <Image source={Icons.search} style={styles.searchIcon} />
                <TextInput
                  placeholder="Enter city name"
                  value={query}
                  onChangeText={setQuery}
                />
              </View>

              <TouchableOpacity
                style={styles.searchButton}
                onPress={handleSearch}
                disabled={loading}
              >
                <Text style={styles.searchButtonText}>Search</Text>
              </TouchableOpacity>

              {loading && <ActivityIndicator color={Colors.primary} />}

              {error && <Text style={styles.error}>{error}</Text>}

              {weather ? (
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
              ) : (
                <View style={styles.noCityBox}>
                  <Text>Please write your city and click Search</Text>
                </View>
              )}
            </View>
          </KeyboardAvoidingView>
        </ReactNativeModal>

        <TouchableOpacity style={styles.button} onPress={toggleModal}>
          <Text style={styles.text}>Add City</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default CitiesScreen;
