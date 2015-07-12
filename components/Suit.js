import React, { Component } from "react";
import CodeMirror from "./Codemirror";
import AutoFormater from "js-beautify";

class Suit extends Component {

  state = {
    tests: []
  }

  constructor(props){
    super(props);
  }

  add(test){
    this.setState({
      tests: this.state.tests.concat([test])
    });
  }

  render(){
    let rows = [];

    rows = this.state.tests.map(r =>{
      return <Test test={r}/>
    });

    return (
    <div>
      <Nav />
      <div>{rows}</div>
    </div>
    );
  }
}

class Nav extends Component {
  state = {
    openTest: true
  }

  openTest(){
    this.setState({
      openTest: !this.state.openTest
    });
  }

  render(){
    return (
    <div>
      <div className="nav">
        <button onClick={this.openTest.bind(this)}>Write Test</button>
      </div>
    { this.state.openTest ? <WriteTest /> : "" }
    </div>
    );
  }
}

class WriteTest extends Component {
  state = {
    code: "let dice = Urn({content: [1, 2, 3, 4, 5, 6],putBack: true});let d1 = dice.getRandom();let d2 = dice.getRandom();return d1 != d2;"
  }
  updateCode(newCode) {
    this.setState({
      code: AutoFormater(newCode)
    });
  }

  autoFormat() {
  }

  render(){
    let options = {
      lineNumbers: true,
      lineWrapping: true,
      mode: {
        name: "javascript",
        json: true
      }
    };
    return (
    <div>
      <CodeMirror value={this.state.code} onChange={this.updateCode} options={options}/>
    </div>
    )
  }
}

class Test extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
    <div className="test-suit">
      <p>Description:
        <b>{this.props.test._desc}</b>
        <br />
      Result:
        <span className="color-green">true = {this.props.test._result.T}(
          <b>{this.props.test._percentage(this.props.test._result.T)}%</b>
        ) </span>
      |
        <span className="color-red"> false = {this.props.test._result.F}(
          <b>{this.props.test._percentage(this.props.test._result.F)}%</b>
        )</span>
      </p>
    </div>
    );
  }
}

export default Suit;