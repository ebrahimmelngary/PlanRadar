import React from 'react';
import { render } from '@testing-library/react-native';
import { RowCard } from '../RowCard';

describe('RowCard Component', () => {
  it('renders label and value correctly', () => {
    const { getByText } = render(<RowCard label="Temperature" value="25°C" />);

    expect(getByText('Temperature')).toBeTruthy();
    expect(getByText('25°C')).toBeTruthy();
  });

  it('matches snapshot', () => {
    const tree = render(<RowCard label="Humidity" value="60%" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
