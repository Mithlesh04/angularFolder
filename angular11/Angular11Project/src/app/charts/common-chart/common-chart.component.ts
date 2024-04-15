import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import { ChartImages, chartImages, chartTypesMap, ChartColors } from './../utils/utils';
import { GoogleChartComponent } from 'angular-google-charts';
import jsPdf from "jspdf"
// import chroma from "chroma-js"

// https://github.com/mmathias01/google-charts
// import {GoogleCharts} from 'google-charts';
// import { GoogleCharts } from "google-charts"

// declare let GoogleCharts: any

//Load the charts library with a callback
// GoogleCharts.load(drawChart);

function drawChart() {

  // Standard google charts functionality is available as GoogleCharts.api after load
  console.log("call __chart")
}

declare var chroma: any


const format = "₹##,##,##0.00"
// const format = (...arg: any[]) => {
//   console.log("arg - ", arg)
//   return { v: 78, f: "₹ 89" }
// }



@Component({
  selector: 'app-common-chart',
  templateUrl: './common-chart.component.html',
  styleUrls: ['./common-chart.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CommonChartComponent implements OnInit {

  @Input() chartDataObject: chartTypesMap.TypeChart
  @Input() filteredBy: Map<chartTypesMap.ChartNames, chartTypesMap.FilteredByMap>
  @Output() onSelectChartSlice = new EventEmitter()

  isModelOpen: boolean = false
  isError: boolean = false // if error then full screen option will not visible

  chartComponent: GoogleChartComponent
  availableChartTypes: Array<chartImages.AvailableChartTypeKeys> = []

  originalData: any[]

  chartData: chartTypesMap.CommonChartData = {
    chartName: "Doughnut", // default
    type: "PieChart", // default "Bar" | ColumnChart // "BarChart"; //'PieChart';
    title: "",
    data: [],
    columnNames: [],
    formatter: undefined,
    options: {
      chartArea: {
        // left: "3%",
        // top: "3%",
        // height: "94%",
        // width: 800,
        // height: 1000,
        // width: "100%",

      },
      // isStacked: true,
      colors: ChartColors,
      legend: {
        position: "none"
      },
      colorFn() {
        console.log("colorFn")
      },
      // isStacked: true,
      // series: [
      //   { color: 'red' },
      //   { color: 'yellow' },
      //   { color: '#f1ca3a' },
      //   { color: '#6f9654' },
      //   { color: '#1c91c0' },
      //   { color: '#43459d' },
      // ],

      // bar: {
      //   groupWidth: 100,
    	// 	// gap : 1
      // },
      // annotations:{
      //   stem:{
      //     color:'none'
      //   },
      //   textStyle:{
      //     color : 'black'
      //   }
      // },

      // vAxis: {
      //   format: format,
      // },
      hAxis: {
        // format: format,
        // orientation: 'horizontal',
        // type: 'category'
      },
      // series: {
      //   // 0: {color: 'black', visibleInLegend: false}
      // },
    },
  }

  constructor() {}

  ngOnInit(): void {
    // console.log("chartDataObject",this.onSelectChartSlice)
    this.chartDataObject.chartTypes.forEach((chartName: chartImages.ChartImageKeys) => {
      const current = ChartImages[chartName]
      this.availableChartTypes.push({
        chartName: chartName,
        chartUrl: current.imageUrl,
        googleChartType: current.googleChartType,
        isActive: ("selectedChartType" in this.chartDataObject ? this.chartDataObject.selectedChartType : this.chartDataObject.defaultChartType) === chartName
      })
    })

    this.chartData.title = this.chartDataObject.title
    this.chartData.columnNames = [...this.chartDataObject.columnNames]
    this.originalData = this.chartDataObject.data
    this.chartData.options.colors = chroma.scale(ChartColors).mode('lab').colors(this.originalData.length)

    console.log("chartData", this.chartData)
    // if(!this.chartData.data.length){
    //   const errorEl = this.chartComponent.getContainer().querySelector("div[id='google-visualization-errors-all-1']")
    //   console.log("errorEl = ",  this.chartData)
    // }

    this.setActiveChartType()


  }

  manipulateData(): void {
    this.chartData.data = this.originalData

    // if(this.chartData.type === "BarChart" || this.chartData.type === "ColumnChart"){
    //   // this.chartData.data = [
    //   //   ["Ready", 500, 0, 0, 0],
    //   //   ["Pending", 0, 660, 0, 0],
    //   //   ["Deployed", 0, 0, 410, 0],
    //   //   ["Other", 0, 0, 0, 200],
    //   // ];
    //   // console.log('if = ', this.chartData)
    //   // const emptyArray = [...Array(this.originalData.length + 1).fill(0)]
    //   // this.chartData.options.series = this.chartData.options.colors.map((e:string)=>({ color: e }))
    //   // let i = 0
    //   // for(let color of this.chartData.options.colors){
    //   //     this.chartData.options.series[i] = {color: color, visibleInLegend: true}
    //   //     i++
    //   // }
    //   // console.log("legend= ", this.chartData.options.series)
    //   // 0: {color: 'black', visibleInLegend: false}
    //   // .map((e: any[], i)=>{
    //   //   let dList: Array<string | number> = [...emptyArray]
    //   //   dList[0] = e[0]
    //   //   dList[i+1] = e[1]
    //   //   return dList
    //   // })
    //   // setTimeout(()=>{
    //   //   console.log("data__ = ", this.chartData.data, this.chartData.columnNames)
    //   // }, 1600)
    // }else{
    //   this.chartData.data = this.originalData
    //   // console.log('else = ', this.chartData.data)

    // }
  }

  setActiveChartType(selectedChartType: void | chartImages.AvailableChartTypeKeys): void {
    for (let chart of this.availableChartTypes) {
      if (selectedChartType) {
        chart.isActive = selectedChartType === chart;
      }
      if (chart.isActive) {
        this.chartData.chartName = chart.chartName
        this.chartData.type = chart.googleChartType
        if(chart.chartName === "Doughnut" || chart.chartName === "Pie"){
          switch (chart.chartName) {
            case "Doughnut":
              this.chartData.options.pieHole = 0.3
              break;
            case "Pie":
              this.chartData.options.pieHole = 0
              break;
          }
          this.chartData.options.chartArea.height = "100%"
          this.chartData.options.chartArea.width = "100%"
          this.chartData.options.legend.position = "right"
          this.chartData.options.chartArea.top = "3%"
          this.chartData.options.chartArea.bottom = "3%"
        }else{
          this.chartData.options.legend.position = "none"
          delete this.chartData.options.chartArea.height
          delete this.chartData.options.chartArea.width
          delete this.chartData.options.pieHole
          delete this.chartData.options.chartArea.top
          delete this.chartData.options.chartArea.bottom
        }
        if (!selectedChartType) break;
      }
    }
    this.manipulateData()
  }

  getSelectedSlice(selection: google.visualization.VisualizationSelectionArray[] | void): chartTypesMap.MainData | undefined {

    if (selection && selection[0] && "number" === typeof selection[0].row) {
      return this.chartData.data[selection[0].row]
    }

    return undefined
  }

  setSelectedSlice(selection: google.visualization.VisualizationSelectionArray[]) {
    // filteredBy
    this.chartComponent.chart.setSelection(selection)
  }

  onChartTypeClick(clickedChartType: chartImages.AvailableChartTypeKeys): void {
    this.setActiveChartType(clickedChartType)

    this.chartDataObject.selectedChartType = clickedChartType.chartName
    console.log("onChartTypeClick = ", clickedChartType.chartName)
  }

  onFullScreen(){
    this.isModelOpen = true
    if(this.chartComponent){
      var chart: any;
      switch (this.chartData.type) {
        case "ColumnChart":
          chart = google.visualization.ColumnChart
          break;
        case "BarChart":
          chart = google.visualization.BarChart
          break;
        case "PieChart":
          chart = google.visualization.PieChart
          break;
      }
      // console.log('ddd=',this.chartComponent.chart)

      if(chart){
        // chart = new chart()

        // console.log("chart = ", chart)
      }

    }
  }

  onResetBtnClick(): void {
    const mainData: chartTypesMap.SelectedChartSlice = {
      chartDataObject: this.chartDataObject,
      chartName: this.chartData.chartName,
      selection: [],
      selectedRow: this.getSelectedSlice([])
    }
    this.onSelectChartSlice.emit(mainData)
  }

  onChartCloseModel(){
    this.isModelOpen = false
  }


  onReady(chartComponent: GoogleChartComponent): void {
    console.log("onReady = ", chartComponent)
    this.chartComponent = chartComponent
    this.isError = false
    // var formatter = new google.visualization.NumberFormat({
    //   fractionDigits: 2,
    //    prefix: '£'
    // });
    // chartComponent.chart.setSelection([
    //   {
    //     column: 0,
    //     row: 0
    //   }
    // ])
    // chartComponent.chart
    // console.log("ready = ", chartComponent.chart)
    // return;
    // set selected slice
    var isDefaultSelected: boolean = this.filteredBy.has(this.chartDataObject.name)
    if (isDefaultSelected) {
      this.setSelectedSlice(this.filteredBy.get(this.chartDataObject.name).selection)
    }

    const _changeColor = () => {
      if (this.chartData.type === "BarChart" || this.chartData.type === "ColumnChart") {
        const rectElement: any = chartComponent.chart.getContainer().querySelectorAll("svg g g:nth-child(2) g:nth-child(2)") || []
        if (rectElement && rectElement[0]) {
          let index = 0
          console.log('rectElement = ', rectElement)
          rectElement[0].childNodes.forEach((element: any) => {
            var color = this.chartData.options.colors[index]
            if (element.nodeName === "g") {
              element.firstChild.setAttribute('fill', color)
            } else if (element.nodeName === "rect") {
              element.setAttribute('fill', color)
            }
            ++index
          })
        }
      }
    }

    if(this.chartData.type === "BarChart" || this.chartData.type === "ColumnChart"){

      google.visualization.events.addListener(chartComponent.chart, "onmouseover", () => {
        _changeColor()
      })

      google.visualization.events.addListener(chartComponent.chart, "onmouseout", () => {
        _changeColor()
      })

    }


    _changeColor()

    // on select chart slice
    google.visualization.events.addListener(chartComponent.chart, "select", () => {
      console.log("selecte call")
      _changeColor()

      if (isDefaultSelected) {
        isDefaultSelected = false
        return;
      }
      const selection: google.visualization.VisualizationSelectionArray[] = chartComponent.chart.getSelection()
      const mainData: chartTypesMap.SelectedChartSlice = {
        chartDataObject: this.chartDataObject,
        chartName: this.chartData.chartName,
        selection: selection,
        selectedRow: this.getSelectedSlice(selection)
      }
      this.onSelectChartSlice.emit(mainData)
    })


  }

  onError(): void {
    this.isError = true
  }

}

