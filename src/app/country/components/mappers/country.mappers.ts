import { Country } from "../../interfaces/country.interface";
import { RESTCountry } from "../../interfaces/rest-country.interface";

export class CountryMapper {
    static toOneCountry(data: RESTCountry): Country {
        return {
            cca2: data.cca2,
            flag: data.flags.png,
            flagSvg: data.flags.svg,
            name: data.translations["spa"]?.common || data.name.common,
            capital: data.capital ? data.capital.join(', ') : 'N/A',
            population: data.population ? data.population : 0,
            flags: {
                png: data.flags.png,
                svg: data.flags.svg,
                alt: data.flags.alt || ''
            }
        };
    }

    static toCountriesArray(data: any[]): Country[] {
        return data.map(item => this.toOneCountry(item));
    }
}