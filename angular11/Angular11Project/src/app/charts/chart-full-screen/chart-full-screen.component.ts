import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chart-full-screen',
  templateUrl: './chart-full-screen.component.html',
  styleUrls: ['./chart-full-screen.component.scss']
})
export class ChartFullScreenComponent implements OnInit {

  @Input() isModelOpen: boolean = false
  @Input() title: string
  @Output() onChartCloseModel = new EventEmitter()

  constructor() { }

  ngOnInit(): void {

  }

  onCloseModal(){
    this.onChartCloseModel.emit()
  }

}
