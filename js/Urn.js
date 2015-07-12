import React, { Component } from "react";
import Suit  from "../components/Suit";

let suit = React.render(<Suit />, document.querySelector(".content"));

let Urn = (function(){
  let Urn = function(options){
    if(!(this instanceof Urn))
      return (new Urn(options));


    this._content = options.content;
    this._ordered = options.ordered || false;
    this._withReplacement = options.putBack || false;
  };
  let r = Urn.prototype;

  r._content = null;
  r._ordered = null;
  r._withReplacement = null;

  r.remove = function(index){
    return (this._content.splice(index, 1))[0];
  }

  r.get = function(index){
    return this._content[index];
  }

  r.getRandom = function(){
    let rnd = Math.random() * this._content.length | 0;
    return this._withReplacement ? this.get(rnd) : this.remove(rnd);
  }

  return Urn;
})();

let Test = (function(){
  let Test = function(desc, cb){
    if(!(this instanceof Test))
      return (new Test(desc, cb));

    this._result = {
      T: 0,
      F: 0
    }
    this._desc = desc;
    setTimeout(this._test.bind(this, cb), 0);
    this.print();
  };
  let r = Test.prototype;

  Test.TIMES = 10000;

  r._result = null;
  r._desc = null;

  r._test = function(cb){
    for(let i = 0; i < Test.TIMES; i++) {
      cb.call(this) ? this._result.T++ : this._result.F++;
    }
    //this.print();
    React.render(<Suit />, document.querySelector(".content"));
  }

  r.getRndInt = function(min, max){
    return Math.round(Math.random() * (max - min)) + min;
  }

  r.print = function(){
    /*console.log("%c%s:\n\tLast Result: true = %d(%f%) | false = %d(%f%)", "color: green; font-size: 14px",
    this._desc, this._result.T, this._percentage(this._result.T), this._result.F, this._percentage(this._result.F));*/
    //React.render(<Suit add={this}/>, document.querySelector(".content"));
    suit.add(this);
  }

  r._percentage = function(nr){
    return Math.round(10000 * nr / Test.TIMES) / 100;
  }
  return Test;
})();


/*
module.exports.Urn = Urn;
module.exports.Test = Test;*/

export { Urn, Test };