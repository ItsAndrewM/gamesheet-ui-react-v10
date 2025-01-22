type LargeObjectOfProps = {
    [key: string]: any;
};

type SmallObjectOfProps<T> = {
    [key in keyof T]: any;
};

type Keys<T> = (string | keyof T)[];

export function extract<T>(obj: LargeObjectOfProps, keys: Keys<T>): SmallObjectOfProps<T> {
    return keys.reduce((acc, key) => {
        if (key in obj) acc[key as keyof T] = obj[key as string];
        return acc;
    }, {} as SmallObjectOfProps<T>);
}
