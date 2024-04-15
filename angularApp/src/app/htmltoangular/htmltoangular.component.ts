import { Component } from '@angular/core';
import { main } from "./../../assets/js/main.js";


@Component({
  selector: 'app-htmltoangular',
  templateUrl: './htmltoangular.component.html',
  styleUrls: ['./htmltoangular.component.css']
})

export class HtmltoangularComponent{


  ngOnInit(){
    main()
  }

}
