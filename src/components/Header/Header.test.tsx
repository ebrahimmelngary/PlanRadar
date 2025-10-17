import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '.';

// Mock navigation
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('Header Component', () => {
  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({
      goBack: mockGoBack,
    });
    mockGoBack.mockClear();
  });

  it('renders the title correctly', () => {
    const { getByText } = render(<Header title="Weather" />);
    expect(getByText('Weather')).toBeTruthy();
  });

  it('does not render back button when withBackButton is false', () => {
    const { queryByTestId } = render(<Header title="Home" />);
    expect(queryByTestId('back-button')).toBeNull();
  });

  it('renders back button when withBackButton is true', () => {
    const { getByTestId } = render(<Header title="Details" withBackButton />);
    expect(getByTestId('back-button')).toBeTruthy();
  });

  it('calls navigation.goBack when back button is pressed', () => {
    const { getByTestId } = render(<Header title="Details" withBackButton />);
    fireEvent.press(getByTestId('back-button'));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});
