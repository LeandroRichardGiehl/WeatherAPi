import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';
import { Weather } from '../types/weather';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Details: { city: string };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;


const HomeScreen = () => {
  const [city, setCity] = useState('London'); // Cidade padrão para teste
  const [weather, setWeather] = useState<Weather | null>(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get<Weather>(
        `https://api.weatherapi.com/v1/current.json?key=3e44623dbf524858b19233725241906&q=${city}&lang=pt`
      );
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Get Weather" onPress={fetchWeather} />
      {weather && (
        <WeatherCard
          city={weather.location.name}
          temperature={weather.current.temp_c}
          description={weather.current.condition.text}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

export default HomeScreen;