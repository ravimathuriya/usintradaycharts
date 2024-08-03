import React from 'react';
import ReactApexChart from "react-apexcharts";


function Candlechart(props) {

  const dayjs = require('dayjs')

    const data = {
          
        series: [{
          name:"candle",
          data: props.stock
        }],
        options: {
          chart: {
            height: 350,
            type: 'candlestick',
          },
          title: {
            text: '',
            align: 'left'
          },
          annotations: {
            xaxis: [
              {
                x: 'Oct 06 14:00',
                borderColor: '#00E396',
                label: {
                  borderColor: '#00E396',
                  style: {
                    fontSize: '12px',
                    color: '#fff',
                    background: '#00E396'
                  },
                  orientation: 'horizontal',
                  offsetY: 7,
                  text: 'Annotation Test'
                }
              }
            ]
          },
          tooltip: {
            enabled: true,
          },
          xaxis: {
            type: 'category',
            labels: {
              formatter: function(val) {
                return dayjs(val).format('MMM DD HH:mm')
                
              }
            }
          },
          yaxis: {
            tooltip: {
              enabled: true
            }
          }
        },
      
      
      };
    
// console.log(data.series)
 

  return (
    <>
      
          <div id="=chart">
            <ReactApexChart
              options={data.options}
              series={data.series}
              type="candlestick"
              width="1500"
              height="620"
            />
          </div>
    </>
  )

}

export default Candlechart
