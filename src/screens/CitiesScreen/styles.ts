import { StyleSheet } from 'react-native';
import { Colors } from '../../constant/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    paddingVertical: 16,
  },
  modalContent: {
    backgroundColor: Colors.secondary,
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 30,
    minHeight: '40%',
  },
  searchButton: {
    width: 70,
    height: 40,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 16,
    position: 'absolute',
    right: 16,
    top: 17,
  },
  searchButtonText: {
    color: Colors.secondary,
    fontWeight: 'bold',
  },
  searchContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    padding: 8,
    borderRadius: 8,
    borderColor: Colors.primary,
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 56,
    elevation: 3,
    backgroundColor: Colors.primary,
    position: 'absolute',
    bottom: 16,
    width: 137,
    height: 56,
    right: 16,
    zIndex: 1000,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 1.35,
    color: Colors.secondary,
  },
  forecastIcon: {
    width: 50,
    height: 50,
  },
  weatherBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 12,
  },

  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.primary,
    textDecorationColor: Colors.primary,
    textDecorationLine: 'underline',
  },
  error: {
    color: Colors.error,
  },
  searchIcon: { width: 24, height: 24 },
  cityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
  },
  cityCardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cityText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  locationIcon: {
    width: 24,
    height: 24,
    marginRight: 24,
  },
  infoIcon: {
    width: 30,
    height: 30,
  },
  noCityBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    flex: 1 / 2,
  },
});
