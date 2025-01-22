export const notEmpty = (value: string) => value.length > 0;
export const min = (length: number) => (value: string) => value.length >= length;
export const max = (length: number) => (value: string) => value.length <= length;
export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
