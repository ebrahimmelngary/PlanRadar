import { StyleSheet } from 'react-native';
import { Colors } from '../../constant/colors';

export default StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: Colors.primary,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    color: Colors.secondary,
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  backButton: {
    width: 50,
    height: 50,
  },
  icon: {
    width: '100%',
    height: '100%',
    tintColor: Colors.secondary,
  },
});
