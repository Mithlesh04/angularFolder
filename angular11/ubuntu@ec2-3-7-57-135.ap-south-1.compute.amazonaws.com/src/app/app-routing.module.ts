import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HtmltoangularComponentComponent } from './htmltoangular-component/htmltoangular-component.component';
import { GoogleAngularChartComponent } from './google-angular-chart/google-angular-chart.component';

const routes: Routes = [
  { path: "html-to-angular", component: HtmltoangularComponentComponent },
  { path: "google-charts", component: GoogleAngularChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
