import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  countrySvc = inject(CountryService);
  query = signal('');
  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      return this.countrySvc.searchByCapital(request.query);
    }
  })

  /*   countrySvc = inject(CountryService);
    query = signal('');
    coutnryResource = resource({
      request: () => ({ query: this.query() }),
      loader: async ({ request }) => {
        if (!request.query) return [];
        return await firstValueFrom(this.countrySvc.searchByCapital(request.query));
      }
    })
    
  
    isLoading = signal(false);
    isError = signal<string | null>(null);
    countries = signal<Country[]>([]);
  
    OnSearchCapital(query: string): void {
  
      if (this.isLoading()) return;
      this.isLoading.set(true);
      this.isError.set(null);
  
      this.countrySvc.searchByCapital(query).subscribe({
        next: countries => {
          this.countries.set(countries);
          this.isLoading.set(false);
  
        }, error: err => {
          this.isLoading.set(false);
          this.isError.set('No se encontrol resultados con esa capital');
          this.countries.set([]);
        }
      }
      )
    } */


}
