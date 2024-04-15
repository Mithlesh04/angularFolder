import { Component, OnInit } from '@angular/core';
import { main } from "../../assets/js/main.js";


@Component({
  selector: 'app-htmltoangular-component',
  templateUrl: './htmltoangular-component.component.html',
  styleUrls: ['./htmltoangular-component.component.scss']
})
export class HtmltoangularComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    main()
  }

}
