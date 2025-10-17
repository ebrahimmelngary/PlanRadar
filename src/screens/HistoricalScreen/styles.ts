import { StyleSheet } from "react-native";
import { Colors } from "../../constant/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  forecastContainer: {
    marginTop: 16,
    justifyContent: 'space-between',
  },

  forecastCard: {
    flexDirection:'row',
height:72,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  date:{
color:Colors.gray,
    fontSize: 12,

  },
  list:{
paddingVertical:16,
  },
  forecastDate: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 4,
  },
    forecastIcon: {
    width: 50,
    height: 50,
    justifyContent:'center',
    alignItems:'center',
    marginRight:16,
  },
});
