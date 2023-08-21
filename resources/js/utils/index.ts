export function noop(): void {}

export function truncate(input: string, charLength: number): string {
    if (input.length <= charLength) {
        return input;
    }

    return input.slice(0, charLength) + "...";
}
