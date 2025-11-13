import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, LoadingComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {

  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);

  countryResource = rxResource({
    request: () => ({ code: this.countryCode }),
    loader: ({ request }) => {
      if (!request.code) return of(undefined);
      return this.countryService.searchByAlphaCode(request.code)
    }
  })
  location = inject(Location);
  goBack() {
    this.location.back();
  }
}
