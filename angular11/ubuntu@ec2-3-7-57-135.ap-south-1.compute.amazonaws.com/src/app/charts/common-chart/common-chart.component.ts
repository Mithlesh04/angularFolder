import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ChartImages, chartImages, chartTypesMap, ChartColors } from './../utils/utils';
import { GoogleChartComponent } from 'angular-google-charts';
import jsPdf from "jspdf"

@Component({
  selector: 'app-common-chart',
  templateUrl: './common-chart.component.html',
  styleUrls: ['./common-chart.component.scss']
})

export class CommonChartComponent implements OnInit {

  @Input() chartDataObject: chartTypesMap.TypeChart
  @Input() filteredBy: Map<chartTypesMap.ChartNames, chartTypesMap.FilteredByMap>
  @Output() onSelectChartSlice = new EventEmitter()

  chartComponent: GoogleChartComponent

  availableChartTypes: Array<chartImages.AvailableChartTypeKeys> = []

  chartData: chartTypesMap.CommonChartData = {
    chartName: "Doughnut", // default
    type: "PieChart", // default "Bar" | ColumnChart // "BarChart"; //'PieChart';
    title: "",
    data: [],
    columnNames: [],
    options: {
      chartArea: {
        left: "3%",
        top: "3%",
        // height: "94%",
        // width: "94%"
        height: "100%",
        width: "100%"
      },
      colors: ChartColors
      // legend: 'none',
    }

  }

  constructor() {

  }

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
    this.chartData.columnNames = this.chartDataObject.columnNames
    this.chartData.data = this.chartDataObject.data

    this.setActiveChartType()


  }

  private getPdfAndCsvName() {
    return (this.chartData.title || `${this.chartData.chartName}_${Date.now()}`)
      .replace(/\W+(?!$)/g, '_')
      .replace(/\W$/, '')
      .replace(/_$/, '')
      .toLowerCase()
  }

  setActiveChartType(selectedChartType: void | chartImages.AvailableChartTypeKeys): void {
    for (let chart of this.availableChartTypes) {
      if (selectedChartType) {
        chart.isActive = selectedChartType === chart;
      }
      if (chart.isActive) {
        this.chartData.chartName = chart.chartName
        this.chartData.type = chart.googleChartType
        switch (chart.chartName) {
          case "Doughnut":
            this.chartData.options.pieHole = 0.3
            break;
          case "Pie":
            this.chartData.options.pieHole = 0
            break;
          default:
            delete this.chartData.options.pieHole
        }
        if (!selectedChartType) break;
      }
    }
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


  onResetBtnClick(): void {
    const mainData: chartTypesMap.SelectedChartSlice = {
      chartDataObject: this.chartDataObject,
      chartName: this.chartData.chartName,
      selection: [],
      selectedRow: this.getSelectedSlice([])
    }
    this.onSelectChartSlice.emit(mainData)
  }

  onPdfBtnClick(): void {
    if ("chart" in this.chartComponent) {

      const domURL: any = window.URL || window.webkitURL || window;
      const svgParent: any = this.chartComponent.chart.getContainer().getElementsByTagName('svg')[0];
      svgParent.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

      const image = new Image();
      image.onload = () => {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.setAttribute('width', `${parseFloat(svgParent.getAttribute('width'))}`);
        canvas.setAttribute('height', `${parseFloat(svgParent.getAttribute('height'))}`);
        canvas.getContext('2d').drawImage(image, 0, 0, 400, 250);
        let doc = new jsPdf({
          // orientation: 'landscape',
          unit: 'px',
          format: [360, 504],
          compress: false
        });
        const imgProps = doc.getImageProperties(canvas.toDataURL('image/png'));
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        if (this.chartData.title) {
          doc.setFontSize(18);
          // doc.setFillColor(135, 124, 45, 0);
          doc.text(this.chartData.title, 20, 15);
        }

        doc.addImage({
          imageData: canvas,
          format: "PNG",
          x: 5,
          y: 40,
          width: pdfWidth,
          height: pdfHeight
        });
        doc.save(this.getPdfAndCsvName() + '.pdf');
      }
      image.src = domURL.createObjectURL(new Blob([svgParent.outerHTML], { type: 'image/svg+xml' }));






    } else {
      console.log('please wait for init the chart')
    }
  }

  onCSVBtnClick(): void {
    console.log("csv clicked")

    if ("chart" in this.chartComponent) {
      var rows = [this.chartData.columnNames, ...this.chartData.data];
      var csv = [];

      csv.push('"' + this.chartData.title.replace(/"/g, '""') + '"')

      for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i];
        for (var j = 0; j < cols.length; j++) {
          var data = String(cols[j]).replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
          data = data.replace(/"/g, '""');
          row.push('"' + data + '"');
        }
        csv.push(row.join(","));
      }

      var csv_string = csv.join('\n');
      var link = document.createElement('a');
      link.style.display = 'none';
      link.setAttribute('target', '_blank');
      link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
      link.setAttribute('download', this.getPdfAndCsvName() + ".csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  onReady(chartComponent: GoogleChartComponent): void {
    this.chartComponent = chartComponent
    // chartComponent.chart.setSelection([
    //   {
    //     column: 0,
    //     row: 0
    //   }
    // ])
    // chartComponent.chart
    // console.log("ready = ", chartComponent.chart)

    // set selected slice
    var isDefaultSelected: boolean = this.filteredBy.has(this.chartDataObject.name)
    if (isDefaultSelected) {
      this.setSelectedSlice(this.filteredBy.get(this.chartDataObject.name).selection)
    }


    // on select chart slice
    google.visualization.events.addListener(chartComponent.chart, "select", () => {
      console.log("selecte = ")

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

}

