import ExcelJS from "exceljs"
import { chartTypesMap } from './utils';
import moment from "moment"


export async function ExportXLSX(chartData: Array<chartTypesMap.TypeChart | chartTypesMap.TypeKPI>){
  const heading = "Department-wise risk based contracts - Finance"
  const commentChartName = ["renewalContracts", "expiringContracts"]
  const dateTypeChartName = ["renewalContracts", "expiringContracts"]
  // const percentageValueChartName = ["riskWise", "jurisdictionWise", "typeOfSubCategory"]
  const percentageValueChartName: any[] = []

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');

  worksheet.columns = [{ key: "sno", style: { font: { bold: true } } }, {
      key: 'type',
      header: heading,
      width: 50,
      style: {
        font: {
          size: 12,
          bold: false,
          family: 2
        }
      }
  }, { key: "value", style: { font: { size: 12 }} }, { key: "comment", style: { font: { size: 12 }} }];
  worksheet.getRow(1).getCell(2).style = {
    alignment: {
      vertical: "bottom",
      horizontal: "center"
    },
    font: {
      size: 14,
      bold: true
    },
  }
  worksheet.mergeCells('B1:C1');

  // add data
  var index = 0
  chartData.forEach((chart)=>{
    if(!chart.isVisible)return;
    worksheet.addRow({}) // empty row
    if(chart.type === "CHART"){
      worksheet.addRow({
        sno: index + 1,
        type: chart.title
      }).getCell(2).style={
        font: {
          size: 12,
          bold: true
        },
      }
      const isPercentageChart = percentageValueChartName.includes(chart.name)
      var _percentage: Number[] = []
      if(isPercentageChart){
        let total = 0
        for(let d of chart.data){
          total += Number(d[1])
        }
        _percentage = chart.data.map((d)=>{
          return Number(d[1]) * 100 / total
        })
      }
      chart.data.forEach(([type, value], i)=>{
        const r = worksheet.addRow({
          type,
          value,
          ... commentChartName.includes(chart.name) && {
            comment: "Number of Contracts"
          },
          ... dateTypeChartName.includes(chart.name) && {
            type: moment(String(type)).format("DD-MMM")
          },
          ... isPercentageChart && {
            value: _percentage[i].toFixed(2) + "%"
          }
        })

      })
    }else if(chart.type === "KPI"){
      worksheet.addRow({
        sno: index + 1,
        type: chart.title,
        value: chart.data
      }).getCell(2).style={
        font: {
          size: 12,
          bold: true
        },
      }
    }
    ++index
  })

    const buffer = await workbook.xlsx.writeBuffer();
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const blob= new Blob([buffer], {type: fileType});
    const fileName = `${heading}_${Date.now()}`
    .replace(/\W+(?!$)/g, '_')
    .replace(/\W$/, '')
    .replace(/_$/, '')
    .toLowerCase();

    const a = document.createElement('a');
    a.style.display = "none"
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName+".xlsx";
    a.click();
    a.remove()

}
