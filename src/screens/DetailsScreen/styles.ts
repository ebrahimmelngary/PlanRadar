import { StyleSheet } from 'react-native';
import { Colors } from '../../constant/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  city: {
    fontSize: 24,
    fontWeight: '500',
    alignSelf: 'center',
  },
  forecastIcon: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 50,
  },
  contentContainer: {
    width: '85%',
    backgroundColor: Colors.secondary,
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 16,
    alignSelf: 'center',
    position: 'absolute',
    top: '10%',
    paddingVertical: 24,
  },
  cityTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  weatherInfo: {
    fontSize: 18,
    marginBottom: 8,
  },
});
