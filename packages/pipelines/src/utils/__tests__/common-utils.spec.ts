import React from 'react';
import { useDeepCompareMemoize } from '../common-utils';

// Mock React useRef
const useRefMock = jest.spyOn(React, 'useRef');
beforeEach(() => {
  useRefMock.mockClear();
});

describe('useDeepCompareMemoize', () => {
  it('should return undefined when value is undefined', () => {
    useRefMock.mockReturnValueOnce({ current: undefined });
    const value = useDeepCompareMemoize(undefined);
    expect(value).toBeUndefined();
  });

  it('should return the same object when using stringification and value is the same', () => {
    const obj = { a: 1, b: 2 };
    useRefMock.mockReturnValueOnce({ current: obj });
    const value = useDeepCompareMemoize(obj, true);
    expect(value).toBe(obj);
  });

  it('should return the same object when using deep comparison and value is the same', () => {
    const obj = { a: 1, b: 2 };
    useRefMock.mockReturnValueOnce({ current: obj });
    const value = useDeepCompareMemoize(obj);
    expect(value).toBe(obj);
  });

  it('should return new value when using stringification and value is different', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 3 };
    const useRefMock = jest.spyOn(React, 'useRef');
    useRefMock.mockReturnValueOnce({ current: obj1 });
    const value = useDeepCompareMemoize(obj2, true);
    expect(value).toEqual(obj2);
  });

  it('should return the value when using deep comparison and value is the same', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    const useRefMock = jest.spyOn(React, 'useRef');
    useRefMock.mockReturnValueOnce({ current: obj1 });
    const value = useDeepCompareMemoize(obj2, false);
    expect(value).toEqual(obj2);
  });
});
