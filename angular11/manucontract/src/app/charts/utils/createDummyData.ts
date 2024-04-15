
const cityList = [
  "Alipur",
  "Andaman Island",
  "Anderson Island",
  "Arainj-Laka-Punga",
  "Austinabad",
  "Bamboo Flat",
  "Barren Island",
  "Beadonabad",
  "Betapur",
  "Bindraban",
  "Bonington",
  "Brookesabad",
  "Cadell Point",
  "Calicut",
  "Chetamale",
  "Cinque Islands",
  "Defence Island",
  "Digilpur",
  "Dolyganj",
  "Flat Island",
  "Geinyale",
  "Great Coco Island",
  "Haddo",
  "Havelock Island",
  "Henry Lawrence Island",
  "Herbertabad",
  "Hobdaypur",
  "Ilichar",
  "Ingoie",
  "Inteview Island",
  "Jangli Ghat",
  "Jhon Lawrence Island",
  "Karen",
  "Kartara",
  "KYD Islannd",
  "Landfall Island",
  "Little Andmand",
  "Little Coco Island",
  "Long Island",
  "Maimyo",
  "Malappuram",
  "Manglutan",
  "Manpur",
  "Mitha Khari",
  "Neill Island",
  "Nicobar Island",
  "North Brother Island",
  "North Passage Island",
  "North Sentinel Island",
  "Nothen Reef Island",
  "Outram Island",
  "Pahlagaon",
  "Palalankwe",
  "Passage Island",
  "Phaiapong",
  "Phoenix Island",
  "Port Blair",
  "Preparis Island",
  "Protheroepur",
  "Rangachang",
  "Rongat",
  "Rutland Island",
  "Sabari",
  "Saddle Peak",
  "Shadipur",
  "Smith Island",
  "Sound Island",
  "South Sentinel Island",
  "Spike Island",
  "Tarmugli Island",
  "Taylerabad",
  "Titaije",
  "Toibalawe",
  "Tusonabad",
  "West Island",
  "Wimberleyganj",
  "Yadita"
]

const contractName = [
  "A+ Quality Construction",
  "Above the Board Construction",
  "All About Buildings",
  "All Zone Corporation",
  "Beach Contracting",
  "Best Roofing",
  "Black Diamond Construction Group",
  "Bright Castle General Contractors",
  "Cadence Builds",
  "Chip Off the Block Builders",
  "Choice Roof Contractor Group",
  "Coast Construction Group",
  "Custom Construction Services",
  "Destiny Builders",
  "Did Right Resources",
  "Dream House Construction",
  "Emerge Contractors",
  "Empire Gen Construction",
  "Fence Masters",
  "Golden Key Contractors",
  "Home Express Corp.",
  "Home Front Resources",
  "Infinity Construction Services",
  "Knockout Renovation",
  "Level Up Builders",
  "Luxury Construction Co.",
  "Main Stay General Contractors",
  "Mountain Home Construction",
  "My Home Design and Remodeling",
  "Neighborhood Creations",
  "New Home Builder",
  "One Stop Services",
  "Prestige Home Building",
  "Regal Renovations",
  "Right Choice Construction Corp",
  "Star Contractors",
  "Structure Tone",
  "Titan Builders",
  "Top Contractors",
  "Work Joy",
  "You Nailed It! Construction",
  "Your Neighborhood Construction"
]

const departmentName = [
  "Sale",
  "Management",
  "Finance",
  "Product",
  "Marketing",
  "Development"
]

const counterparty = [
  "HUL",
  "Dabur",
  "Pepsi",
  "HP",
  "Google",
  "MS",
  "Lenovo",
  "Samsung",
  "Xiaomi",
  "Apple",
  "Amazon",
  "Nike",
  "Disney",
  "Unilever",
  "IBM",
  "ADIDAS",
  "Sony",
  "Toyota",
  "Coco-Cola",
  "Starbucks",
  "McDonald's",
  "Intel",
  "Chanel",
  "Gucci",
  "Hermes",
  "Louis Vuitton",
  "FedEx"
]

const dataMap: any = {
  // chartName:
  renewalContracts: {
    columnNames: ["contractRenewalDate", "contractTypeCount"],
    // data: ["date", "number"],
    from: "date",
    maxDays: 30,
    isRequiredAll: true
  },
  expiringContracts: {
    columnNames: ["contractExpiringDate", "contractTypeCount"],
    // data: ["date", "number"]
    from: "date",
    maxDays: 30,
    isRequiredAll: true
  },
  riskWise: {
    columnNames: ["riskType", "riskCount"],
    // data: [ ["Low", "Medium", "High"], "number"],
    from: ["Low", "Medium", "High"],
    isRequiredAll: true
  },
  jurisdictionWise: {
    columnNames: ["jurisdictionCity", "contractTypeCount"],
    // data: [cityList, "number"]
    from: cityList
  },
  typeOfSubCategory: {
    columnNames: ["subCategory", "contractTypeCount"],
    // data: [contractName, "number"]
    from: contractName
  },
  departmentWiseRiskBased: {
    columnNames: ["departmentName", "contractTypeCount"],
    // data: [departmentName, "number"]
    from: departmentName
  },
  statusVsNoOfContracts: {
    columnNames: ["status", "contractTypeCount"],
    // data: [["Review Pending","Approval Pending","Signature Pending"], "number"],
    from: ["Review Pending","Approval Pending","Signature Pending"],
    isRequiredAll: true
  },
  typeVsNoOfContracts: {
    columnNames: ["category", "contractTypeCount"],
    // data: [contractName, "number"]
    from: contractName,
  },
  counterparty: {
    columnNames: ["counterparty", "contractTypeCount"],
    // data: [counterparty, "number"]
    from: counterparty,
  },
  activeInactiveContracts: {
    columnNames: ["status", "contractTypeCount"],
    // data: [["Active","Inactive"], "number"],
    from: ["Active","Inactive"],
    isRequiredAll: true
  },
  kpiTotalValueOfContract: {
    isKpi: true,
    data: 304
  }
}




function getRandomArbitrary(min: number, max:number) {
  return Math.random() * (max - min) + min;
}

function createData(chart: any={}){
  if(chart.isKpi)return Math.round(getRandomArbitrary(10,100000000))

  if("string" === typeof chart.from){
    if(chart.from === "date"){
      const date = new Date()
      const dates = []
      for(let i=0;i<chart.maxDays;++i){
        date.setDate(date.getDate() + 1)
        let curr = date.toString().split(" ")
        dates.push(`${curr[2]}-${curr[1]}`)
      }
     chart.from = dates
    }
  }

  var fromLength = chart.from.length
  var loopLength = Math.floor(chart.isRequiredAll ? fromLength : getRandomArbitrary(fromLength/(getRandomArbitrary(0,1) ? 2 : 3), fromLength))
  var data = []
  var usedIndex = new Map()

  const getIndex = (currentIndex:number, loopCount:number=0): number => {
    var index = Math.floor(chart.isRequiredAll ? currentIndex : getRandomArbitrary(0,fromLength))
    if(usedIndex.has(index)){
      if(loopCount > 10){
        return 0
      }else{
        return getIndex(currentIndex, ++loopCount)
      }
    }
    usedIndex.set(index, index)
    return index
  }

  for(let i=0; i < loopLength; ++i){
    var index = getIndex(i)
    var value = Math.round(getRandomArbitrary(getRandomArbitrary(0,getRandomArbitrary(10,10000)), getRandomArbitrary(0,getRandomArbitrary(10,10000))))
    data.push([chart.from[index], value ])
  }

  return data
}

export function generateDummyData(): any {
  const data: any = {}

  for(let chartName in dataMap){
    data[chartName] = {
      // ... !dataMap[chartName].isKpi && {
      //   columnNames: dataMap[chartName].columnNames
      // },
      data: createData(dataMap[chartName])
    }
  }


  return data
}
