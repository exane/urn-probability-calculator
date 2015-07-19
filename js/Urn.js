import React, { Component } from "react";
import Suit  from "../components/Suit";
import Backbone from "backbone";
import _ from "underscore";

let Tests = new Backbone.Collection();
Tests.comparator = "deactivated";


let UrnModel = Backbone.Model.extend({
  defaults: {
    "ordered": false,
    "putBack": false
  },
  initialize: function(options){
    this.set(options);
  },
  remove: function(index){
    return (this.get("content").splice(index, 1))[0];
  },
  getItem: function(index){
    return this.get("content")[index];
  },
  getRandom: function(){
    let rnd = (Math.random() * this.get("content").length) | 0;
    return this.get("putBack") ? this.getItem(rnd) : this.remove(rnd);
  }
});

let TestModel = Backbone.Model.extend({
  defaults: function() {
    let result = {T: 0, F: 0}
    return {
      cycles: 0,
      result: result,
      TIMES: 1,
      interval: null
    }
  },
  initialize: function(desc, cb, deactivated = false){
    let opt = _.extend({}, {
      desc: desc,
      cb: cb,
      deactivated: deactivated
    })
    this.set(opt);

    this.listenTo(this, "change:deactivated", this::this.start);

    this.start();
    //this.print();
  },
  start: function(){
    //this.set("interval", setInterval(this.test.bind(this), 0));
    if(this.get("deactivated")) return;
    window.requestAnimationFrame(this::this.test);
  },
  reset: function() {
    this.set(this.defaults());
  },
  test: function(){
    if(suit.state.stopped) {
      return clearInterval(this.get("interval"));
    }
    if(this.get("deactivated")) return;

    for(let i = 0; i < this.get("TIMES"); i++) {
      this.get("cb").call(this) ? this.get("result").T++ : this.get("result").F++;
      this.set("cycles", this.get("cycles") + 1);
    }
    window.requestAnimationFrame(this::this.test);
  },
  getRndInt: function(min, max){
    return Math.round(Math.random() * (max - min)) + min;
  },
  print: function(){
    //suit.add(this);
    //suit.render();
  },
  percentage: function(nr){
    if(!this.get("cycles")) return 0;
    return Math.round(10000 * nr / this.get("cycles")) / 100;
  }
});

let Urn = (function(options) {
  return new UrnModel(options);
})
let Test = (function(desc, cb) {
  let t = new TestModel(desc, cb);
  Tests.add(t)
  return t;
})

let xTest = (function(desc, cb) {
  let t = new TestModel(desc, cb, true);
  Tests.add(t)
  return t;
});

let suit = React.render(<Suit tests={Tests} />, document.querySelector(".content"));

export { Urn, Test, xTest };