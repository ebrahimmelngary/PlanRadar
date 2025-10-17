import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

// Mock all heavy native modules
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    NavigationContainer: ({ children }: any) => <>{children}</>,
    useNavigation: jest.fn(),
  };
});

jest.mock('react-native-gesture-handler', () => ({
  GestureHandlerRootView: ({ children }: any) => <>{children}</>,
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: any) => <>{children}</>,
  SafeAreaView: ({ children }: any) => <>{children}</>,
}));

jest.mock('react-native-mmkv', () => ({
  MMKV: jest.fn().mockImplementation(() => ({
    getString: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  })),
}));

jest.mock('../src/navigation', () => () => <>{'MockNavigation'}</>);

describe('App Component', () => {
  it('sets correct StatusBar style for dark mode', () => {
    jest
      .spyOn(require('react-native'), 'useColorScheme')
      .mockReturnValue('dark');
    const { UNSAFE_getByType } = render(<App />);
    const StatusBar = UNSAFE_getByType(require('react-native').StatusBar);
    expect(StatusBar.props.barStyle).toBe('light-content');
  });

  it('sets correct StatusBar style for light mode', () => {
    jest
      .spyOn(require('react-native'), 'useColorScheme')
      .mockReturnValue('light');
    const { UNSAFE_getByType } = render(<App />);
    const StatusBar = UNSAFE_getByType(require('react-native').StatusBar);
    expect(StatusBar.props.barStyle).toBe('dark-content');
  });
});
