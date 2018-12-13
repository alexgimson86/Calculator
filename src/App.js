import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import update from 'immutability-helper';
import math from 'mathjs';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {operations: []};
    this.handleClick = this.handleClick.bind(this);
    this.calculateOperations = this.calculateOperations.bind(this);
  }
  handleClick = e =>{
    var value = e.target.getAttribute('data-value')
      switch(value){
        case "clear": 
        this.setState({
           operations: []
        });
        break
        case "equal": 
          this.calculateOperations()
        break
        default:
        var newOp = this.state.operations.slice();
        newOp.push(value)
        this.setState({
          operations: newOp
        });
        break
      }
  }
  calculateOperations = () =>{
    let mathString = this.state.operations.join('')
    this.setState({
      operations : [math.eval(mathString)]  
    }) 
  }
  render() {
    return (
      <div className="App">
      <Display data={this.state.operations}/>
        <Buttons>
          <Button onClick={this.handleClick} label="C" value="clear" />
          <Button onClick={this.handleClick} label="7" value="7" />
          <Button onClick={this.handleClick} label="4" value="4" />
          <Button onClick={this.handleClick} label="1" value="1" />
          <Button onClick={this.handleClick} label="0" value="0" />

          <Button onClick={this.handleClick} label="/" value="/" />
          <Button onClick={this.handleClick} label="8" value="8" />
          <Button onClick={this.handleClick} label="5" value="5" />
          <Button onClick={this.handleClick} label="2" value="2" />
          <Button onClick={this.handleClick} label="." value="." />

          <Button onClick={this.handleClick} label="x" value="*" />
          <Button onClick={this.handleClick} label="9" value="9" />
          <Button onClick={this.handleClick} label="6" value="6" />
          <Button onClick={this.handleClick} label="3" value="3" />
          <Button onClick={this.handleClick} label="%" value="%"/>

          <Button onClick={this.handleClick} label="-" value="-" />
          <Button onClick={this.handleClick} label="+" size="2" value="+" />
          <Button onClick={this.handleClick} label="=" size="2" value="equal" />
        </Buttons>
      </div>
    );
  }
}
class Buttons extends Component{
  render(){
    return <div className="Buttons">{this.props.children}</div>
  }
}
class Button extends Component{
  render(){
    return(
    <div onClick={this.props.onClick}
         data-value = {this.props.value}
         data-size = {this.props.size}
         className="Button"
         >
          {this.props.label}
         </div>
    )
  }
}
class Display extends Component{
  render(){
    const question = this.props.data.join('')
    const answer = this.props.answer
    const prev = this.props.previousButton
    if(answer && prev === "equal")
      return <div className="Display" >{answer}</div>
    else
      return <div className="Display">{question}</div>
  }
}
  export default App;
  