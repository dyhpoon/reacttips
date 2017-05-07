import Perf from 'react-addons-perf'
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListItem from './ListItem'

function arrayGenerator(length) {
  return Array.apply(null, { length: length }).map(Number.call, Number)
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      multiplier: 1
    }
  }
  
  resetMultiplier() {
    Perf.start()
    this.setState({ multiplier: 2 })
  }

  componentDidUpdate() {
    Perf.stop()
    Perf.printInclusive()
    Perf.printWasted()
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.resetMultiplier.bind(this)}>Click Me</button>
        <ul>
          {
            arrayGenerator(5000).map(i => {
              return <ListItem key={i} text={i}/>
            })
          }
          {
            arrayGenerator(5000).map(i => {
              return <ListItem key={i} text={i + this.state.multiplier}/>
            })
          }
        </ul>
      </div>
    );
  }
}


export default App;
