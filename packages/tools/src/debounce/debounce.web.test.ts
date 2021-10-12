import { debounce } from './';

// Tell Jest to mock all timeout functions
jest.useFakeTimers();

describe('debounce', () => {
  const func = jest.fn();
  const debouncedFunc = debounce(func, 1000);

  it('execute just once', () => {
    for (let i = 0; i < 100; i++) {
      debouncedFunc();
    }

    // Fast-forward time
    jest.runAllTimers();

    expect(func).toBeCalledTimes(1);
  });
});
