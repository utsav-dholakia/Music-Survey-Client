import React, { Component } from 'react';
import './css/AdminInterface.css'

class AdminInterface extends Component{
    constructor(props){
        super(props);
        this.state = {
            displayLoader:  true,
            response:   ''
        }
    }

    componentDidMount(){


        fetch('http://localhost:5555/getAdminData',{
            method: 'GET',
            headers:    {
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            if (response.status >= 200 && response.status < 300) {
                return response
            } else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function(response){
           return response.json();
        }).then(function(response){
            this.setState({response:    response});
            this.setState({displayLoader: false});
        }.bind(this)).catch(function(error) {
            this.setState({displayLoader: false});
            console.log('There has been a problem with your fetch operation: ' + error.message);
        }.bind(this));
    }

    render(){
        if(!this.state.displayLoader){
            return(
                <div className="App container-fluid">
                    <header className="header row">
                        <h1 className="App-title">Welcome Admin</h1>
                    </header>
                    <div className="Login-form row">
                        <h3>Survey Results</h3>
                        <div className="row">
                            <p className="Information">Number of surveys submitted: {this.state.response.response.surveyCount}</p>
                        </div>
                        <div className="row">
                            <p className="Information">Average age of users who submitted survey:
                                {parseInt(this.state.response.response.averageAge, 10)}</p>
                        </div>
                        <div className="row">
                            <p className="Information">Most popular artist: {this.state.response.response.mostPopularArtist}</p>
                        </div>
                        <div className="row">
                            <p className="Information">Least popular artist: {this.state.response.response.leastPopularArtist}</p>
                        </div>
                        <div className="row">
                            <p className="Information">Most frequent region: {this.state.response.response.frequentRegion}</p>
                        </div>
                        <div className="row">
                            <button className="submit" onClick={this.props.signOut}>Sign Out</button>
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return (<div className="loader"/>);
        }
    }
}

export default AdminInterface;
