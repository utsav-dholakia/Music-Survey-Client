import React, { Component } from 'react';
import './css/App.css';
import SurveyForm from './SurveyForm.js';
import AdminLogin from './AdminLogin.js';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            homePage: true,
        }
    }

    gotoLoginPage(){
        this.setState({homePage: false});
    }

    gotoHomePage(){
        this.setState({homePage: true});
    }

    render(){
        if(this.state.homePage){
            return (<SurveyForm gotoLoginPage={this.gotoLoginPage.bind(this)}/>);
        }
        else{
            return (<AdminLogin gotoHomePage={this.gotoHomePage.bind(this)}/>);
        }

    }
}

export default App;
