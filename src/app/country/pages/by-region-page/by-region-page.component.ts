import { Component, inject, input, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Country } from '../../interfaces/country.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { Region } from '../../interfaces/region.interface';


@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

  countrySvc = inject(CountryService);
  selectedRegion = signal<string>('Europe');

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  selectRegion(region: string) {
    this.selectedRegion.set(region);
  }
  countries = input.required<Country[]>();

  countryResource = rxResource({
    request: () => ({ query: this.selectedRegion() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      return this.countrySvc.searchByRegion(request.query);
    }
  })


}
