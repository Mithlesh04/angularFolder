import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { ChartsComponent } from './charts.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { CommonChartComponent } from './common-chart/common-chart.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ChartDropdownComponent } from './chart-dropdown/chart-dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartFullScreenComponent } from './chart-full-screen/chart-full-screen.component';



@NgModule({
  declarations: [
    TestComponent,
    ChartsComponent,
    CommonChartComponent,
    ChartDropdownComponent,
    ChartFullScreenComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    GoogleChartsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TestComponent,
    ChartsComponent
  ]
})
export class ChartsModule { }
