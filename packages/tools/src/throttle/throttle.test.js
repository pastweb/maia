import { throttle } from './';

// Tell Jest to mock all timeout functions
jest.useFakeTimers();

describe('debounce', () => {

    const func = jest.fn();
    const  throttledFunc = throttle(func, 1000);

    it('execute just once', () => {
        for (let i = 0; i < 100; i++) {
            throttledFunc();
        }

        // Fast-forward until all timers have been executed
        jest.advanceTimersByTime(1000);

        // Now our callback should have been called!
        expect(func).toBeCalled();
        expect(func).toHaveBeenCalledTimes(1);

        expect(func).toBeCalledTimes(1);
    });
});