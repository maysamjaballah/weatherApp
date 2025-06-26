import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherDisplayComponent } from './components/weather-display/weather-display.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, WeatherDisplayComponent, NavBarComponent],
  template: `
    <app-nav-bar (searchCity)="onCitySearch($event)"></app-nav-bar>
    <main class="container">
      <app-weather-display [selectedCity]="selectedCity"></app-weather-display>
    </main>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
  `]
})
export class AppComponent {
  selectedCity: string = '';

  constructor(private weatherService: WeatherService) {}

  onCitySearch(city: string) {
    this.selectedCity = city;
  }
}