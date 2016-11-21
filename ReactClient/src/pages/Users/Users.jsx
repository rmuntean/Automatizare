import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import store from './../../redux/store';
import {gotUsers} from './../../redux/actions';
import axios from 'axios';

class Users extends React.Component {
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
        axios.get("/api/private/users")
            .then(function (response) {
                store.dispatch(gotUsers(response.data));
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
        let users = store.getState().users;
        let data = null;
        console.log(store.getState().user);
        if (users.userList && store.getState().user.isLoggedIn) {
            data = users.userList.map(function(value){
                return (<li key={value._id} >{value.name}</li>);
            });
        }else {
                        data = (<div>Private page ---  Login first</div>);
        }

        return (
            <div>
                <ul>
                    {data}
                </ul>
            </div>
        );
    }
}

export default Users;