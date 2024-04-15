import { Component, OnInit } from '@angular/core';
import { DataProviderService } from './data-provider.service';
import { SelectedChartFilterItem, chartTypesMap, FilterChartList } from './utils/utils';
import { generateDummyData } from './utils/createDummyData';
import { ExportPDF } from './utils/exportPDF';
import { ExportXLSX } from './utils/exportXLSX';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})

export class ChartsComponent implements OnInit {

  filteredBy = new Map<chartTypesMap.ChartNames, chartTypesMap.FilteredByMap>()


  constructor(
    public dataProvider: DataProviderService
  ) {

    // console.log("generateDummyData = ", generateDummyData())

  }

  ngOnInit(): void {
    console.log("this.dataProvider.ChartTypesMap", this.dataProvider.ChartTypesMap)

  }

  onFilterChartList(items: SelectedChartFilterItem[]): void {
    for(let chart of this.dataProvider.ChartTypesMap){
      if(items.find(({ name })=>name === chart.name)){
        chart.isVisible = true
      }else{
        chart.isVisible = false
      }
    }
  }

  onSelectChartSlice(data: chartTypesMap.SelectedChartSlice): void {

    // delete the prev record. so that latest filter will update at the end
    if(this.filteredBy.has(data.chartDataObject.name)){
      this.filteredBy.delete(data.chartDataObject.name)
    }

    if(Array.isArray(data.selectedRow)){
      // If data.selectedRow is not there it means user reset the selection
      this.filteredBy.set(data.chartDataObject.name, {
        columnName: data.chartDataObject.columnNames[0],
        selectedRow: data.selectedRow[0],
        selection: data.selection
      })
    }

    console.log("handle childEvents", data, this.filteredBy)

    // call filter
    this.dataProvider.getFilterData(this.filteredBy)

  }

  onExportToExcel(): void{
    if(this.dataProvider.ChartTypesMap.some(chart=>chart.isVisible)){
      ExportXLSX(this.dataProvider.ChartTypesMap)
    }else{
      window.alert("Please select at least one chart to export")
    }
  }

  onExportToPdf(): void{
    if(this.dataProvider.ChartTypesMap.some(chart=>chart.isVisible)){
      ExportPDF()
    }else{
      window.alert("Please select at least one chart to export")
    }
  }

}
