import { StyleSheet } from "react-native";
import { Colors } from "../../constant/colors";

export default StyleSheet.create({
    rowCard: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    rowLabel: {
        fontSize: 14,
        color: Colors.black,
        fontWeight: 'bold',
    },
    rowValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary,
    },
});