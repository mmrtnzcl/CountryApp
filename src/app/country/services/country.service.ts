import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country.interface';
import { map, Observable, catchError, throwError, delay } from 'rxjs';
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
      delay(3000),
      catchError(err => {
        return throwError(
          () => new Error(`No se encontraron resultados para la capital ${query}`));
      })
    )
  };

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();
    return this.httpClient.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map(restCountries => CountryMapper.toCountriesArray(restCountries)),
        delay(3000),
        catchError(err => {
          return throwError(
            () => new Error(`No se encontraron resultados para el país ${query}`));
        })
      )
  }

}
