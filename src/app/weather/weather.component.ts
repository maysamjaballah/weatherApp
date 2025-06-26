import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface WeatherData {
  name: string;
  sys: { country: string; };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: { speed: number; };
}

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="weather-card">
      <div class="search-container">
        <input
          type="text"
          [(ngModel)]="cityName"
          placeholder="Enter city name..."
          (keyup.enter)="getWeather()"
        />
        <button (click)="getWeather()">Search</button>
      </div>

      <div class="weather-info" *ngIf="weatherData">
        <div class="location">{{ weatherData.name }}, {{ weatherData.sys.country }}</div>
        <div class="temperature">{{ weatherData.main.temp | number:'1.0-0' }}°C</div>
        <div class="description">
          {{ weatherData.weather[0].description | titlecase }}
        
        </div>
        
        <div class="details">
          <div class="detail-item">
            <div class="detail-label">Feels Like</div>
            <div class="detail-value">{{ weatherData.main.feels_like | number:'1.0-0' }}°C</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Humidity</div>
            <div class="detail-value">{{ weatherData.main.humidity }}%</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Wind</div>
            <div class="detail-value">{{ weatherData.wind.speed }} m/s</div>
          </div>
        </div>
      </div>

      <div class="error" *ngIf="error">{{ error }}</div>
    </div>
  `
})
export class WeatherComponent implements OnInit {
  cityName = '';
  weatherData: WeatherData | null = null;
  error = '';
  private apiKey = '06ad53833c07a0bafed20a9a5df1252b';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cityName = 'tunisia';
    this.getWeather();
  }

  getWeather() {
    if (!this.cityName.trim()) {
      this.error = 'Please enter a city name';
      return;
    }

    this.error = '';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${this.apiKey}&units=metric`;

    this.http.get<WeatherData>(url).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.error = '';
      },
      error: (err) => {
        if (err.status === 404) {
          this.error = 'City not found. Please check the spelling and try again.';
        } else {
          this.error = 'An error occurred while fetching weather data. Please try again.';
        }
        this.weatherData = null;
      }
    });
  }
}