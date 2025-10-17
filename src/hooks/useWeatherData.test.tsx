import { renderHook, act, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import { useWeatherData } from './useWeatherData';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useWeatherData', () => {
  const mockCity = 'London';
  const mockWeatherData = {
    data: {
      name: mockCity,
      weather: [{ description: 'Sunny' }],
      main: { temp: 25 },
    },
  };
  const mockForecastData = {
    data: {
      list: Array.from({ length: 40 }, (_, i) => ({
        dt: i,
        main: { temp: 20 + i },
        weather: [{ description: 'Clear' }],
      })),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and sets weather + forecast successfully', async () => {
    mockedAxios.get
      .mockResolvedValueOnce(mockWeatherData)
      .mockResolvedValueOnce(mockForecastData);

    const { result } = renderHook(() => useWeatherData(mockCity));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.weather).toEqual(mockWeatherData.data);
    expect(result.current.forecast.length).toBe(5); // since we slice(0,5)
    expect(result.current.city).toBe(mockCity);
    expect(result.current.error).toBeNull();
  });

  it('handles API error gracefully', async () => {
    mockedAxios.get.mockRejectedValueOnce({ message: 'Network Error' });

    const { result } = renderHook(() => useWeatherData(mockCity));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Network Error');
    expect(result.current.weather).toBeUndefined();
  });

  it('allows manual fetchWeather call', async () => {
    mockedAxios.get
      .mockResolvedValueOnce(mockWeatherData)
      .mockResolvedValueOnce(mockForecastData);

    const { result } = renderHook(() => useWeatherData('Cairo'));

    await act(async () => {
      await result.current.fetchWeather('Paris');
    });

    expect(result.current.city).toBe('London');
    expect(result.current.weather).toEqual(mockWeatherData.data);
    expect(result.current.forecast.length).toBe(5);
  });
});
