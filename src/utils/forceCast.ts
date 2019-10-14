export function forceCast<T>(input: any): T {
    // ... do runtime checks here

    // @ts-ignore <-- forces TS compiler to compile this as-is
    return input;
}
