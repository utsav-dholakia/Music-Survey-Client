import React, { Component } from 'react';
import './css/App.css'
import './css/AdminLogin.css';
import AdminInterface from "./AdminInterface.js";

class AdminLogin extends Component {

    constructor(props){
        super(props);
        this.state = {
            loggedIn:  false,

        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(event){

        fetch('http://localhost:5555/authorizeLogin',{
            method: 'POST',
            headers:    {
                'Content-Type': 'application/json'
            },
            body:   JSON.stringify({
                userName: this.userName.value,
                password: this.password.value
            })
        }).then(function(response) {
            if (response.status >= 200 && response.status < 300) {
                return response
            } else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function(){
            this.setState({loggedIn: true});
        }.bind(this)).catch(function(error) {
            this.setState({displayLoader: false});
            console.log('There has been a problem with your fetch operation: ' + error.message);
        }.bind(this));

        event.preventDefault();
    }

    signOut(){
        this.setState({loggedIn:   false});
    }

    render() {
        if(!this.state.loggedIn) {
            return (
                <div className="App container-fluid">
                    <header className="header row">
                        <h1 className="App-title">Welcome to Admin Login</h1>
                    </header>
                    <div className="Login-form row">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <input className="input" type="text" placeholder="Username"
                                       ref={(input) => {
                                           this.userName = input
                                       }}/>
                            </div>
                            <div className="row">
                                <input className="input" type="password" placeholder="Password"
                                       ref={(input) => {
                                           this.password = input
                                       }}/>
                            </div>
                            <div className="row">
                                <button className="submit" type="Submit">Submit</button>
                            </div>
                            <div className="row">
                                <button className="submit" onClick={this.props.gotoHomePage}>Go to Homepage</button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
        else{
            return(<AdminInterface signOut={this.signOut.bind(this)}/>);
        }
    }
}

export default AdminLogin;
