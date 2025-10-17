import { renderHook, act } from '@testing-library/react-native';
import { useDebounce } from '../hooks/useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('Hello', 500));
    expect(result.current).toBe('Hello');
  });

  it('should update value after the delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'A' } },
    );

    rerender({ value: 'B' });

    expect(result.current).toBe('A');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('B');
  });

  it('should clear timeout when value changes quickly', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'X' } },
    );

    rerender({ value: 'Y' });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    rerender({ value: 'Z' });
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('Z');
  });
});
