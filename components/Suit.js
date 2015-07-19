import React, { Component } from "react";
import CodeMirror from "./Codemirror";
import AutoFormater from "js-beautify";
import classNames from "classnames";

class Suit extends Component {

  state = {
    tests: [],
    stopped: true
  }

  constructor(props){
    super(props);

    this.props.tests.on("change", () =>{
      this.setState({
        tests: this.props.tests
      });
    });
  }

  handleOnStop(val){

    if(val === false){
      this.props.tests.each((t) =>{
        t.start()
      });
    }
    this.setState({
      stopped: val
    });


  }

  handleReset() {
    this.props.tests.each( t => t.reset() );
  }

  render(){
    let rows = [];

    rows = this.state.tests.map(r =>{
      return <Test test={r}/>
    });

    return (
    <div>
      <Nav stopped={ this.state.stopped } onReset={ this::this.handleReset } onToggle={this::this.handleOnStop}/>
      <div>{rows}</div>
    </div>
    );
  }
}

class Nav extends Component {
  state = {
    openTest: false
  }

  openTest(){
    this.setState({
      openTest: !this.state.openTest
    });
  }

  stopTests(){
    this.props.onToggle(true);
  }

  runTests(){
    this.props.onToggle(false);
  }

  resetTests() {
    this.props.onReset();
  }

  render(){
    return (
    <div>
      <div className="nav">
        {/*<button onClick={this::this.openTest}>Write Test</button>*/}
        { this.props.stopped ? <button onClick={ this::this.runTests }>Run</button> :
        <button onClick={ this::this.stopTests }>Stop</button> }
        <button onClick={ this::this.resetTests }>Reset</button>
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

  updateCode(newCode){
    this.setState({
      code: AutoFormater(newCode)
    });
  }

  autoFormat(){
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
  onClick(e){
    this.props.test.set("deactivated", !this.props.test.get("deactivated"));
  }

  render(){
    return (
    <div onClick={this::this.onClick} className={ classNames("test-suit", {deactivated: this.props.test.attributes.deactivated} )}>
      <p>Description:
        <b>{this.props.test.attributes.desc}</b>
        <br />
        Result:
        <span className="color-green">true = {this.props.test.attributes.result.T}(
          <b>{this.props.test.percentage(this.props.test.attributes.result.T)}%</b>
        ) </span>
        |
        <span className="color-red"> false = {this.props.test.attributes.result.F}(
          <b>{this.props.test.percentage(this.props.test.attributes.result.F)}%</b>
        )</span>
      </p>
    </div>
    );
  }
}

export default Suit;