import * as React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { Icons } from '../../constant/icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string;
  withBackButton?: boolean;
}

const Header = (props: HeaderProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {props.withBackButton && (
        <TouchableOpacity
          testID="back-button"
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={Icons.back} style={styles.icon} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

export default Header;
