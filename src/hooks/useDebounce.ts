/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useCallback } from "react";

export function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number) {
    const timeoutRef = useRef<number | undefined>();

    const debouncedFunction = useCallback(
        (...args: Parameters<T>) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = window.setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    );

    return debouncedFunction;
}
