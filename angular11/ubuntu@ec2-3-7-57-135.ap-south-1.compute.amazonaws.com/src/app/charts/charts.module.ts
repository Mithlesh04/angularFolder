import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { ChartsComponent } from './charts.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { CommonChartComponent } from './common-chart/common-chart.component';



@NgModule({
  declarations: [
    TestComponent,
    ChartsComponent,
    CommonChartComponent
  ],
  imports: [
    CommonModule,
    GoogleChartsModule
  ],
  exports: [
    TestComponent,
    ChartsComponent
  ]
})
export class ChartsModule { }
