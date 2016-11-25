import React from 'react';
import {Chart} from 'react-google-charts';

class ExampleChart extends React.Component {
  constructor(props){
    super(props);
    this.chartEvents=[
      {
        eventName : 'select',
        callback  : function(Chart) {
            // Returns Chart so you can access props and  the ChartWrapper object from chart.wrapper
            console.log("Selected ",Chart.chart.getSelection());
        }
      }
    ];

    this.state={
      options: {
            title: 'Temperature senzor',
          hAxis: {title: 'Time/Date'},
          vAxis: {title: 'Temperature C '},
//          hAxis: {title: 'Time/Date', minValue: 0, maxValue: 15},
//          vAxis: {title: 'Temperature C ', minValue: 0, maxValue: 15},
          legend: 'none'
      },
      rows: [
            [ 8,      12],
               [ 8,      12],
                  [ 4,      5.5],
            [ 11,     14],
            [ 4,      5],
            [ 3,      3.5],
            [ 6.5,    7]
      ],
      columns: [
        {
            'type': 'number',
            'label' : 'Time'
        },
        {
            'type' : 'number',
            'label' : 'Temperature'
        }
      ]
    }
  }
  render() {
 // console.log(this.state.rows);
    return (
      <Chart
        chartType="LineChart"
        rows={this.state.rows}
        columns={this.state.columns}
        options={this.state.options}
        graph_id="LineChart"
        width="100%"
        height="400px"
        chartEvents={this.chartEvents}
       />
    );
  }
};
export default ExampleChart;