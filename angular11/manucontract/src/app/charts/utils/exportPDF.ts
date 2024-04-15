import { ChartColors, chartImages, chartTypesMap} from "./utils"
import jsPDF from "jspdf";



export async function ExportPDF(){
  const fileName = "Department_wise_risk_based_contracts_Finance"

  const domURL: any = window.URL || window.webkitURL || window;

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [360, 504],
    compress: false,
    hotfixes: ["px_scaling"]

  });

  doc.addFont('assets/charts/fonts/Montserrat-Medium.ttf', 'Montserrat', 'normal');
  doc.setFont('Montserrat');


  var pageCreated = 0
  const setImage = async (svg: SVGAElement, title: string) => {
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
        // canvas.getContext('2d').drawImage(image, 0, 0, 545, 350);
        // canvas.getContext('2d').drawImage(image, 0, 0, 545, 550);
        // canvas.getContext('2d').drawImage(image, 0, 0, 500, 350);
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width-20, canvas.height);

        const imgProps = doc.getImageProperties(canvas.toDataURL('image/png'));
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        if (title) {
          doc.setFontSize(17);
          // doc.setFillColor(135, 124, 45, 0);
          doc.text(title, 25, 55);
        }

        doc.addImage({
          imageData: canvas,
          format: "PNG",
          x: 5,
          y: 90,
          width: pdfWidth,
          height: pdfHeight
        });
        ++pageCreated
        resolve(i)
      }
      image.onerror = reject
      // image.src = chart.getImageURI()
      image.src = domURL.createObjectURL(new Blob([svg.outerHTML], { type: 'image/svg+xml' }));
    })
  }

  const chartDiv = document.querySelector(".app-charts")
  if(chartDiv){
    const length = chartDiv.children.length
    var i = 0

    const taskList = []

    while(length > i){
      const commonChart = (chartDiv.children.item(i).shadowRoot ? chartDiv.children.item(i).shadowRoot : chartDiv.children.item(i)).querySelector(".common-chart")
      if(commonChart){
        const chartArea = (commonChart.shadowRoot ? commonChart.shadowRoot : commonChart).querySelector(".chart-area")
        if(!commonChart)continue;

        const googleChartComponent = chartArea.querySelector("google-chart")

        if(googleChartComponent){
          const chartType: chartImages.GoogleActiveChartType = googleChartComponent.getAttribute("ng-reflect-type") as chartImages.GoogleActiveChartType
          var chart: any;

          switch(chartType){
              case "ColumnChart":
                chart = google.visualization.ColumnChart
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
              taskList.push(()=>setImage(
                svg,
                commonChart.querySelector(".chart-title").textContent.trim()
              ))
            }
          }
        }
      }else{
        const kpiComponent = (chartDiv.children.item(i).shadowRoot ? chartDiv.children.item(i).shadowRoot : chartDiv.children.item(i)) //.querySelector(".kpi_container")
        if(kpiComponent){
          const title = kpiComponent.querySelector(".kpi_title").textContent.trim()
          const value = kpiComponent.querySelector(".kpi_data_container").textContent.trim()

          taskList.push(()=>{
            if(pageCreated){
              doc.addPage()
            }
            if (title) {
              doc.setFontSize(18);
              doc.text(title, 30, 65);

              doc.setFontSize(20);
              doc.text(value, 150, 115, { align: "center" });
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



export async function ExportPDF2(ChartTypesMap: Array<chartTypesMap.TypeChart | chartTypesMap.TypeKPI>){
  const fileName = "Department_wise_risk_based_contracts_Finance"

  const domURL: any = window.URL || window.webkitURL || window;

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    // format: [360, 504],
    // format: [360, 400],
    compress: false,
    hotfixes: ["px_scaling"]
  });


  const firstChart = ChartTypesMap[0]

  if(firstChart.type === "CHART"){
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Date');
    data.addColumn('number', 'Renewal contracts');

    data.addRows(firstChart.data)


    var options: google.visualization.ColumnChartOptions = {
      // title: 'Renewal contracts in 30 days',
      // legend: {
      //   po
      // },
      colors: ChartColors,
      // width: 1050,
      height: 800,
      hAxis: {
        // title: "Date"
      },
      vAxis: {
        // title: "Renewal contracts",
        // ticks: [0, 1000, 2000, 4000, 6000]
      },
      chartArea: {
        top: "5%",
        // left: "5%",
      },
      fontName:'Montserrat',
      // legend: "none",
      // displayLegendValues: false
      legend: {
        position: "none"
      },



    };


    const test = document.getElementById('_bar_chart')
    // test.style.display = "none"
    var barchart = new google.visualization.ColumnChart(test);

    var wrapper = new google.visualization.ChartWrapper({
      chartType: 'ColumnChart',
      dataTable: data,
      options: options,
      containerId: '_bar_chart'
    });

    // setTimeout(()=>{
    //   // var imgUri = barchart.getImageURI();
    //   // console.log("ready google chart", imgUri)

    // },3000)

    google.visualization.events.addListener(barchart, 'ready', function () {
      var imgUri = barchart.getImageURI();
      console.log("ready google chart")
      // do something with the image URI, like:
      const imgProps = doc.getImageProperties(imgUri);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage({
        imageData: imgUri,
        format: "PNG",
        x: 5,
        y: 5,
        width: pdfWidth,
        height: pdfHeight
      });
      doc.save( fileName + '.pdf');

    });

    // barchart.draw(data, options);
    wrapper.draw();


  }





  // var pageCreated = 0
  // const setImage = async (chart: any, svg: SVGAElement, title: string) => {
  //   return new Promise((resolve, reject) => {
  //     svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  //     const image = new Image();
  //     image.onload = () => {
  //       if (pageCreated) {
  //         doc.addPage()
  //       }
  //       const canvas: HTMLCanvasElement = document.createElement('canvas');
  //       canvas.setAttribute('width', `${parseFloat(svg.getAttribute('width'))}`);
  //       canvas.setAttribute('height', `${parseFloat(svg.getAttribute('height'))}`);
  //       // canvas.getContext('2d').drawImage(image, 0, 0, 400, 250);
  //       // canvas.getContext('2d').drawImage(image, 0, 0, 545, 350);
  //       // canvas.getContext('2d').drawImage(image, 0, 0, 545, 550);
  //       // canvas.getContext('2d').drawImage(image, 0, 0, 500, 350);
  //       canvas.getContext('2d').drawImage(image, 0, 0, canvas.width-8, canvas.height);

  //       const imgProps = doc.getImageProperties(canvas.toDataURL('image/png'));
  //       const pdfWidth = doc.internal.pageSize.getWidth();
  //       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  //       if (title) {
  //         doc.setFontSize(18);
  //         // doc.setFillColor(135, 124, 45, 0);
  //         doc.text(title, 20, 30);
  //       }

  //       doc.addImage({
  //         imageData: canvas,
  //         format: "PNG",
  //         x: 5,
  //         y: 55,
  //         width: pdfWidth,
  //         height: pdfHeight
  //       });
  //       ++pageCreated
  //       resolve(i)
  //     }
  //     image.onerror = reject
  //     // image.src = chart.getImageURI()
  //     image.src = domURL.createObjectURL(new Blob([svg.outerHTML], { type: 'image/svg+xml' }));
  //   })
  // }

  // const chartDiv = document.querySelector(".app-charts")
  // if(chartDiv){
  //   const length = chartDiv.children.length
  //   var i = 0

  //   const taskList = []

  //   while(length > i){
  //     const commonChart = chartDiv.children.item(i).querySelector(".common-chart")
  //     if(commonChart){
  //       const googleChartComponent = commonChart.querySelector(".chart-area google-chart")
  //       if(googleChartComponent){
  //         const chartType: chartImages.GoogleActiveChartType = googleChartComponent.getAttribute("ng-reflect-type") as chartImages.GoogleActiveChartType
  //         var chart: any;

  //         switch(chartType){
  //             case "Bar":
  //               chart = google.visualization.BarChart
  //               break;
  //             case "BarChart":
  //               chart = google.visualization.BarChart
  //               break;
  //             case "PieChart":
  //               chart = google.visualization.PieChart
  //               break;
  //         }

  //         if(chart){
  //           chart = new chart(googleChartComponent)
  //           const svg: any = chart.getContainer().getElementsByTagName('svg')[0]
  //           if(svg){
  //             taskList.push(()=>setImage(chart, svg, commonChart.querySelector(".chart-title").textContent.trim()))
  //           }
  //         }
  //       }
  //     }else{
  //       const kpiComponent = chartDiv.children.item(i).querySelector(".kpi_container")
  //       if(kpiComponent){
  //         const title = kpiComponent.querySelector(".kpi_title").textContent.trim()
  //         const value = kpiComponent.querySelector(".kpi_data_container").textContent.trim()

  //         taskList.push(()=>{
  //           if(pageCreated){
  //             doc.addPage()
  //           }
  //           if (title) {
  //             doc.setFontSize(18);
  //             doc.text(title, 20, 30);

  //             doc.setFontSize(20);
  //             doc.text(value, 60, 70, { align: "center" });
  //             pageCreated++

  //           }
  //         })
  //       }
  //     }
  //     ++i
  //   }

  //   for await (const task of taskList){
  //     try{
  //       await task()
  //     }catch(e){console.log(e)}
  //   }

  //   setTimeout(()=>{
  //     doc.save( fileName + '.pdf');
  //   }, 600)

  // }


}
