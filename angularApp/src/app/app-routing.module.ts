import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HtmltoangularComponent } from './htmltoangular/htmltoangular.component';

const routes: Routes = [
  { path: "html-to-angular", component: HtmltoangularComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
