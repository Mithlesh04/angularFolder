import ApexCharts from "./apexcharts.js"
import { CustomDropDown } from "./utils.js"
import { createKPIMetric, createSumOfContractValueByContractName, createNumberOfContractBaseOnJurisdiction, createRenewalDateBaseOnJurisdiction } from "./dummyData.js"


class IdeepenersCharts{

    MAX_PIE_DOUGHNUT_CHART_WIDTH = 500
    PIE_DOUGHNUT_CHART_SCALE = 1

    // html elements
    ELEMENT_OF_KPI_METRIC = ""
    ELEMENT_OF_DEPARTMENT_NAME_DROPDOWN = ""
    ELEMENT_OF_CATEGORY_DROPDOWN = ""
    ELEMENT_OF_SUM_OF_CONTRACT_VALUE_BY_CONTRACT_NAME = ""
    ELEMENT_OF_NUMBER_OF_CONTRACT_BASED_ON_JURISDICTION = ""

    // store the internal states
    INTERNAL_STATE = { 
        SELECTED_INDEX_OF_SUM_OF_CONTRACT: 1, // null | number(index will start from 0)
        NUMBER_OF_CONTRACT_BASED_ON_JURISDICTION: null, // null | number(index will start from 0)
        NUMBER_OF_RENEWAL_DATE_BASED_ON_JURISDICTION: null, // null | number(index will start from 0)

    }

    // store the value
    STATE = {
        KPI_METRIC: [
            { label: "Total Contract", value: 37 },
            { label: "Contract (In Draft)", value: 10 },
            { label: "Total Publish Contract", value: 27 },
            { label: "Contract (In Review)", value: 10 },
            { label: "Contract (In Approval)", value: 5 },
            { label: "Contract (In Signature)", value: 37 },
            { label: "Contract (Recently Expired)", value: 21 },
            { label: "Contract (Expire in Next 30 Days)", value: 11 },
            { label: "Renewal Contract in Next 30 days", value: 16 },
            { label: "Value of Contract", value: '₹1.62M' },
        ],
        SUM_OF_CONTRACT_VALUE_BY_CONTRACT_NAME: {
            VALUES: [44, 55, 41, 17, 15,15], //name_dname_dname_dname_dname_dname_d
            LABELS: ['s-bda-44','name_d-55','name_d-41','name_d-17', 'name_d-15', 'name_d2-15'],
        },
        NUMBER_OF_CONTRACT_BASED_ON_JURISDICTION: {
            VALUES: [], //[44, 55, 13, 43, 22],
            LABELS: [] //['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            // VALUES: [10],
            // LABELS: ['Team 1'],
        },
        RENEWAL_DATE_BASED_ON_JURISDICTION: {
            VALUES: [1001,1511,1189,1100,1291,1291,1291,1291],
            LABELS: ['Chennai','New Delhi','Ahmedaba','Hyderabad','Chennai',"Mumbai","Bihar",'Patna'],
            // CHART_DATA: [
            //     { x: 'Chennai', y: 1001},
            //     { x: 'New Delhi', y: 1511},
            //     { x: 'Ahmedaba', y: 1189},
            //     { x: 'Hyderabad', y: 1100},
            //     { x: 'Bengaluru', y: 1291},
            //     { x: 'Hyderabad', y: 1100},
            //     { x: 'Chennai', y: 1001},
            // ],

        },
        DEPARTMENT_NAME_LIST: [
            { label: "Management", value: 15, selected: true },
            { label: "Legal", value: 12, selected: false },
            { label: "Finance", value: 7, selected: false },
            { label: "HR long text for test. HR long text for test. HR long text for test. HR long text for test.", value: 3, selected: false },
            { label: "HR", value: 3, selected: false },
            { label: "HR 2", value: 3, selected: false },
            { label: "HR 3", value: 3, selected: false },
            { label: "HR 4", value: 3, selected: false },
            { label: "HR 5", value: 3, selected: false },
            { label: "HR 6", value: 3, selected: false },
            { label: "HR 7", value: 3, selected: false },
        ],
        CATEGORY_LIST: [
            { label: "Management", value: 15 },
            { label: "Legal", value: 12 },
            { label: "Finance", value: 7 },
            { label: "HR", value: 3 },
        ],
       
    }
    

    dataLabelFontSizeWhenDataWillGreaterThen = {
        "default": "10px",
        ">10": '11px',
        ">18": '9px',
        ">29": '6px',
    }

    methodList = [
        // "kpiDetailsSection",
        // "kpiDetailsSection",
        // "departmentNameDropDown",
        // "categoryDropDown",
        // "doughnutChart",
        "pieChart",
        "barChart"
    ]

    MULTI_LABELS_SEPARATOR = ","


    constructor(data={}){
        
        // it can accept any keys
        for(let key in data){
            this[key] = data[key]
        }
    }

    setInternalState(name, data={}, callFilter=true){
        for(let key in data){
            this.INTERNAL_STATE[key] = data[key]
        }

        if(callFilter){
            this.internal_onFilter({
                name: name,
                filterData: data
            })
        }
        
    }

    setState(data={}, onComplete=_=>null){
        for(let key in data){
            this.STATE[key] = data[key]
        }
        if(onComplete){
            onComplete()
        }
    }

    customTooltip({ title="", value="", percentage="", customFooter=""}){
        return `
            <div class="chart-custom-tooltip">
                <div class="ch-title">${title}</div>
                <div class='ch-value'>
                    <div>${value} (${percentage})</div>
                </div>
            </div>
        `
    }

    centerDataLabelYAxis(values=[], chartContext){
        // center the value when there is only single value
        if(values.length <= 1 && chartContext.el){
            const textEl = chartContext.el.querySelector('g.apexcharts-slices g.apexcharts-datalabels text.apexcharts-text')
            if(textEl){
                textEl.setAttribute("y",Number(textEl.getAttribute("y")) / 1.7)
            }
        }
    }

    mergeSameData(values=[],labels=[]){
        const newD = {}
        var length = values.length
        for(let i=0;i<length;++i){
            const v = values[i]
            if(!(v in newD))newD[v] = []
            newD[v].push(labels [i])
        }

        values = []
        labels = []

        for(let value in newD){
            values.push(Number(value))
            labels.push(newD[value].map((e,i)=> newD[value].length === i+1 ? e : e+this.MULTI_LABELS_SEPARATOR ))
        }

        console.log("newD = ", newD)
        return { values, labels }
    }

    getPieDoughnutChartConfig({ name, type, stateKey, internalStateKey, element }){
        const self = this

        var fontSize = self.dataLabelFontSizeWhenDataWillGreaterThen.default || "initial"
        const dataLength = self.STATE[stateKey].VALUES.length

        for(let cond in self.dataLabelFontSizeWhenDataWillGreaterThen){
            const n = Number(cond.trim().slice(1))
            if(!isNaN(n) && dataLength > n){
                fontSize = self.dataLabelFontSizeWhenDataWillGreaterThen[cond]
            }
        }

        var values = self.STATE[stateKey].VALUES
        var labels = self.STATE[stateKey].LABELS;
        ({ values, labels } = self.mergeSameData(values,labels));

        var options = {
            series: values,
            labels: labels,

            chart: {
                fontFamily: "'Roboto', sans-serif",
                type: type,
                events: {
                    ... type === "pie" && {
                        mounted: function(chartContext) {
                            self.centerDataLabelYAxis(self.STATE[stateKey].VALUES, chartContext)
                        },
                        updated: function(chartContext) {
                            self.centerDataLabelYAxis(self.STATE[stateKey].VALUES, chartContext)
                        },
                    },
                    legendClick: function(chartContext, seriesIndex, config) {
                        self.setInternalState(name, {
                            [internalStateKey]: Number(seriesIndex)
                        })
                    },
                    click: function(event, chartContext, config) {
                        self.setInternalState(name, {
                            [internalStateKey]: ((chartContext.pie?.w.globals?.selectedDataPoints ||[])[0] || null)
                        })                        
                    },
                    animationEnd: function(ctx) {
                        if('number' === typeof self.INTERNAL_STATE[internalStateKey]){
                            ctx.toggleDataPointSelection(self.INTERNAL_STATE[internalStateKey])
                        }
                        // ctx.highlightSeriesOnLegendHover(1)
                        console.log(ctx)
                    }
                    // dataPointMouseEnter: function(event, chartContext, config) {
                    //     // ...
                    // }
                }
            },
            tooltip: {
                // enabled: false,
                custom: function({series, seriesIndex, dataPointIndex, w}) {
                    return self.customTooltip({
                        title: w.globals.labels[seriesIndex],
                        value: series[seriesIndex],
                        percentage: (w.globals.seriesPercent[seriesIndex] || [])[w.globals.dataPoint||0].toFixed(2) + '%'
                    })
                }
                
            },
           
            dataLabels: {
                enabled: true,
                enabledOnSeries: 1,
                // textAnchor: 'center',
                textAnchor: 'middle',
                style: {
                  colors: ['#fff'],
                //   fontSize: self.STATE[stateKey].VALUES.length >= 30 ? 'px' : '12px'
                    fontSize: fontSize
                },
                formatter: function (val, opts) {
                    return (opts.w.globals.seriesPercent[opts.seriesIndex] || [])[opts.w.globals.dataPoint||0].toFixed(2) + '%'
                },
                dropShadow: {
                  enabled: false
                }
            },
            stroke: {
                show: false,
            },
            plotOptions: {
                pie: {
                    // expandOnClick: false,
                    customScale: this.PIE_DOUGHNUT_CHART_SCALE,
                    // size: "400px",
                    dataLabels: {
                        position: 'top'
                    },
                    donut: {
                        dataLabels: {
                            position: 'top'
                        },
                        // labels: {
                        //   show: true,
                        // //   name: {
                            
                        // //   },
                        //   value: {
                            
                        //   },
                        //   percentage:{}
                        // }
                    }
                },
                dataLabels: {
                    enabled: true,
                  
                    offsetX: 10
                  },
                // grid: {
                //     show: false
                // }
            },   
            legend: {
                position: 'right',
                // width: 200
                // style:{
                //     maxWidth: 200
                // }
                // floating: true
            },
            grid: {
                show: false,
                borderColor: "#EF3252"
            },
            noData: {
                text: "No Data Available",
                align: 'center',
                verticalAlign: 'middle',
                offsetX: 0,
                offsetY: 0,
                style: {
                  fontSize: '14px',
                }
              }
        };
        const el = document.getElementById(this[element], options)
        const mainEl = document.createElement('div')

        if(el){
            el.replaceChildren()
            mainEl.style.maxWidth = self.MAX_PIE_DOUGHNUT_CHART_WIDTH + 'px'
            el.appendChild(mainEl)
        }

        var chart = new ApexCharts(mainEl, options);

        return { options, chart}
    }

    doughnutChart(){
        const { chart } = this.getPieDoughnutChartConfig({ 
                name: "doughnutChart",
                type: "donut",
                stateKey: "SUM_OF_CONTRACT_VALUE_BY_CONTRACT_NAME",
                internalStateKey: "SELECTED_INDEX_OF_SUM_OF_CONTRACT",
                element: "ELEMENT_OF_SUM_OF_CONTRACT_VALUE_BY_CONTRACT_NAME"
            })
        chart.render();
    }
    
    pieChart() {
        const { chart } = this.getPieDoughnutChartConfig({ 
            name: "pieChart",
            type: "pie",
            stateKey: "NUMBER_OF_CONTRACT_BASED_ON_JURISDICTION",
            internalStateKey: "NUMBER_OF_CONTRACT_BASED_ON_JURISDICTION",
            element: "ELEMENT_OF_NUMBER_OF_CONTRACT_BASED_ON_JURISDICTION"
        })

        chart.render();

    }

    barChart() {
        const self = this;

        var values = self.STATE.RENEWAL_DATE_BASED_ON_JURISDICTION.VALUES
        var labels = self.STATE.RENEWAL_DATE_BASED_ON_JURISDICTION.LABELS;
        ({ values, labels } = self.mergeSameData(values,labels));

        var options = {
            // series: [
            //     {
            //         data: [12,34,23]
            //     }
            // ],
            // labels: labels,
            series: [{
                data: values
            }],
            chart: {
                type: 'bar',
                fontFamily: "'Roboto', sans-serif",
                height: 500,
                events: {
                    // click: function(event, chartContext, config) {
                    //     console.log('clicked')
                    //     // NUMBER_OF_RENEWAL_DATE_BASED_ON_JURISDICTION
                    // },
                    click: function(event, chartContext, config) {
                        self.setInternalState("barChart", {
                            NUMBER_OF_RENEWAL_DATE_BASED_ON_JURISDICTION: ((chartContext.pie?.w.globals?.selectedDataPoints ||[])[0] || null)
                        })                        
                    },
                },
                selection: {
                    enabled: true,
                    type: 'x',
                    fill: {
                        color: '#24292e',
                        opacity: 1
                    },
                }
            },
            title: {
                text: 'Renewal Date',
            },
            tooltip: {
                // enabled: false,
                custom: function({series, seriesIndex, dataPointIndex, w}) {
                    return self.customTooltip({
                        title: w.globals.labels[seriesIndex],
                        value: series[seriesIndex][dataPointIndex],
                        percentage: ((series[seriesIndex][dataPointIndex] / w.globals.seriesTotals[seriesIndex]) * 100 || 0).toFixed(2) + '%'
                    })
                }
                
            },
            xaxis:{
                categories: labels,
                axisBorder: {
                    show: false
                },
                crosshairs:{
                    show: false,
                    width: 10,
                    position: 'back',
                }
            },
            
            plotOptions:{
                // bar:{
                //     dataLabels:{
                //         enabled: true,
                //         formatter(){return 'h'},
                //     }
                // },
                 grid: {
                    show: false
                }
            },
            colors: "#0072f0",
            dataLabels:{
                enabled: false,
                // enabledOnSeries: 2,

            },
            noData: {
                text: "No Data Available",
                align: 'center',
                verticalAlign: 'middle',
                offsetX: 0,
                offsetY: 0,
                style: {
                  fontSize: '14px',
                }
            }
            // tooltip: {
            //     x: {
            //         formatter: function (val) {
            //             return 'hi'
            //         }
            //     }
            // },
        };

        const el = document.getElementById("bar-chart")
        if(el){
            el.innerHTML = ''
        }
        var chart = new ApexCharts(el, options);
        chart.render();
    }

    kpiDetailsSection() {
        const container = document.getElementById(this.ELEMENT_OF_KPI_METRIC)
        if(!container)return;
        
        // clear the previous childs
        container.innerHTML = ''

        const createSection = (section = {}) => {
            const main = document.createElement("div")
            const label = document.createElement("div")
            const value = document.createElement("div")

            label.classList.add('kpi-label')
            value.classList.add('kpi-label-value')

            label.innerHTML = section.label
            value.innerHTML = section.value

            main.append(label)
            main.append(value)

            container.append(main)
        }

        this.STATE.KPI_METRIC.forEach(createSection)

    }

    departmentNameDropDown(){
        const self = this
        CustomDropDown({
            element: "#"+this.ELEMENT_OF_DEPARTMENT_NAME_DROPDOWN,
            label: "Department Name",
            options: this.STATE.DEPARTMENT_NAME_LIST,
            onApply(selectedList=[]){
                self.internal_onFilter({
                    name: "departmentNameDropDown",
                    filterData: selectedList
                })
            }
        })
        
    }

    categoryDropDown(){
        const self = this
       
        CustomDropDown({
            element: "#"+this.ELEMENT_OF_CATEGORY_DROPDOWN,
            label: "Category",
            options: this.STATE.CATEGORY_LIST,
            onApply(selectedList=[]){
                self.internal_onFilter({
                    name: "categoryDropDown",
                    filterData: selectedList
                })
            }
        })
        
    }

    renderAll(exceptMethod=false, ...methodArg){
        for(let funcName of this.methodList){
            if(!exceptMethod || (exceptMethod && exceptMethod!==funcName)){
                this[funcName](...methodArg)
            }
        }
    }

    internal_onFilter(config={}){
        // config = { name: "", filterData }
        const self = this
       
        if(typeof self.onFilter === "function"){
            self.onFilter(config, (data, cb=()=>{self.renderAll(config.name)})=>{
                self.setState(data, cb)
            }, self)
        }
    }

}



export function main() {



    function handleOnFilter(filteredConfig, setState = _ => null, self) {
        console.log("filteredConfig = ", filteredConfig)
        // call the api for getting the data based on filteredConfig

        const KPI_METRIC = createKPIMetric()
        const ContractName = createSumOfContractValueByContractName()
        const NumberOfContractJurisdiction = createNumberOfContractBaseOnJurisdiction()
        const RenewalDateBaseOnJurisdiction = createRenewalDateBaseOnJurisdiction()
        // console.log("data ContractName = ", ContractName)
        // console.log("NumberOfContractJurisdiction = ", NumberOfContractJurisdiction)

        // update the state once api response will success
        setState({
            SUM_OF_CONTRACT_VALUE_BY_CONTRACT_NAME: { VALUES: ContractName.VALUES, LABELS: ContractName.LABELS },
            NUMBER_OF_CONTRACT_BASED_ON_JURISDICTION: { VALUES: NumberOfContractJurisdiction.VALUES, LABELS: NumberOfContractJurisdiction.LABELS },
            RENEWAL_DATE_BASED_ON_JURISDICTION: { VALUES: RenewalDateBaseOnJurisdiction.VALUES, LABELS: RenewalDateBaseOnJurisdiction.LABELS },
            KPI_METRIC: KPI_METRIC
        })

    }


    const ideepCharts = new IdeepenersCharts({
        // id of the elements
        ELEMENT_OF_KPI_METRIC: "kpimetric-section",
        ELEMENT_OF_DEPARTMENT_NAME_DROPDOWN: "filter-department-name",
        ELEMENT_OF_CATEGORY_DROPDOWN: "filter-category",
        ELEMENT_OF_NUMBER_OF_CONTRACT_BASED_ON_JURISDICTION: "pie-chart",
        ELEMENT_OF_SUM_OF_CONTRACT_VALUE_BY_CONTRACT_NAME: "doughnut",
        onFilter: handleOnFilter
    })

    // for setting up the init data use 
    // ideepCharts.setState({ ...your data })

    ideepCharts.renderAll()
}


// main()