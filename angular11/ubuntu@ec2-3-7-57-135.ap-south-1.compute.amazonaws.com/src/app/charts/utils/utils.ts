import { dummyJsonData } from "./dummyJsonData"

console.log("dummyJsonData", dummyJsonData)

export const ChartColors: string[] = [
  "#a4d93e",
  "#5497db",
  "#dedede",
  "#a3d9fe",
  "#def4a2",
  "#707070",
  "#b5b1b1"
]

export declare namespace chartTypesMap {

  export type ChartNames =
    | "renewalContracts"
    | "expiringContracts"
    | "kpiTotalValueOfContract"
    | "riskWise"
    | "jurisdictionWise"
    | "typeOfSubCategory"
    | "departmentWiseRiskBased"
    | "statusVsNoOfContracts"
    | "typeVsNoOfContracts"
    | "counterparty"
    | "activeInactiveContracts"

  export type MainData = Array<string | number | boolean | Date>

  export type data = MainData[]

  export type columnNames = [string, string]

  export interface TypeChart {
    type: "CHART",
    title: string,
    name: ChartNames, // name should be always unique for each chart
    defaultChartType: chartImages.ChartImageKeys,
    selectedChartType?: chartImages.ChartImageKeys,
    chartTypes: [
      chartImages.ChartImageKeys?,
      chartImages.ChartImageKeys?,
      chartImages.ChartImageKeys?,
      chartImages.ChartImageKeys?
    ],
    columnNames: columnNames,
    data: data
  }

  export interface TypeKPI {
    type: "KPI",
    title: string,
    name: ChartNames, // name should be always unique for each chart
    data: number
  }

  export interface CommonChartData {
    type: chartImages.GoogleActiveChartType, //"Bar" | ColumnChart // "BarChart"; //'PieChart';
    chartName: chartImages.ChartImageKeys,
    data: data,
    columnNames: chartTypesMap.columnNames | Array<[]>,
    options: any,
    title?: string,
    width?: number | string,
    height?: number | string,
  }

  export interface SelectedChartSlice {
    chartDataObject: TypeChart,
    chartName: chartImages.ChartImageKeys,
    selection: google.visualization.VisualizationSelectionArray[],
    selectedRow: MainData
  }

  export interface FilteredByMap {
    columnName: string,
    selectedRow: string | number | boolean | Date,
    selection: google.visualization.VisualizationSelectionArray[]
  }

}

export declare namespace chartImages {

  export type GoogleActiveChartType = "PieChart" | "Bar" | "BarChart" //"ColumnChart" |

  export type ChartImageKeys = "Doughnut" | "Pie" | "HorizontalBar" | "VerticalBar"

  export type mainInterface = {
    [key in ChartImageKeys]: {
      imageUrl: string;
      googleChartType: GoogleActiveChartType
    }
  }

  export type AvailableChartTypeKeys = {
    chartName: chartImages.ChartImageKeys,
    chartUrl: string,
    googleChartType: chartImages.GoogleActiveChartType,
    isActive: Boolean
  }

}

export const ChartImages: chartImages.mainInterface = {
  Doughnut: {
    imageUrl: "./assets/charts/images/chart_doughnut.jpg",
    googleChartType: "PieChart"
  },
  Pie: {
    imageUrl: "./assets/charts/images/chart_pie.png",
    googleChartType: "PieChart"
  },
  HorizontalBar: {
    imageUrl: "./assets/charts/images/chart_horizontal_bar.png",
    googleChartType: "BarChart"
  },
  VerticalBar: {
    imageUrl: "./assets/charts/images/chart_vertical_bar.png",
    googleChartType: "Bar"
  }
}


export const ChartTypesMap: Array<chartTypesMap.TypeChart | chartTypesMap.TypeKPI> = [
  {
    type: "CHART",
    name: "renewalContracts",
    title: "Renewal contracts in 30 days",
    defaultChartType: "VerticalBar",
    chartTypes: ["VerticalBar", "HorizontalBar"],
    columnNames: ["contractRenewalDate", "contractTypeCount"],
    data: [
      ["May-23", 30],
      ["Jun-23", 40],
      ["Jul-23", 60]
    ]
  },
  {
    type: "CHART",
    name: "expiringContracts",
    title: "Expiring contracts in 30 days",
    defaultChartType: "VerticalBar",
    chartTypes: ["VerticalBar", "HorizontalBar"],
    columnNames: ["contractExpiringDate", "contractTypeCount"],
    data: [
      ["May-23", 70],
      ["Jun-23", 30],
      ["Jul-23", 90]
    ]
  },
  {
    type: "KPI",
    title: "Total Value of contract",
    name: "kpiTotalValueOfContract",
    data: 4072384
  },
  {
    type: "CHART",
    name: "riskWise",
    title: "Risk-wise number of contracts",
    defaultChartType: "Pie",
    chartTypes: ["Pie", "Doughnut", "HorizontalBar", "VerticalBar"],
    columnNames: ["riskType", "riskCount"],
    data: [
      ["Low", 70],
      ["Medium", 30],
      ["High", 90]
    ]
  },
  {
    type: "CHART",
    name: "jurisdictionWise",
    title: "Jurisdiction-wise total no. of contracts",
    defaultChartType: "VerticalBar",
    chartTypes: ["VerticalBar", "HorizontalBar", "Doughnut", "Pie"],
    columnNames: ["jurisdictionCity", "contractTypeCount"],
    data: [
      ["Kolkata", 70],
      ["Bengaluru", 30],
      ["New Delhi", 90]
    ]
  },
  {
    type: "CHART",
    name: "typeOfSubCategory",
    title: "Type of sub-category with count(with %)",
    defaultChartType: "Doughnut",
    chartTypes: ["Doughnut", "Pie", "HorizontalBar", "VerticalBar"],
    columnNames: ["subCategory", "contractTypeCount"],
    data: [
      ["Academic Agreement", 70],
      ["Artist Producer Agreement", 30],
      ["Lease Agreement", 90]
    ]
  },
  {
    type: "CHART",
    name: "departmentWiseRiskBased",
    title: "Department-wise risk-based contracts",
    defaultChartType: "HorizontalBar",
    chartTypes: ["HorizontalBar", "VerticalBar", "Doughnut", "Pie"],
    columnNames: ["departmentName", "contractTypeCount"],
    data: [
      ["Sale", 70],
      ["Management", 30],
      ["Finance", 90]
    ]
  },
  {
    type: "CHART",
    name: "statusVsNoOfContracts",
    title: "Status vs. No. of contracts",
    defaultChartType: "Doughnut",
    chartTypes: ["Doughnut", "Pie", "HorizontalBar", "VerticalBar"],
    columnNames: ["status", "contractTypeCount"],
    data: [
      ["Review Pending", 70],
      ["Approval Pending", 30],
      ["Signature Pending", 90]
    ]
  },


  {
    type: "CHART",
    name: "typeVsNoOfContracts",
    title: "Type vs. no. of contracts",
    defaultChartType: "Pie",
    chartTypes: ["Pie", "Doughnut", "HorizontalBar", "VerticalBar"],
    columnNames: ["category", "contractTypeCount"],
    data: [
      ["Academic", 70],
      ["Art & Artist", 30],
      ["Music & Band", 90]
    ]
  },


  {
    type: "CHART",
    name: "counterparty",
    title: "Counterparty",
    defaultChartType: "Pie",
    chartTypes: ["Pie", "Doughnut", "HorizontalBar", "VerticalBar"],
    columnNames: ["counterparty", "contractTypeCount"],
    data: [
      ["HUL", 70],
      ["Dabur", 30],
      ["Pepsi", 90]
    ]
  },
  {
    type: "CHART",
    name: "activeInactiveContracts",
    title: "Active/Inactive contracts",
    defaultChartType: "Doughnut",
    chartTypes: ["Doughnut", "Pie", "HorizontalBar", "VerticalBar"],
    columnNames: ["status", "contractTypeCount"],
    data: [
      ["Active", 70],
      ["Inactive", 30]
    ]
  },
]


const jsonData: any = dummyJsonData[0]

for(let chartObj of ChartTypesMap){
  if(chartObj.name in jsonData){
    const jd: any = jsonData[chartObj.name] || {}
    if(chartObj.type === "CHART"){
      chartObj.chartTypes = jd.chartTypes
      chartObj.columnNames = jd.coulmnNames // "coulmnNames" spelling is wrong in json
      chartObj.data = (jd.data || []).map((obj: { key: string, value: Number })=>([obj.key, obj.value]))
    }else if(chartObj.type === "KPI"){
      // data not available in json
    }
  }
}
