import { renderHook } from '@testing-library/react-hooks';
import useDebounce from './use-debounce';

describe('useDebounce()', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return debounce value', () => {
    const value = 'value';
    const {
      result: { current: debounceValue },
    } = renderHook(() => useDebounce(value));

    expect(value).toBe(debounceValue);
  });

  it('should debounce with default debounce 500 ms', () => {
    mockSetTimeout();
    renderHook(() => useDebounce('value'));

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
  });

  it('should debounce with given debounce', () => {
    mockSetTimeout();
    renderHook(() => useDebounce('value', 1337));

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1337);
  });

  it('should call clearTimeout on unmount', () => {
    mockClearTimeout();
    const { unmount } = renderHook(() => useDebounce('value'));
    unmount();

    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });
});

function mockSetTimeout() {
  jest.useFakeTimers();
  jest.spyOn(global, 'setTimeout');
}

function mockClearTimeout() {
  jest.useFakeTimers();
  jest.spyOn(global, 'clearTimeout');
}
