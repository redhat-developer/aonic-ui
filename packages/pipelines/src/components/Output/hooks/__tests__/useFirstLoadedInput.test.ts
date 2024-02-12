import { renderHook } from '@testing-library/react';
import { useFirstLoadedInput } from '../useFirstLoadedInput';

describe('useFirstLoadedInput', () => {
  test('should handle the invalid value', () => {
    const { result } = renderHook(() => useFirstLoadedInput([]));
    expect(result.current).toBeUndefined();
  });

  test('should return the default value if the input value is empty', () => {
    const { result } = renderHook(() => useFirstLoadedInput([{ name: 'tab-1', value: [] }]));
    expect(result.current).toBe('tab-1');
  });
  test('should return the default value if the input value is undefined', () => {
    const { result } = renderHook(() =>
      useFirstLoadedInput([{ name: 'tab-1', value: undefined as any }]),
    );
    expect(result.current).toBe('tab-1');
  });

  test('should identify the first input with some data in it', () => {
    const { result } = renderHook(() =>
      useFirstLoadedInput([
        { name: 'tab-1', value: [] },
        { name: 'tab-2', value: ['data'] },
      ]),
    );

    expect(result.current).toBe('tab-2');
  });

  test('should work with object values', () => {
    const { result } = renderHook(() =>
      useFirstLoadedInput([
        { name: 'tab-1', value: [] },
        { name: 'tab-2', value: { key: 'data' } },
      ]),
    );
    expect(result.current).toBe('tab-2');
  });

  test('should work with string values', () => {
    const { result } = renderHook(() =>
      useFirstLoadedInput([
        { name: 'tab-1', value: [] },
        { name: 'tab-2', value: 'data streaming' },
      ]),
    );
    expect(result.current).toBe('tab-2');
  });
});
