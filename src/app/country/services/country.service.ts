import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country.interface';
import { map, Observable, catchError, throwError, delay, count, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../components/mappers/country.mappers';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private httpClient = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();
    return this.httpClient.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map(restCountries => CountryMapper.toCountriesArray(restCountries)),
      //delay(3000),
      catchError(err => {
        return throwError(
          () => new Error(`No se encontraron resultados para la capital ${query}`));
      })
    )
  };


  private queryCacheCountry = new Map<string, Country[]>();
  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();
    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query)!);
    }
    return this.httpClient.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        tap(countries => this.queryCacheCountry.set(query, countries.length > 0 ? CountryMapper.toCountriesArray(countries) : [])),
        map(restCountries => CountryMapper.toCountriesArray(restCountries)),
        delay(3000),
        catchError(err => {
          return throwError(
            () => new Error(`No se encontraron resultados para el país ${query}`));
        })
      )
  }
  private queryCacheRegion = new Map<string, Country[]>();
  searchByRegion(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();
    if (this.queryCacheRegion.has(query)) {
      return of(this.queryCacheRegion.get(query)!);
    }
    return this.httpClient.get<RESTCountry[]>(`${API_URL}/region/${query}`)
      .pipe(
        tap(countries => this.queryCacheRegion.set(query, countries.length > 0 ? CountryMapper.toCountriesArray(countries) : [])),
        map(restCountries => CountryMapper.toCountriesArray(restCountries)),
        delay(3000),
        catchError(err => {
          return throwError(
            () => new Error(`No se encontraron resultados para el país ${query}`));
        })
      )
  }
  searchByAlphaCode(code: string) {
    return this.httpClient.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
      .pipe(
        map(restCountries => CountryMapper.toCountriesArray(restCountries)),
        map((countries) => countries.at(0)),
        delay(3000),

        catchError((err) => {
          return throwError(
            () => new Error(`No se encontraron resultados para el país ${code}`));
        })
      )
  }
}
