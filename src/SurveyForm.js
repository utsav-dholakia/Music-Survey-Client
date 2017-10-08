import React, { Component } from 'react';
import './css/SurveyForm.css';

class SurveyForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            firstName:    '',
            lastName:     '',
            age:          '',
            artistValue:  '',
            regionValue:  '',
            defaultRegionValues: ['Africa', 'Antarctica', 'Asia', 'Europe', 'North Amedica', 'South America'],
            defaultArtistValues: ['Adele','Beyoncé', 'Celine Dion', 'Elton John', 'Elvis Presley', 'Eminem', 'Madonna',
                'Michael Jackson', 'Pink Floyd', 'The Beatles'],
            displayMessage: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.generateRegionOptions = this.generateRegionOptions.bind(this);
        this.generateArtistOptions = this.generateArtistOptions.bind(this);
    }

    generateRegionOptions(){
        let options = [];
        for(var i = 0; i < this.state.defaultRegionValues.length; i++){
            options.push(<option key={this.state.defaultRegionValues[i]}
                                 value={this.state.defaultRegionValues[i]}>{this.state.defaultRegionValues[i]}</option>);
        }
        return options;
    }

    generateArtistOptions(){
        let options = [];
        for(var i = 0; i < this.state.defaultArtistValues.length; i++){
            options.push(<option key={this.state.defaultArtistValues[i]}
                                 value={this.state.defaultArtistValues[i]}>{this.state.defaultArtistValues[i]}</option>);
        }
        return options;
    }

    handleSubmit(event){

        fetch('http://localhost:5555/sendSurveyData',{
            method: 'POST',
            headers:    {
                'Content-Type': 'application/json'
            },
            body:   JSON.stringify({
                firstName :   this.firstName.value,
                lastName  :   this.lastName.value,
                age       :   this.age.value,
                region    :   this.regionValue.value,
                artist    :   this.artistValue.value
            })
        }).then(function(response) {
            if (response.status >= 200 && response.status < 300) {
                return response
            } else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function(response){
            this.setState({displayMessage: 'Your survey result has been submitted successfully!'});
        }.bind(this)).catch(function(error) {
            this.setState({displayMessage:  'Failed to post survey data. Try again!'});
            console.log('There has been a problem with your fetch operation: ' + error.message);
        }.bind(this));

        event.preventDefault();
    }

    render() {
        return (
            <div className="App container-fluid">
                <header className="header row">
                    <h1 className="App-title">Welcome to Music Survey</h1>
                </header>
                {this.state.displayMessage.length === 0 &&
                    <div className="Survey-form row">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <input className="input" type="text" placeholder="First Name"
                                       ref={(input) => {this.firstName = input}}/>
                            </div>
                            <div className="row">
                                <input className="input" type="text" placeholder="Last Name"
                                       ref={(input) => {this.lastName = input}}/>
                            </div>
                            <div className="row">
                                <input className="input" type="number" placeholder="Age"
                                       ref={(input) => {this.age = input}}/>
                            </div>
                            <div className="row">
                                <label htmlFor="Region" className="text">Region:</label>
                                <select className="select"
                                        defaultValue={this.state.defaultRegionValues[0]}
                                        ref={(input) => {this.regionValue = input}}>
                                    {this.generateRegionOptions()}
                                </select>
                            </div>
                            <div className="row">
                                <label htmlFor="Favourite Artist" className="text">Favourite artist:</label>
                                <select className="select"
                                        defaultValue={this.state.defaultArtistValues[0]}
                                        ref={(input) => {this.artistValue = input}}>
                                    {this.generateArtistOptions()}
                                </select>
                            </div>
                            <div className="row">
                                <button className="submit" type="Submit">Submit</button>
                                <button className="submit col-md-offset-2" onClick={this.props.gotoLoginPage}>Admin Login</button>
                            </div>
                        </form>
                    </div>
                }
                {this.state.displayMessage.length !== 0 &&
                    <div>
                        <div className="row">
                            <p className="App-title">{this.state.displayMessage}</p>
                        </div>
                        <div className="row">
                            <button className="submit" onClick={() => {this.setState({displayMessage: ''})}}>Go Back</button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default SurveyForm;
