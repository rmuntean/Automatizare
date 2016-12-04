import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import store from './../../redux/store';
import {gotTemperature} from './../../redux/actions';
import {objectIdFromDate, dateFromObjectId, previewsday, previewsweek, previewsmonth, previewsyear} from './dateController';
import axios from 'axios';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import ExampleChart from './Chart.jsx';

class Temperature extends React.Component {
    constructor(props) {
        super(props);
        var filter = {
            gte: objectIdFromDate(previewsday(new Date())),
            lte: objectIdFromDate(new Date())
        }
            this.querytemperature(filter);
            this.state = store.getState();
    }
    querytemperature(filter){
        axios.get("/api/private/temperature",{
            params: {
                gte: filter.gte,
                lte: filter.lte
            }
        })
        .then(function (response) {
            let temperatureList=[];
            response.data.map(function(value){
                temperatureList.push([dateFromObjectId(value._id),value.temperature]);
            });
            store.dispatch(gotTemperature(temperatureList));
        })
        .catch(function (error) {
            console.log('fail-querytemperature');
            console.log(error);
        });
        this.state = store.getState();
    }
    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        });
    }
    componentDidMount() {
        this.timerID = setInterval(() => {
            var filter = {
                gte: objectIdFromDate(previewsday(new Date())),
                lte: objectIdFromDate(new Date())
            }
        this.querytemperature(filter)
        }, 10000);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
        this.unsubscribe();
    }
    render() {
        return (
            <div>
            <Table>
                <TableHeader displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>
                            <RaisedButton primary={true} onClick={ this._onClickHandler1day.bind(this) } >Current Day</RaisedButton>
                            <RaisedButton primary={true} onClick={ this._onClickHandler1week.bind(this) } >Last Week</RaisedButton>
                            <RaisedButton primary={true} onClick={ this._onClickHandler1month.bind(this) } >Last Month</RaisedButton>
                            <RaisedButton primary={true} onClick={ this._onClickHandler1year.bind(this) } >Last Year</RaisedButton>
                        </TableHeaderColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn>
                           <ExampleChart rows={this.state.temperature.temperatureList} />
                        </TableHeaderColumn>
                    </TableRow>
                </TableHeader>
            </Table>
            </div>
        );
    }
    _onClickHandler1day() {
        var filter = {
            gte: objectIdFromDate(previewsday(new Date())),
            lte: objectIdFromDate(new Date())
        }
            this.querytemperature(filter)
        clearInterval(this.timerID);
        this.componentDidMount()
    }

    _onClickHandler1week() {
        clearInterval(this.timerID);
        var filter = {
            gte: objectIdFromDate(previewsweek(new Date())),
            lte: objectIdFromDate(new Date())
        }
        this.querytemperature(filter)
    }
    _onClickHandler1month() {
        clearInterval(this.timerID);
        var filter = {
            gte: objectIdFromDate(previewsmonth(new Date())),
            lte: objectIdFromDate(new Date())
        }
        this.querytemperature(filter)
    }
    _onClickHandler1year() {
        clearInterval(this.timerID);
        var filter = {
            gte: objectIdFromDate(previewsyear(new Date())),
            lte: objectIdFromDate(new Date())
        }
        this.querytemperature(filter)
    }
 }

export default Temperature;