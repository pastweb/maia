declare function generate(prefix?: string, idLength?: number): string;
declare function generateUnique(cache: string[], prefix?: string, idLength?: number, retries?: number): string;
export declare const hashID: {
    generate: typeof generate;
    generateUnique: typeof generateUnique;
};
export {};
