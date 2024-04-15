import { abbreviateNumber } from "./utils.js"

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

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


export function createKPIMetric(){
    return [
        { label: "Total Contract", value: Math.floor(getRandomArbitrary(0,30)) },
        { label: "Contract (In Draft)", value: Math.floor(getRandomArbitrary(0,10)) },
        { label: "Total Publish Contract", value: Math.floor(getRandomArbitrary(0,20)) },
        { label: "Contract (In Review)", value: Math.floor(getRandomArbitrary(0,5)) },
        { label: "Contract (In Approval)", value: Math.floor(getRandomArbitrary(0,10)) },
        { label: "Contract (In Signature)", value: Math.floor(getRandomArbitrary(0,10)) },
        { label: "Contract (Recently Expired)", value: Math.floor(getRandomArbitrary(0,50)) },
        { label: "Contract (Expire in Next 30 Days)", value: Math.floor(getRandomArbitrary(0,100)) },
        { label: "Renewal Contract in Next 30 days", value: Math.floor(getRandomArbitrary(0,100)) },
        { label: "Value of Contract", value: "₹"+abbreviateNumber(Math.floor(getRandomArbitrary(0,1000000)),0), withPrizeFormat: true },
    ]
}

export function createSumOfContractValueByContractName(){
    const totalData = getRandomArbitrary(0,15)
    const totalCN= contractName.length
    const VALUES=[], LABELS=[];

    for(let i=0;i<totalData;++i){
        const random = Math.floor(getRandomArbitrary(0,totalCN))
        const value = getRandomArbitrary(getRandomArbitrary(0,100),getRandomArbitrary(0,100))

        LABELS.push(contractName[random])
        VALUES.push(Number((isNaN(value) ? getRandomArbitrary(0,100) : value).toFixed(2)))
    }

    return { VALUES, LABELS}
}

export function createNumberOfContractBaseOnJurisdiction(){
    const totalData = getRandomArbitrary(0,15)
    const totalCity = cityList.length
    const VALUES=[], LABELS=[];

    for(let i=0;i<totalData;++i){
        const random = Math.floor(getRandomArbitrary(0,totalCity))
        const value = getRandomArbitrary(getRandomArbitrary(0,100),getRandomArbitrary(0,100))

        LABELS.push(cityList[random])
        VALUES.push(Number((isNaN(value) ? getRandomArbitrary(0,100) : value).toFixed(2)))
    }

    return { VALUES, LABELS}
}

export function createRenewalDateBaseOnJurisdiction(){
    const totalData = getRandomArbitrary(0,15)
    const totalCity = cityList.length
    const VALUES=[], LABELS=[];

    for(let i=0;i<totalData;++i){
        const random = Math.floor(getRandomArbitrary(0,totalCity))
        const value = getRandomArbitrary(getRandomArbitrary(0,100),getRandomArbitrary(0,10000))

        LABELS.push(cityList[random])
        VALUES.push(Number((isNaN(value) ? getRandomArbitrary(0,100) : value).toFixed(2)))
    }

    return { VALUES, LABELS}
}
