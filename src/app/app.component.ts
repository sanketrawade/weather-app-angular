import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'wether-app';
  news = null;
  public isSubmitted = false;
  cityName = ''
  @ViewChild('Nulles') ElementRef: HTMLInputElement;
  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.GetNews();
  }

  GetNews(cityName = 'Pune') {
    this.weatherService.GetNews(cityName).subscribe((resp: any) => {
      this.cityName = resp?.location?.name;
      console.log(resp);
      if (resp.error != null) {
        this.news = 'null';
        alert('city name not found.');
      }
      else {
        this.news = resp;
      }
    });
  }
  // tslint:disable-next-line: typedef
  Search(wetherForm: NgForm) {
    this.isSubmitted = true;
    if (wetherForm.invalid) {
      return;
    }
    this.GetNews(wetherForm.controls.city.value);
  }

}
