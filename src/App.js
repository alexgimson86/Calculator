import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import update from 'immutability-helper';
const math = require('mathjs')

class App extends Component {
  constructor(props){
    super(props);
    this.state = {operations: [], answer: null, previousButton: null };
    this.handleClick = this.handleClick.bind(this);
    this.calculateOperations = this.calculateOperations.bind(this);
  }
  handleClick = e =>{
    var value = e.target.getAttribute('data-value')
    var valArr = []

    
    var keypress = 1
    if(this.state.answer !== null && value !== 'clear'){
      keypress = 2
      if(value !== '-' && value !== '+' && value !== '*' && value !== '/')
        valArr.push('clear')
      else{
        keypress = 3
        valArr.push('clear')
        valArr.push(this.state.answer)
      }
    }
    valArr.push(value);
    for(let i = 0; i < keypress;i++){
      switch(valArr[i]){
        case 'clear': 
        this.setState((state)=>{
          return { operations: [],answer: null, previousButton: valArr[i]}
        });
        break
        case 'equal': 
        this.setState({
          previousButton: valArr[i]
        });
        this.calculateOperations()
        break
        default:
        var newOp = this.state.operations.slice();
        newOp.push(valArr[i])
        this.setState({
          operations: newOp,
          previousButton: valArr[i]
        });
       
        break
      }
  }
  }
  calculateOperations = () =>{
    let mathString = this.state.operations.join('')
    this.setState((state)=>{
      return {answer : math.eval(mathString)}   
    }) 
  }
  render() {
    return (
      <div className="App">
      <Display data={this.state.operations} previousButton={this.state.previousButton} answer={this.state.answer} />
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
          <Button label="" value="null" />

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
  