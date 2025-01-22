type Pipe = <T>(...fns: Array<(arg: T) => T>) => (arg: T) => T;
export const ƒ: Pipe =
    (...fns) =>
    (arg) =>
        fns.reduce((value, fn) => fn(value), arg);
