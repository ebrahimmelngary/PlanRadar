import { Text, View } from 'react-native';
import styles from './styles';

export const RowCard = ({ label, value }: { label: string; value: string }) => {
  return (
    <View style={styles.rowCard}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
};
