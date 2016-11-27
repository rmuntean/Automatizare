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
       setInterval(function(){
         axios.get("/api/private/temperature")
             .then(function (response) {
                let temperatureList=[];
                response.data.map(function(value){
                    temperatureList.push([new Date(value.date),parseInt(value.temperature)]);
                });
                store.dispatch(gotTemperature(temperatureList));
             })
             .catch(function (error) {
                // alert('fail-DidMount');
                 console.log('fail-DidMount');
                 console.log(error);
             });
       }, 10000);
     }
     componentWillUnmount() {
         this.unsubscribe();
     }
     render() {
         let temperature = store.getState().temperature;
         return (
             <div>
                <ExampleChart rows={temperature.temperatureList} />
             </div>
         );
     }
 }

export default Temperature;