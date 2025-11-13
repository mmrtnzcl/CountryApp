export interface Country {
    cca2: string;
    flag: string;
    flagSvg: string;
    name: string
    capital: string
    population: number;
    flags: {
        png: string;
        svg: string;
        alt: string;
    };
}