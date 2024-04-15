// import { dummyJsonData } from "./dummyJsonData"


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
    | "subCategoryWise"
    | "departmentWise"
    | "categoryWise"
    | "counterParty"
    | "activeInactiveContracts"

  export type MainData = Array<string | number | boolean | Date>

  export type data = MainData[]

  export type columnNames = [string, string]

  export interface TypeChart {
    type: "CHART",
    name: ChartNames, // name should be always unique for each chart
    title: string,
    isVisible: boolean
    defaultChartType: chartImages.ChartImageKeys,
    selectedChartType?: chartImages.ChartImageKeys,
    chartTypes: [
      chartImages.ChartImageKeys?,
      chartImages.ChartImageKeys?,
      chartImages.ChartImageKeys?,
      chartImages.ChartImageKeys?
    ],
    columnNames: columnNames,
    data: data,
  }

  export interface TypeKPI {
    type: "KPI",
    name: ChartNames, // name should be always unique for each chart
    title: string,
    isVisible: boolean,
    data: number
  }

  export interface CommonChartData {
    type: chartImages.GoogleActiveChartType, //"Bar" | ColumnChart // "BarChart"; //'PieChart';
    chartName: chartImages.ChartImageKeys,
    data: data,
    columnNames: chartTypesMap.columnNames | Array<[] | {}>,
    formatter: any,
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


export interface SelectedChartFilterItem {
  name: chartTypesMap.ChartNames
  title?: string
}

export interface FilterChartList {
  items: SelectedChartFilterItem[]
  isSelected: boolean,
  isAll?: boolean
}

export declare namespace chartImages {

  export type GoogleActiveChartType = "PieChart" | "ColumnChart" | "BarChart"  // Bar, BarChart, ColumnChart

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
    googleChartType: "ColumnChart"
  }
}


export const ChartTypesMap22: Array<chartTypesMap.TypeChart | chartTypesMap.TypeKPI> = [


  {
    type: "CHART",
    name: "renewalContracts",
    title: "Renewal contracts in 30 days",
    isVisible: true,
    defaultChartType: "VerticalBar",
    chartTypes: ["Doughnut", "Pie", "HorizontalBar", "VerticalBar"],
    columnNames: ["ContractRenewalDate", "ContractCount"],
    data: [
      [
        "01 Jan 1900",
        4
      ],
      [
        "02 Sep 2022",
        1
      ],
      [
        "03 Dec 2022",
        2
      ],
      [
        "04 Dec 2022",
        14
      ],
      [
        "05 Dec 2022",
        2
      ],
      [
        "07 Aug 2022",
        2
      ],
      [
        "07 Oct 2022",
        2
      ],
      [
        "09 May 2023",
        7
      ],
      [
        "10 Dec 2022",
        1
      ],
      [
        "11 Nov 2022",
        2
      ],
      [
        "11 Oct 2022",
        2
      ],
      [
        "12 Dec 2022",
        1
      ],
      [
        "13 Dec 2022",
        2
      ],
      [
        "13 Nov 2022",
        2
      ],
      [
        "14 Feb 2023",
        2
      ],
      [
        "14 Oct 2022",
        4
      ],
      [
        "15 Feb 2023",
        3
      ],
      [
        "15 Oct 2022",
        2
      ],
      [
        "16 Oct 2022",
        2
      ],
      [
        "17 Dec 2022",
        2
      ],
      [
        "18 Dec 2022",
        2
      ],
      [
        "18 Oct 2022",
        3
      ],
      [
        "20 Dec 2022",
        1
      ],
      [
        "20 Oct 2022",
        4
      ],
      [
        "21 Dec 2022",
        4
      ],
      [
        "21 Oct 2022",
        2
      ],
      [
        "23 Oct 2022",
        4
      ],
      [
        "25 Dec 2022",
        5
      ],
      [
        "27 Oct 2022",
        2
      ],
      [
        "28 Aug 2022",
        2
      ],
      [
        "29 Sep 2022",
        2
      ],
      [
        "30 Sep 2022",
        7
      ],
      [
        "31 Aug 2022",
        6
      ]
    ]
  },




]

// remove: typeVsNoOfContracts, statusVsNoOfContracts

// const jsonData: any = dummyJsonData[0]

// for (let chartObj of ChartTypesMap) {
//   if (chartObj.name in jsonData) {
//     const jd: any = jsonData[chartObj.name] || {}
//     if (chartObj.type === "CHART") {
//       chartObj.chartTypes = jd.chartTypes
//       chartObj.columnNames = jd.coulmnNames // "coulmnNames" spelling is wrong in json
//       chartObj.data = (jd.data || []).map((obj: { key: string, value: Number }) => ([obj.key, obj.value]))
//     } else if (chartObj.type === "KPI") {
//       // data not available in json
//     }
//   }
// }






// original

export const ChartTypesMap: Array<chartTypesMap.TypeChart | chartTypesMap.TypeKPI> = [
  {
    type: "KPI",
    title: "Total Value of contract",
    isVisible: false,
    name: "kpiTotalValueOfContract",
    data: 4072384
  },

  {
    type: "CHART",
    name: "activeInactiveContracts",
    title: "Active/Inactive Contracts",
    isVisible: true,
    defaultChartType: "Doughnut",
    chartTypes: ["Doughnut", "Pie", "HorizontalBar", "VerticalBar"],
    columnNames: ["Status", "ContractCount"],
    data: [
      // ["Active", 600],
      // ["Inactive", 17]
    ]
  },

  {
    type: "CHART",
    name: "counterParty",
    title: "Counter Party",
    isVisible: true,
    defaultChartType: "Pie",
    chartTypes: ["Doughnut", "Pie", "HorizontalBar", "VerticalBar"],
    columnNames: ["CounterParty", "ContractCount"],
    data: [
      [
        "br Kumar",
        16
      ],
      [
        "Chirag Kumar",
        7
      ],
      [
        "GL Kumar",
        3
      ],
      [
        "Kajal Sanchela",
        110
      ],
      [
        "Ram Kumar",
        5
      ],
      [
        "khan Kumar",
        12
      ],
      [
        "manu patra",
        11
      ],
      [
        "Alex Pandey",
        44
      ],
      [
        "ML Kumar",
        1
      ],
      [
        "Tom Tizu",
        20
      ],
      [
        "Vijay Raj",
        4
      ],
      [
        "Alex Kumar",
        3
      ]
    ]
  },
  {
    type: "CHART",
    name: "renewalContracts",
    title: "Renewal contracts in 30 days",
    isVisible: false,
    defaultChartType: "VerticalBar",
    chartTypes: ["Doughnut", "Pie", "HorizontalBar", "VerticalBar"],
    columnNames: ["ContractRenewalDate", "ContractCount"],
    data: [
      [
        "01 Jan 1900",
        4
      ],
      [
        "02 Sep 2022",
        1
      ],
      [
        "03 Dec 2022",
        2
      ],
      [
        "04 Dec 2022",
        14
      ],
      [
        "05 Dec 2022",
        2
      ],
      [
        "07 Aug 2022",
        2
      ],
      [
        "07 Oct 2022",
        2
      ],
      [
        "09 May 2023",
        7
      ],
      [
        "10 Dec 2022",
        1
      ],
      [
        "11 Nov 2022",
        2
      ],
      [
        "11 Oct 2022",
        2
      ],
      [
        "12 Dec 2022",
        1
      ],
      [
        "13 Dec 2022",
        2
      ],
      [
        "13 Nov 2022",
        2
      ],
      [
        "14 Feb 2023",
        2
      ],
      [
        "14 Oct 2022",
        4
      ],
      [
        "15 Feb 2023",
        3
      ],
      [
        "15 Oct 2022",
        2
      ],
      [
        "16 Oct 2022",
        2
      ],
      [
        "17 Dec 2022",
        2
      ],
      [
        "18 Dec 2022",
        2
      ],
      [
        "18 Oct 2022",
        3
      ],
      [
        "20 Dec 2022",
        1
      ],
      [
        "20 Oct 2022",
        4
      ],
      [
        "21 Dec 2022",
        4
      ],
      [
        "21 Oct 2022",
        2
      ],
      [
        "23 Oct 2022",
        4
      ],
      [
        "25 Dec 2022",
        5
      ],
      [
        "27 Oct 2022",
        2
      ],
      [
        "28 Aug 2022",
        2
      ],
      [
        "29 Sep 2022",
        2
      ],
      [
        "30 Sep 2022",
        7
      ],
      [
        "31 Aug 2022",
        6
      ]
    ]
  },
  {
    type: "CHART",
    name: "expiringContracts",
    title: "Expiring contracts in 30 days",
    isVisible: true,
    defaultChartType: "VerticalBar",
    chartTypes: [ "Doughnut", "Pie", "HorizontalBar", "VerticalBar"],
    columnNames: ["ExpiryDate", "ContractCount"],
    data: [
      [
        "01 Dec 2022",
        5
      ],
      [
        "01 Sep 2022",
        2
      ],
      [
        "02 Dec 2022",
        11
      ],
      [
        "02 Mar 2023",
        1
      ],
      [
        "03 Dec 2022",
        2
      ],
      [
        "03 Mar 2023",
        3
      ],
      [
        "03 Nov 2022",
        6
      ],
      [
        "03 Oct 2022",
        2
      ],
      [
        "04 Apr 2023",
        1
      ],
      [
        "04 May 2023",
        1
      ],
      [
        "05 Apr 2023",
        2
      ],
      [
        "05 Aug 2022",
        1
      ],
      [
        "05 May 2023",
        3
      ],
      [
        "06 Apr 2023",
        1
      ],
      [
        "06 Aug 2022",
        2
      ],
      [
        "06 Nov 2022",
        1
      ],
      [
        "07 Apr 2023",
        2
      ],
      [
        "07 Feb 2023",
        2
      ],
      [
        "08 Dec 2022",
        1
      ],
      [
        "09 Dec 2022",
        2
      ],
      [
        "09 Jul 2022",
        1
      ],
      [
        "09 Mar 2023",
        1
      ],
      [
        "09 Nov 2022",
        2
      ],
      [
        "09 Oct 2022",
        2
      ],
      [
        "10 Dec 2022",
        1
      ],
      [
        "10 Feb 2023",
        2
      ],
      [
        "10 Jun 2026",
        1
      ],
      [
        "10 Mar 2023",
        3
      ],
      [
        "10 Oct 2022",
        4
      ],
      [
        "11 Mar 2023",
        3
      ],
      [
        "11 May 2023",
        1
      ],
      [
        "11 Nov 2022",
        2
      ],
      [
        "12 Mar 2023",
        2
      ],
      [
        "12 May 2023",
        1
      ],
      [
        "12 Oct 2022",
        4
      ],
      [
        "13 Jul 2022",
        1
      ],
      [
        "14 Apr 2023",
        9
      ],
      [
        "14 Dec 2022",
        2
      ],
      [
        "14 Feb 2023",
        1
      ],
      [
        "15 Dec 2022",
        3
      ],
      [
        "15 Feb 2023",
        4
      ],
      [
        "15 Oct 2022",
        6
      ],
      [
        "15 Sep 2022",
        1
      ],
      [
        "16 Aug 2022",
        1
      ],
      [
        "16 Dec 2022",
        1
      ],
      [
        "16 Feb 2023",
        2
      ],
      [
        "16 Mar 2023",
        1
      ],
      [
        "16 Oct 2022",
        3
      ],
      [
        "17 Dec 2022",
        4
      ],
      [
        "17 Feb 2023",
        2
      ],
      [
        "17 Mar 2023",
        1
      ],
      [
        "18 Dec 2022",
        2
      ],
      [
        "18 Jul 2022",
        1
      ],
      [
        "18 Mar 2023",
        1
      ],
      [
        "19 Dec 2022",
        1
      ],
      [
        "19 May 2023",
        1
      ],
      [
        "20 Aug 2022",
        2
      ],
      [
        "20 Mar 2023",
        32
      ],
      [
        "20 Nov 2022",
        6
      ],
      [
        "20 Nov 2025",
        1
      ],
      [
        "20 Oct 2022",
        2
      ],
      [
        "21 Apr 2023",
        1
      ],
      [
        "21 Feb 2023",
        7
      ],
      [
        "21 Oct 2022",
        2
      ],
      [
        "22 Feb 2023",
        2
      ],
      [
        "23 Aug 2022",
        1
      ],
      [
        "23 Oct 2022",
        6
      ],
      [
        "24 Apr 2023",
        1
      ],
      [
        "24 Feb 2023",
        1
      ],
      [
        "24 Mar 2023",
        2
      ],
      [
        "24 Oct 2022",
        2
      ],
      [
        "24 Sep 2022",
        1
      ],
      [
        "25 Mar 2023",
        3
      ],
      [
        "26 Feb 2023",
        2
      ],
      [
        "27 Apr 2023",
        2
      ],
      [
        "27 Aug 2022",
        2
      ],
      [
        "28 Apr 2023",
        4
      ],
      [
        "28 Aug 2022",
        8
      ],
      [
        "28 Oct 2022",
        1
      ],
      [
        "28 Sep 2022",
        2
      ],
      [
        "28 Sep 2023",
        1
      ],
      [
        "29 Mar 2023",
        3
      ],
      [
        "29 Sep 2022",
        6
      ],
      [
        "30 Mar 2023",
        5
      ],
      [
        "31 Jul 2022",
        4
      ],
      [
        "31 Mar 2023",
        11
      ],
      [
        "31 Oct 2022",
        2
      ]
    ]
  },
  {
    type: "CHART",
    name: "riskWise",
    title: "Risk Wise",
    isVisible: false,
    defaultChartType: "VerticalBar",
    chartTypes: ["Doughnut", "Pie", "HorizontalBar", "VerticalBar"],
    columnNames: ["ContractRiskName", "ContractCount"],
    data: [
      ["", 394],
      ["Low", 121],
      ["Medium", 102]
    ]
  },
  {
    type: "CHART",
    name: "jurisdictionWise",
    title: "Jurisdiction Wise",
    isVisible: false,
    defaultChartType: "VerticalBar",
    chartTypes: ["Doughnut", "Pie", "HorizontalBar", "VerticalBar"],
    columnNames: ["JurisdictionName", "ContractCount"],
    data: [
      [
        null,
        22
      ],
      [
        "Ahmedabad",
        325
      ],
      [
        "Australia",
        17
      ],
      [
        "Belgium",
        1
      ],
      [
        "Bengaluru",
        100
      ],
      [
        "BIHAR",
        34
      ],
      [
        "Canada",
        1
      ],
      [
        "Chennai",
        22
      ],
      [
        "China",
        1
      ],
      [
        "Hyderabad",
        8
      ],
      [
        "Kolkata",
        40
      ],
      [
        "Mumbai",
        7
      ],
      [
        "New Delhi",
        37
      ],
      [
        "Pune",
        2
      ]
    ]
  },
  {
    type: "CHART",
    name: "categoryWise",
    title: "Category Wise",
    isVisible: true,
    defaultChartType: "VerticalBar",
    chartTypes: ["Doughnut", "Pie", "HorizontalBar", "VerticalBar"],
    columnNames: ["Category", "ContractCount"],
    data: [
      [
          null,
          81
      ],
      [
          "Academic",
          358
      ],
      [
          "Alternate Dispute Resolution",
          48
      ],
      [
          "Art & Artist",
          10
      ],
      [
          "Aviation",
          7
      ],
      [
          "Banking",
          2
      ],
      [
          "Broadcasting and Media",
          27
      ],
      [
          "Business",
          6
      ],
      [
          "Employment",
          7
      ],
      [
          "Energy",
          2
      ],
      [
          "Environment & Sustainability",
          36
      ],
      [
          "Insurance",
          1
      ],
      [
          "Maritime",
          3
      ],
      [
          "Medical",
          2
      ],
      [
          "Real Estate",
          2
      ],
      [
          "Research & Development",
          7
      ],
      [
          "Sales",
          1
      ],
      [
          "Service",
          4
      ],
      [
          "Shipping",
          1
      ],
      [
          "Software",
          9
      ],
      [
          "Terms & Conditions",
          3
      ]
  ]
  },
  {
    type: "CHART",
    name: "subCategoryWise",
    title: "SubCategory Wise",
    isVisible: false,
    defaultChartType: "VerticalBar",
    chartTypes: ["Doughnut", "Pie", "HorizontalBar", "VerticalBar"],
    columnNames: ["SubCategory", "ContractCount"],
    data: [
      ["Academic Agreement", 70],
      ["Artist Producer Agreement", 30],
      ["Lease Agreement", 90]
    ]
  },
  {
    type: "CHART",
    name: "departmentWise",
    title: "Department Wise",
    isVisible: false,
    defaultChartType: "VerticalBar",
    chartTypes: ["Doughnut", "Pie", "HorizontalBar", "VerticalBar"],
    columnNames: ["DepartmentName", "ContractCount"],
    data: [
      [
        "Auditor",
        14
      ],
      [
        "Finance",
        354
      ],
      [
        "HR",
        4
      ],
      [
        "IT - Software",
        64
      ],
      [
        "Legal",
        19
      ],
      [
        "Management",
        162
      ]
    ]
  },


]



export const ChartTypesMap2: Array<chartTypesMap.TypeChart | chartTypesMap.TypeKPI> = [
  {
    type: "KPI",
    title: "Total Value of contract",
    isVisible: false,
    name: "kpiTotalValueOfContract",
    data: 4072384
  },

  {
    type: "CHART",
    name: "activeInactiveContracts",
    title: "Active/Inactive Contracts",
    isVisible: false,
    defaultChartType: "Doughnut",
    chartTypes: ["Doughnut", "Pie", "HorizontalBar", "VerticalBar"],
    columnNames: ["Status", "ContractCount"],
    data: [
      // ["Active", 600],
      // ["Inactive", 17]
    ]
  },

  {
    type: "CHART",
    name: "counterParty",
    title: "Counter Party",
    isVisible: false,
    defaultChartType: "Pie",
    chartTypes: ["Doughnut", "Pie", "HorizontalBar", "VerticalBar"],
    columnNames: ["CounterParty", "ContractCount"],
    data: [
      [
        "br Kumar",
        16
      ],
      [
        "Chirag Kumar",
        7
      ],
      [
        "GL Kumar",
        3
      ],
      [
        "Kajal Sanchela",
        110
      ],
      [
        "Ram Kumar",
        5
      ],
      [
        "khan Kumar",
        12
      ],
      [
        "manu patra",
        11
      ],
      [
        "Alex Pandey",
        44
      ],
      [
        "ML Kumar",
        1
      ],
      [
        "Tom Tizu",
        20
      ],
      [
        "Vijay Raj",
        4
      ],
      [
        "Alex Kumar",
        3
      ]
    ]
  },
  {
    type: "CHART",
    name: "renewalContracts",
    title: "Renewal contracts in 30 days",
    isVisible: false,
    defaultChartType: "VerticalBar",
    chartTypes: ["Doughnut", "Pie", "HorizontalBar", "VerticalBar"],
    columnNames: ["ContractRenewalDate", "ContractCount"],
    data: [
      [
        "01 Jan 1900",
        4
      ],
      [
        "02 Sep 2022",
        1
      ],
      [
        "03 Dec 2022",
        2
      ],
      [
        "04 Dec 2022",
        14
      ],
      [
        "05 Dec 2022",
        2
      ],
      [
        "07 Aug 2022",
        2
      ],
      [
        "07 Oct 2022",
        2
      ],
      [
        "09 May 2023",
        7
      ],
      [
        "10 Dec 2022",
        1
      ],
      [
        "11 Nov 2022",
        2
      ],
      [
        "11 Oct 2022",
        2
      ],
      [
        "12 Dec 2022",
        1
      ],
      [
        "13 Dec 2022",
        2
      ],
      [
        "13 Nov 2022",
        2
      ],
      [
        "14 Feb 2023",
        2
      ],
      [
        "14 Oct 2022",
        4
      ],
      [
        "15 Feb 2023",
        3
      ],
      [
        "15 Oct 2022",
        2
      ],
      [
        "16 Oct 2022",
        2
      ],
      [
        "17 Dec 2022",
        2
      ],
      [
        "18 Dec 2022",
        2
      ],
      [
        "18 Oct 2022",
        3
      ],
      [
        "20 Dec 2022",
        1
      ],
      [
        "20 Oct 2022",
        4
      ],
      [
        "21 Dec 2022",
        4
      ],
      [
        "21 Oct 2022",
        2
      ],
      [
        "23 Oct 2022",
        4
      ],
      [
        "25 Dec 2022",
        5
      ],
      [
        "27 Oct 2022",
        2
      ],
      [
        "28 Aug 2022",
        2
      ],
      [
        "29 Sep 2022",
        2
      ],
      [
        "30 Sep 2022",
        7
      ],
      [
        "31 Aug 2022",
        6
      ]
    ]
  },
  {
    type: "CHART",
    name: "expiringContracts",
    title: "Expiring contracts in 30 days",
    isVisible: false,
    defaultChartType: "VerticalBar",
    chartTypes: [ "Doughnut", "Pie", "HorizontalBar", "VerticalBar"],
    columnNames: ["ExpiryDate", "ContractCount"],
    data: [
      [
        "01 Dec 2022",
        5
      ],
      [
        "01 Sep 2022",
        2
      ],
      [
        "02 Dec 2022",
        11
      ],
      [
        "02 Mar 2023",
        1
      ],
      [
        "03 Dec 2022",
        2
      ],
      [
        "03 Mar 2023",
        3
      ],
      [
        "03 Nov 2022",
        6
      ],
      [
        "03 Oct 2022",
        2
      ],
      [
        "04 Apr 2023",
        1
      ],
      [
        "04 May 2023",
        1
      ],
      [
        "05 Apr 2023",
        2
      ],
      [
        "05 Aug 2022",
        1
      ],
      [
        "05 May 2023",
        3
      ],
      [
        "06 Apr 2023",
        1
      ],
      [
        "06 Aug 2022",
        2
      ],
      [
        "06 Nov 2022",
        1
      ],
      [
        "07 Apr 2023",
        2
      ],
      [
        "07 Feb 2023",
        2
      ],
      [
        "08 Dec 2022",
        1
      ],
      [
        "09 Dec 2022",
        2
      ],
      [
        "09 Jul 2022",
        1
      ],
      [
        "09 Mar 2023",
        1
      ],
      [
        "09 Nov 2022",
        2
      ],
      [
        "09 Oct 2022",
        2
      ],
      [
        "10 Dec 2022",
        1
      ],
      [
        "10 Feb 2023",
        2
      ],
      [
        "10 Jun 2026",
        1
      ],
      [
        "10 Mar 2023",
        3
      ],
      [
        "10 Oct 2022",
        4
      ],
      [
        "11 Mar 2023",
        3
      ],
      [
        "11 May 2023",
        1
      ],
      [
        "11 Nov 2022",
        2
      ],
      [
        "12 Mar 2023",
        2
      ],
      [
        "12 May 2023",
        1
      ],
      [
        "12 Oct 2022",
        4
      ],
      [
        "13 Jul 2022",
        1
      ],
      [
        "14 Apr 2023",
        9
      ],
      [
        "14 Dec 2022",
        2
      ],
      [
        "14 Feb 2023",
        1
      ],
      [
        "15 Dec 2022",
        3
      ],
      [
        "15 Feb 2023",
        4
      ],
      [
        "15 Oct 2022",
        6
      ],
      [
        "15 Sep 2022",
        1
      ],
      [
        "16 Aug 2022",
        1
      ],
      [
        "16 Dec 2022",
        1
      ],
      [
        "16 Feb 2023",
        2
      ],
      [
        "16 Mar 2023",
        1
      ],
      [
        "16 Oct 2022",
        3
      ],
      [
        "17 Dec 2022",
        4
      ],
      [
        "17 Feb 2023",
        2
      ],
      [
        "17 Mar 2023",
        1
      ],
      [
        "18 Dec 2022",
        2
      ],
      [
        "18 Jul 2022",
        1
      ],
      [
        "18 Mar 2023",
        1
      ],
      [
        "19 Dec 2022",
        1
      ],
      [
        "19 May 2023",
        1
      ],
      [
        "20 Aug 2022",
        2
      ],
      [
        "20 Mar 2023",
        32
      ],
      [
        "20 Nov 2022",
        6
      ],
      [
        "20 Nov 2025",
        1
      ],
      [
        "20 Oct 2022",
        2
      ],
      [
        "21 Apr 2023",
        1
      ],
      [
        "21 Feb 2023",
        7
      ],
      [
        "21 Oct 2022",
        2
      ],
      [
        "22 Feb 2023",
        2
      ],
      [
        "23 Aug 2022",
        1
      ],
      [
        "23 Oct 2022",
        6
      ],
      [
        "24 Apr 2023",
        1
      ],
      [
        "24 Feb 2023",
        1
      ],
      [
        "24 Mar 2023",
        2
      ],
      [
        "24 Oct 2022",
        2
      ],
      [
        "24 Sep 2022",
        1
      ],
      [
        "25 Mar 2023",
        3
      ],
      [
        "26 Feb 2023",
        2
      ],
      [
        "27 Apr 2023",
        2
      ],
      [
        "27 Aug 2022",
        2
      ],
      [
        "28 Apr 2023",
        4
      ],
      [
        "28 Aug 2022",
        8
      ],
      [
        "28 Oct 2022",
        1
      ],
      [
        "28 Sep 2022",
        2
      ],
      [
        "28 Sep 2023",
        1
      ],
      [
        "29 Mar 2023",
        3
      ],
      [
        "29 Sep 2022",
        6
      ],
      [
        "30 Mar 2023",
        5
      ],
      [
        "31 Jul 2022",
        4
      ],
      [
        "31 Mar 2023",
        11
      ],
      [
        "31 Oct 2022",
        2
      ]
    ]
  },
  {
    type: "CHART",
    name: "riskWise",
    title: "Risk Wise",
    isVisible: false,
    defaultChartType: "VerticalBar",
    chartTypes: ["Doughnut", "Pie", "HorizontalBar", "VerticalBar"],
    columnNames: ["ContractRiskName", "ContractCount"],
    data: [
      ["", 394],
      ["Low", 121],
      ["Medium", 102]
    ]
  },
  {
    type: "CHART",
    name: "jurisdictionWise",
    title: "Jurisdiction Wise",
    isVisible: false,
    defaultChartType: "VerticalBar",
    chartTypes: ["Doughnut", "Pie", "HorizontalBar", "VerticalBar"],
    columnNames: ["JurisdictionName", "ContractCount"],
    data: [
      [
        null,
        22
      ],
      [
        "Ahmedabad",
        325
      ],
      [
        "Australia",
        17
      ],
      [
        "Belgium",
        1
      ],
      [
        "Bengaluru",
        100
      ],
      [
        "BIHAR",
        34
      ],
      [
        "Canada",
        1
      ],
      [
        "Chennai",
        22
      ],
      [
        "China",
        1
      ],
      [
        "Hyderabad",
        8
      ],
      [
        "Kolkata",
        40
      ],
      [
        "Mumbai",
        7
      ],
      [
        "New Delhi",
        37
      ],
      [
        "Pune",
        2
      ]
    ]
  },
  {
    type: "CHART",
    name: "categoryWise",
    title: "Category Wise",
    isVisible: true,
    defaultChartType: "VerticalBar",
    chartTypes: ["Doughnut", "Pie", "HorizontalBar", "VerticalBar"],
    columnNames: ["Category", "ContractCount"],
    data: [
      [
          null,
          81
      ],
      [
          "Academic",
          358
      ],
      [
          "Alternate Dispute Resolution",
          48
      ],
      [
          "Art & Artist",
          10
      ],
      [
          "Aviation",
          7
      ],
      [
          "Banking",
          2
      ],
      [
          "Broadcasting and Media",
          27
      ],
      [
          "Business",
          6
      ],
      [
          "Employment",
          7
      ],
      [
          "Energy",
          2
      ],
      [
          "Environment & Sustainability",
          36
      ],
      [
          "Insurance",
          1
      ],
      [
          "Maritime",
          3
      ],
      [
          "Medical",
          2
      ],
      [
          "Real Estate",
          2
      ],
      [
          "Research & Development",
          7
      ],
      [
          "Sales",
          1
      ],
      [
          "Service",
          4
      ],
      [
          "Shipping",
          1
      ],
      [
          "Software",
          9
      ],
      [
          "Terms & Conditions",
          3
      ]
  ]
  },
  {
    type: "CHART",
    name: "subCategoryWise",
    title: "SubCategory Wise",
    isVisible: false,
    defaultChartType: "VerticalBar",
    chartTypes: ["Doughnut", "Pie", "HorizontalBar", "VerticalBar"],
    columnNames: ["SubCategory", "ContractCount"],
    data: [
      ["Academic Agreement", 70],
      ["Artist Producer Agreement", 30],
      ["Lease Agreement", 90]
    ]
  },
  {
    type: "CHART",
    name: "departmentWise",
    title: "Department Wise",
    isVisible: false,
    defaultChartType: "VerticalBar",
    chartTypes: ["Doughnut", "Pie", "HorizontalBar", "VerticalBar"],
    columnNames: ["DepartmentName", "ContractCount"],
    data: [
      [
        "Auditor",
        14
      ],
      [
        "Finance",
        354
      ],
      [
        "HR",
        4
      ],
      [
        "IT - Software",
        64
      ],
      [
        "Legal",
        19
      ],
      [
        "Management",
        162
      ]
    ]
  },


]
