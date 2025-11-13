import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-country-information-page',
  imports: [],
  templateUrl: './country-information-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryInformationPage {

  country = input.required<Country>();
  location = inject(Location);


  goBack() {
    this.location.back();
  }
}
