import { chartImages } from "./utils"
import jsPDF from "jspdf";


export async function ExportPDF(){
  const fileName = "Department_wise_risk_based_contracts_Finance"

  const domURL: any = window.URL || window.webkitURL || window;

  const doc = new jsPDF({
    // orientation: 'landscape',
    unit: 'px',
    format: [360, 504],
    compress: false
  });

  var pageCreated = 0
  const setImage = async (svg: SVGAElement, title: string, index: Number) => {
    const mIndex = index
    return new Promise((resolve, reject) => {
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      const image = new Image();
      image.onload = () => {
        if (pageCreated) {
          doc.addPage()
        }
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.setAttribute('width', `${parseFloat(svg.getAttribute('width'))}`);
        canvas.setAttribute('height', `${parseFloat(svg.getAttribute('height'))}`);
        // canvas.getContext('2d').drawImage(image, 0, 0, 400, 250);
        canvas.getContext('2d').drawImage(image, 0, 0, 545, 350);

        const imgProps = doc.getImageProperties(canvas.toDataURL('image/png'));
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        if (title) {
          doc.setFontSize(18);
          // doc.setFillColor(135, 124, 45, 0);
          doc.text(title, 20, 30);
        }

        doc.addImage({
          imageData: canvas,
          format: "PNG",
          x: 5,
          y: 55,
          width: pdfWidth,
          height: pdfHeight
        });
        ++pageCreated
        resolve(i)
      }
      image.onerror = reject
      image.src = domURL.createObjectURL(new Blob([svg.outerHTML], { type: 'image/svg+xml' }));
    })
  }

  const chartDiv = document.querySelector(".app-charts")
  if(chartDiv){
    const length = chartDiv.children.length
    var i = 0

    const taskList = []

    while(length > i){
      const commonChart = chartDiv.children.item(i).querySelector(".common-chart")
      if(commonChart){
        const googleChartComponent = commonChart.querySelector(".chart-area google-chart")
        if(googleChartComponent){
          const chartType: chartImages.GoogleActiveChartType = googleChartComponent.getAttribute("ng-reflect-type") as chartImages.GoogleActiveChartType
          var chart;

          switch(chartType){
              case "Bar":
                chart = google.visualization.BarChart
                break;
              case "BarChart":
                chart = google.visualization.BarChart
                break;
              case "PieChart":
                chart = google.visualization.PieChart
                break;
          }

          if(chart){
            chart = new chart(googleChartComponent)
            const svg: any = chart.getContainer().getElementsByTagName('svg')[0]
            if(svg){
              taskList.push(()=>setImage(svg, commonChart.querySelector(".chart-title").textContent.trim(), i))
            }
          }
        }
      }else{
        const kpiComponent = chartDiv.children.item(i).querySelector(".kpi_container")
        if(kpiComponent){
          const title = kpiComponent.querySelector(".kpi_title").textContent.trim()
          const value = kpiComponent.querySelector(".kpi_data_container").textContent.trim()

          taskList.push(()=>{
            if(pageCreated){
              doc.addPage()
            }
            if (title) {
              doc.setFontSize(18);
              doc.text(title, 20, 30);

              doc.setFontSize(20);
              doc.text(value, 60, 70, { align: "center" });
              pageCreated++

            }
          })
        }
      }
      ++i
    }

    for await (const task of taskList){
      try{
        await task()
      }catch(e){console.log(e)}
    }

    setTimeout(()=>{
      doc.save( fileName + '.pdf');
    }, 600)

  }


}
