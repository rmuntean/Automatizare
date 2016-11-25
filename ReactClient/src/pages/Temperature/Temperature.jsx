import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import store from './../../redux/store';
import {gotTemperature} from './../../redux/actions';
import axios from 'axios';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import ExampleChart from './Chart.jsx';

function getFormattedDate(date1) {
  var date = new Date(date1);
  var year = date.getFullYear();
  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  var hour = date.getHours().toString();
  hour = hour.length > 1 ? hour : '0' + hour;
  var minutes = date.getMinutes().toString();
  minutes = minutes.length > 1 ? minutes : '0' + minutes;
  var seconds = date.getSeconds().toString();
  seconds = seconds.length > 1 ? seconds : '0' + seconds;

  return hour + ':' + minutes + ':' + seconds + ' ' + month + '/' + day + '/' + year;
}

class Temperature extends React.Component {
    constructor(props) {
         super(props);
         this.state = store.getState();
     }

     componentWillMount() {
         this.unsubscribe = store.subscribe(() => {
             this.setState(store.getState());
         });
     }

     componentDidMount() {
         axios.get("/api/private/temperature")
             .then(function (response) {
                console.log("XXXXXXXXXXXX");
                console.log(response.data);
                 store.dispatch(gotTemperature(response.data));

             })
             .catch(function (error) {
                 alert('fail');
                 console.log(error);
             });
     }

     componentWillUnmount() {
         this.unsubscribe();
     }

     render() {
         let temperature = store.getState().temperature;
         let data = null;
         console.log(store.getState().temperature);
         if (temperature.temperatureList) {
             data = temperature.temperatureList.map(function(value){
                return (<TableRow key={value._id}>
                                 <TableRowColumn>{value.temperature}</TableRowColumn>
                                 <TableRowColumn>{getFormattedDate(value.date)}</TableRowColumn>
                             </TableRow>);
             });
             console.log(data);
             let rr=[];
             rr = temperature.temperatureList.map(function(value){
                    let xx=[];
                    xx.push([value.temperature,value.date]);
                  return xx;
             });

             console.log('BBBBBBBB');
             console.log(rr);
        }
         return (
             <div>
                <ExampleChart />
                <Table>
                    <TableHeader displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>Temperature</TableHeaderColumn>
                            <TableHeaderColumn>Date</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} >
                        {data}
                    </TableBody>
                </Table>

             </div>
         );
     }
 }

export default Temperature;