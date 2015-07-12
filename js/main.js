import { Urn, Test } from "./Urn.js";


(function main(){
  Test.TIMES = 30000;

  Test("11 bonbons (10 gelbe + 1 rote). chance 4x gelbe zu ziehen", function(){
    let urn = Urn({
      content: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      putBack: false
    });

    let c = 0;

    for(let i = 0; i < 4; i++) {
      let v = urn.getRandom();
      if(v === 1) c++;
    }

    return c === 4;
  })

  Test("11 bonbons (10 gelbe + 1 rote). chance rote zu ziehen", function(){
    let urn = Urn({
      content: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      putBack: false
    });

    let c = 0;

    for(let i = 0; i < 4; i++) {
      let v = urn.getRandom();
      if(v === 2) c++;
    }

    return c === 1;
  })

  Test("Urn: A < k AND B > k", function(){
    let urn = Urn({
      content: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    });
    let A = urn.getRandom();
    let B = urn.getRandom();
    let k = this.getRndInt(1, 10);
    return A < k && B > k;
  });

  Test("Dice: A == B", function(){
    let dice = Urn({
      content: [1, 2, 3, 4, 5, 6],
      putBack: true
    });
    let d1 = dice.getRandom();
    let d2 = dice.getRandom();

    return d1 == d2;
  })

  Test("Dice: A == B == C", function(){
    let dice = Urn({
      content: [1, 2, 3, 4, 5, 6],
      putBack: true
    });
    let d1 = dice.getRandom();
    let d2 = dice.getRandom();
    let d3 = dice.getRandom();
    return d1 == d2 && d1 == d3;
  })

  Test("Dice: A != B", function(){
    let dice = Urn({
      content: [1, 2, 3, 4, 5, 6],
      putBack: true
    });
    let d1 = dice.getRandom();
    let d2 = dice.getRandom();
    return d1 != d2;
  })

  Test("Dice: A == 5 AND B == 6", function(){
    let dice = Urn({
      content: [1, 2, 3, 4, 5, 6],
      putBack: true
    });
    let d1 = dice.getRandom();
    let d2 = dice.getRandom();
    return d1 == 5 && d2 == 6;
  })

  Test("Dice: A > 3 OR B > 3", function(){
    let dice = Urn({
      content: [1, 2, 3, 4, 5, 6],
      putBack: true
    });
    let d1 = dice.getRandom();
    let d2 = dice.getRandom();
    return d1 > 3 || d2 > 3;
  })

  Test("Dice: A > 3 OR B > 3 AND A != B", function(){
    let dice = Urn({
      content: [1, 2, 3, 4, 5, 6],
      putBack: true
    });
    let d1 = dice.getRandom();
    let d2 = dice.getRandom();
    return (d1 > 3 || d2 > 3) && d1 != d2;
  })

  Test("Glücksrad 1x rot bei 1 versuch", function(){
    let rad = Urn({
      content: ["rot", "grün", "blau", "weiss"],
      putBack: true
    });

    let v = "";

    v = rad.getRandom();
    return v === "rot";
  })


  Test("Glücksrad mindestens 1x rot bei 2 versuchen", function(){
    let rad = Urn({
      content: ["rot", "grün", "blau", "weiss"],
      putBack: true
    });

    let v = "";

    for(let i = 0; i < 2; i++) {
      v = rad.getRandom();
      if(v === "rot") return true;
    }
    v = rad.getRandom();
    return v === "rot";
  })

  Test("Glücksrad genau 1x rot bei 3 versuchen", function(){
    let rad = Urn({
      content: ["rot", "grün", "blau", "weiss"],
      putBack: true
    });

    let v = "";
    let c = 0;

    for(let i = 0; i < 3; i++) {
      v = rad.getRandom();
      if(v === "rot"){
        c++;
      }
    }

    return c === 1;
  })

  Test("Glücksrad mindestens 1x rot bei 3 versuchen", function(){
    let rad = Urn({
      content: ["rot", "grün", "blau", "weiss"],
      putBack: true
    });

    let v = "";

    for(let i = 0; i < 3; i++) {
      v = rad.getRandom();
      if(v === "rot") return true;
    }
    return false;
  })

  Test("Glücksrad 3x grün bei 3 versuchen", function(){
    let rad = Urn({
      content: ["rot", "grün", "blau", "weiss"],
      putBack: true
    });

    let v = "";

    for(let i = 0; i < 3; i++) {
      v = rad.getRandom();
      if(v !== "grün") return false;
    }
    return true;
  })

  Test("Glücksrad mindestens 2x rot bei 3 versuchen", function(){
    let rad = Urn({
      content: ["rot", "grün", "blau", "weiss"],
      putBack: true
    });

    let v = "";
    let c = 0;

    for(let i = 0; i < 3; i++) {
      v = rad.getRandom();
      if(v === "rot") c++;
    }
    return c >= 2;
  })

  Test("Glücksrad genau 2x rot bei 3 versuchen", function(){
    let rad = Urn({
      content: ["rot", "grün", "blau", "weiss"],
      putBack: true
    });

    let v = "";
    let c = 0;

    for(let i = 0; i < 3; i++) {
      v = rad.getRandom();
      if(v === "rot"){
        c++;
      }
    }

    return c === 2;
  })

  Test("Skat: 4 gleichfarbige karten ziehen", function(){
    let skat = Urn({
      content: [
        0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 1,
        2, 2, 2, 2, 2, 2, 2, 2,
        3, 3, 3, 3, 3, 3, 3, 3
      ],
      putBack: false
    });

    let c = skat.getRandom();

    for(let i = 0; i < 1; i++) {
      if(c !== skat.getRandom()) return false;
    }

    return true;
  })

  Test("Skat: 2 karten ziehen und ein paar erhalten", function(){
    let skat = Urn({
      content: [
        0, 1, 2, 3, 4, 5, 6, 7,
        0, 1, 2, 3, 4, 5, 6, 7,
        0, 1, 2, 3, 4, 5, 6, 7,
        0, 1, 2, 3, 4, 5, 6, 7,
      ],
      putBack: false
    });

    let c = skat.getRandom();

    for(let i = 0; i < 1; i++) {
      if(c !== skat.getRandom()) return false;
    }

    return true;
  })

  Test("Skat: 4 karten ziehen und 2 paare erhalten", function(){
    let skat = Urn({
      content: [
        0, 1, 2, 3, 4, 5, 6, 7,
        0, 1, 2, 3, 4, 5, 6, 7,
        0, 1, 2, 3, 4, 5, 6, 7,
        0, 1, 2, 3, 4, 5, 6, 7,
      ],
      putBack: false
    });

    let res = [];

    for(let i = 0; i < 4; i++) {
      res.push(skat.getRandom());
    }

    let result = {
      p1: false, p2: false
    }

    let p1 = res.splice(0, 1)[0];
    res.forEach(function(c, i){
      if(p1 === c){
        res.splice(i, 1);
        return result.p1 = true;
      }
    })

    let p2 = res.splice(0, 1)[0];
    if(p1 === p2) return false;

    res.forEach(function(c, i){
      if(p2 === c){
        res.splice(i, 1);
        return result.p2 = true;
      }
    })


    return result.p1 && result.p2;
  })


})();
