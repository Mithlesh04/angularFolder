import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from './charts/charts.module';


import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { HtmltoangularComponentComponent } from './htmltoangular-component/htmltoangular-component.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { GoogleAngularChartComponent } from './google-angular-chart/google-angular-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    HtmltoangularComponentComponent,
    GoogleAngularChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleChartsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
