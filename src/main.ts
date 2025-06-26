import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { WeatherComponent } from './app/weather/weather.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WeatherComponent],
  template: '<app-weather></app-weather>'
})
export class App {}

bootstrapApplication(App, {
  providers: [provideHttpClient()]
});