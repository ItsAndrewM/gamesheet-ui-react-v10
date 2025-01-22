export function all<T>(...functions: ((input: T) => boolean)[]) {
    return (initial: T): boolean => {
        for (const fn of functions) {
            if (!fn(initial)) {
                return false;
            }
        }
        return true;
    };
}

// const œ = 1 // q
// const ø = 1 // o
// const π = 1 // p
// const å = 1 // a
// const ß = 1 // s
// const æ = 1 // '
// const ª = 1 // 9
// const º = 1 // 0
// const ç = 1 // c
// const µ = 1 // m
// const Œ = 1 // Q
// const Á = 1 // Y
// const Í = 1 // S
// const Ô = 1 // J
// const Ò = 1 // L
// const Ú = 1 // :
// const Æ = 1 // "
// const Ç = 1 // C
// const Â = 1 // M
