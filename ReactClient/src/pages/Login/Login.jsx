import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import store from './../../redux/store';
import {logIn} from './../../redux/actions';
import axios from 'axios';
import {browserHistory} from 'react-router';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <div>
                <TextField
                    ref="username"
                    hintText="user@example.com"
                    floatingLabelText="Enter user here"
                /><br />
                <TextField
                    ref="password"
                    hintText="Password Field"
                    floatingLabelText="Password"
                    type="password"
                /><br />
                <RaisedButton primary={true} onClick={ this._onClickHandler.bind(this) } >Login</RaisedButton>
            </div>
        );
    }

    _onClickHandler() {
        axios.get("/api/login", {
                params: {
                    username: this.refs.username.getValue(),
                    password: this.refs.password.getValue()
                }
            })
            .then(function (response) {
                return axios.get("/api/private/profile");
            })
            .then(function (response) {
                store.dispatch(logIn(response.data.name));
//                browserHistory.push('/');
//                location.replace('/');
//                    history.pushState('/');
            })
            .catch(function (error) {
                alert('fail');
                console.log(error);
            });
    }
}

export default Login;