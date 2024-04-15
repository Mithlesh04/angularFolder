import { Component, NO_ERRORS_SCHEMA, NgModule, OnInit } from '@angular/core';
import jsPdf from "jspdf"

@NgModule({
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})

@Component({
  selector: 'app-google-angular-chart',
  templateUrl: './google-angular-chart.component.html',
  styleUrls: ['./google-angular-chart.component.scss']
})

export class GoogleAngularChartComponent implements OnInit {

  title = 'Browser market shares at a specific website, 2014';
  type = 'PieChart';
  type2 = "ColumnChart";
  data = [
    ['Firefox', 45.0],
    ['IE', 26.8],
    ['Chrome', 12.8],
    ['Safari', 8.5],
    ['Opera', 6.2],
    ['Others', 0.7]
  ];
  columnNames = ['Browser', 'Percentage'];
  options = {};
  width = 500;
  height = 300;


  pieChartsEvent: any = {}

  constructor() { }

  ngOnInit(): void {

  }

  onPieChartReady(event: any): void {
    this.pieChartsEvent = event
    console.log('onPieChartRead', event.chart)
  }

  pieDownloadPDF() {
    if ("chart" in this.pieChartsEvent) {
      this.pieChartsEvent.chart.getImageURI()
      let doc = new jsPdf();
      doc.setFontSize(33);
      doc.setFillColor(135, 124, 45, 0);
      doc.addImage(this.pieChartsEvent.chart.getImageURI(), 'png', 10, 10, 150, 100);
      doc.save('pie-chart.pdf');
    } else {
      console.log('please wait for init the pie-chart')
    }

  }

  pieDownloadCSV() {
    if ("chart" in this.pieChartsEvent) {
      var rows = [this.columnNames, ...this.data];
      var csv = [];
      
      csv.push('"' + this.title.replace(/"/g, '""') + '"')

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
      link.setAttribute('download', "pieCSV.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

}
