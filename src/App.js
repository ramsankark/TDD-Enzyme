import React, {Component} from 'react';
import './App.css';

class App extends Component
{
  constructor(props){
    super(props);

    this.state = {
      counter: 0,
      error: false
    }
  }

  incrementValue() {
    this.setState({
      counter: this.state.counter + 1,
      error: false
    })
  }

  decrementValue() {
    this.setState({
      //counter: this.state.counter - 1
      counter: (this.state.counter>0) ? (this.state.counter - 1) : 0,
      error: ((this.state.counter - 1)>=0) ? false : true
    })
  }

  render(){
    return (
      <div className="App">
        <h2 data-test="counter-display">Counter value: {this.state.counter}</h2>
        {this.state.error && <h4 data-test="error-message">Count cannot be less than 0</h4>}
        <button data-test="increment-button" onClick={this.incrementValue.bind(this)}>Increment</button>
        <button data-test="decrement-button" onClick={this.decrementValue.bind(this)}>Decrement</button>
      </div>
    );
  }
}

export default App;
