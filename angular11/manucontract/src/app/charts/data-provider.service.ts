import { Injectable } from '@angular/core';
import { ChartTypesMap, chartTypesMap } from "./utils/utils"
import { generateDummyData } from './utils/createDummyData';
import { ExportXLSX } from './utils/exportXLSX';

interface FilterBy {
  chartName: chartTypesMap.ChartNames,
  columnName: string,
  value: Array<string | number | boolean | Date>
}
type NewChartDataType = Array<chartTypesMap.TypeChart | chartTypesMap.TypeKPI>


@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  ChartTypesMap = ChartTypesMap

  constructor() {
    // create the init data
    // this.getDataFromApi([])
    //  .then((latestData: NewChartDataType)=>{
    //   // update the chart value
    //   this.ChartTypesMap = latestData
    // })
  }


  getFilterData(filteredBy: Map<chartTypesMap.ChartNames, chartTypesMap.FilteredByMap>): void {

    return; // remove the return once we integrated the api
    console.log('filteredBy_map = ', filteredBy)
    // this.ChartTypesMap = [...this.ChartTypesMap]
    // return;
    // return;
    const filterBy: FilterBy[] = []

    filteredBy.forEach((value: chartTypesMap.FilteredByMap, name: chartTypesMap.ChartNames)=>{
      filterBy.push({
        chartName: name,
        columnName: value.columnName,
        value: [value.selectedRow]
      })
    })

    this.getDataFromApi(filterBy)
    .then((latestData: NewChartDataType)=>{
      // update the chart value
      this.ChartTypesMap = latestData
      console.log("this.ChartTypesMap = ", latestData)
    })
  }

  async getDataFromApi(filterBy: FilterBy[]): Promise<NewChartDataType> {
    const lastFilteredChartName: chartTypesMap.ChartNames | undefined = filterBy.length ? filterBy[filterBy.length - 1].chartName : undefined

    console.log("filterBy = ",filterBy)


    // call the api and store the response data in data variable. use await for api
    const apiResponseData: any = await generateDummyData()


    const newChart: NewChartDataType = []

    this.ChartTypesMap.forEach((value: chartTypesMap.TypeChart | chartTypesMap.TypeKPI)=>{
      const newData: any = {}
      const resObj = apiResponseData[value.name]
      if(resObj){
        // ignore the last filtered
        if(lastFilteredChartName !== value.name){
          if("data" in resObj){
            newData.data = resObj.data
          }
        }
      }
      newChart.push({
        ...value,
        ...newData
      })
    })

    return newChart
  }

}
