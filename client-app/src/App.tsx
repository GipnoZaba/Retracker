import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    appTasks: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/apptasks')
      .then((response) => {
        console.log(response.data);
        this.setState({
          appTasks: response.data
        });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ol>
            {this.state.appTasks.map((appTask: any) => (
              <li>{appTask.title}</li>
            ))}
          </ol>
        </header>
      </div>
    );
  }
}

export default App;
