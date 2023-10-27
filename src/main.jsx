import React from 'react'
import ReactDOM from 'react-dom/client'
import ReactApexChart from 'react-apexcharts'
import lessons from './lessons.json'
import completed from './completed.json'

const lessonCounts = lessons.map((utc, k) => {
  const x = new Date(utc).getTime()
  return {
    x,
    y: k + 1,
  }
})

const completedCounts = completed
  .filter((lesson) => lesson.complete)
  .map((lesson) => lesson.completedAt)
  .map((timestamp) => new Date(timestamp).getTime())
  .sort()
  .map((x, k) => {
    return {
      x,
      y: k + 1,
    }
  })
// make sure the completed lessons line goes all the way to the end
// of the last lesson timestamp
completedCounts.push({
  x: lessonCounts.at(-1).x,
  y: completedCounts.at(-1).y,
})

class ApexChart extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      series: [
        {
          name: 'Total lessons',
          data: lessonCounts,
        },
        {
          name: 'Completed lessons',
          data: completedCounts,
        },
      ],
      options: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'stepline',
          width: 1,
        },
        title: {
          text: 'Course Completion',
          align: 'left',
        },
        markers: {
          hover: {
            sizeOffset: 4,
          },
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          type: 'datetime',
        },
        yaxis: {
          min: 0,
          max: lessonCounts.length * 1.1,
        },
      },
    }
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={350}
        />
      </div>
    )
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApexChart />
  </React.StrictMode>,
)
