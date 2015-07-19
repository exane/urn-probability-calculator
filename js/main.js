import { Urn, Test, xTest } from "./Urn.js";


(function main(){
  //Test.TIMES = 30000;
  Test("Skat: 4 karten ziehen. Zwei paare erhalten. Allerdings kein Vierling", function(){
    let skat = Urn({
      content: [
        0, 1, 2, 3, 4, 5, 6, 7,
        0, 1, 2, 3, 4, 5, 6, 7,
        0, 1, 2, 3, 4, 5, 6, 7,
        0, 1, 2, 3, 4, 5, 6, 7
      ],
      putBack: false
    });

    //let s = skat.getRandom();
    let c = 0;

    let p1, p2;


    for(let i = 0; i < 4; i++) {
      let res = skat.getRandom();
      if(p1 === undefined) {
        p1 = res;
        continue;
      }
      if(p2 === undefined && p1 != res) {
        p2 = res;
        continue;
      }
      if(p1 === res) {
        c++;
        p1 = -1;
      }
      if(p2 === res) {
        c++;
        p2 = -1;
      }
    }

    return c === 2;
  })

  Test("Skat: 2 karten ziehen. Ein paar erhalten", function(){
    let skat = Urn({
      content: [
        0, 1, 2, 3, 4, 5, 6, 7,
        0, 1, 2, 3, 4, 5, 6, 7,
        0, 1, 2, 3, 4, 5, 6, 7,
        0, 1, 2, 3, 4, 5, 6, 7
      ],
      putBack: false
    });

    let s = skat.getRandom();
    let c = 1;


    //for(let i = 0; i < 1; i++) {
      let res = skat.getRandom();
      if(s === res) c++;
    //}

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

    let s = 1;
    let c = 0;


    for(let i = 0; i < 4; i++) {
      let res = skat.getRandom();
      if(s === res) c++;
    }

    return c === 4;
  })

  xTest("3x Berg besteigen. Chance gipfel zu erreichen = 3/5 | wie hoch ist die chance mehr als 1 mal den gipfel zu erreichen?", function(){
    let c = 0;

    for(let i=0; i<3; i++) {
      let rnd = Math.random();
      rnd < 3/5 ? c++ : c;
    }


    return c >= 2;
  })

  xTest("3x Berg besteigen. Chance gipfel zu erreichen = 3/5 | wie hoch ist die chance 3 mal den gipfel zu erreichen?", function(){
    let c = 0;

    for(let i=0; i<3; i++) {
      let rnd = Math.random();
      rnd < 3/5 ? c++ : c;
    }


    return c == 3;
  })

  xTest("3x Berg besteigen. Chance gipfel zu erreichen = 3/5 | wie hoch ist die chance 2 mal den gipfel zu erreichen?", function(){
    let c = 0;

    for(let i=0; i<3; i++) {
      let rnd = Math.random();
      rnd < 3/5 ? c++ : c;
    }


    return c == 2;
  })

  xTest("3x Berg besteigen. Chance gipfel zu erreichen = 3/5 | wie hoch ist die chance 1 mal den gipfel zu erreichen?", function(){
    let c = 0;

    for(let i=0; i<3; i++) {
      let rnd = Math.random();
      rnd < 3/5 ? c++ : c;
    }


    return c == 1;
  })

  xTest("3x Berg besteigen. Chance gipfel zu erreichen = 3/5 | wie hoch ist die chance kein einziges mal den gipfel zu erreichen?", function(){
    let c = 0;

    for(let i=0; i<3; i++) {
      let rnd = Math.random();
      rnd < 3/5 ? c++ : c;
    }


    return c === 0;
  })

  xTest("Rücksendung von Schuhen. 50% Damen, 30% Herren, 20% Kinder. Grund 2 60%. Wie hoch ist die Chance das Grund 2 als rücksendegrund angegeben wird?", function(){
    let c = 0;
    let rnd = Math.random();
    let s = rnd < 0.5 ? "D" : (rnd < 0.8 ? "H" : "K");

    let g2 = s === "D" ? 0.6 : s === "H" ? 0.4 : 0.3;

    return Math.random() < g2;
  })
  
  xTest("3 Jäger. Chance zu treffen: A = 1/3 | B = 5/8 | C = 4/5. Hase wird genau 2x getroffen. Wie hoch ist die Chance das A trifft?", function(){
    let c = 0;

    let A, B, C;

    A = Math.random() < 1 / 3 ? ++c : 0;
    B = Math.random() < 5 / 8 ? ++c : 0;
    C = Math.random() < 4 / 5 ? ++c : 0;

    return A && c === 2;
  })

  xTest("3 Jäger. Chance zu treffen: A = 1/3 | B = 5/8 | C = 4/5. Hase wird genau 2x getroffen.", function(){
    let c = 0;

    let A, B, C;

    A = Math.random() < 1 / 3 ? ++c : 0;
    B = Math.random() < 5 / 8 ? ++c : 0;
    C = Math.random() < 4 / 5 ? ++c : 0;

    return c === 2;
  })

  xTest("3 Jäger. Chance zu treffen: A = 1/3 | B = 5/8 | C = 4/5. Wie hoch ist die Chance das jeder trifft?", function(){
    let c = 0;

    let A, B, C;

    A = Math.random() < 1 / 3 ? ++c : 0;
    B = Math.random() < 5 / 8 ? ++c : 0;
    C = Math.random() < 4 / 5 ? ++c : 0;

    return c === 3;
  })

  xTest("3 Jäger. Chance zu treffen: A = 1/3 | B = 5/8 | C = 4/5. Wie hoch ist die Chance das keiner trifft?", function(){
    let c = 0;

    let A, B, C;

    A = Math.random() < 1 / 3 ? ++c : 0;
    B = Math.random() < 5 / 8 ? ++c : 0;
    C = Math.random() < 4 / 5 ? ++c : 0;

    return c === 0;
  })

  xTest("Chance fahrticket zu erhalten 90%. 3 versuche. Wie hoch ist die wahrscheinlichkeit mindestens einmal kein ticket zu erhalten?", function(){
    let c = 0;

    for(let i = 0; i < 3; i++) {
      let v = this.getRndInt(0, 100);
      if(v >= 90) c++;
    }

    return c >= 1;
  })

  xTest("Chance fahrticket zu erhalten 90%. 3 versuche. Wie hoch ist die wahrscheinlichkeit bei jedem versuch ein ticket zu erhalten?", function(){
    let c = 0;

    for(let i = 0; i < 3; i++) {
      let v = this.getRndInt(0, 100);
      if(v < 90) c++;
    }

    return c === 3;
  })
  
  xTest("11 bonbons (10 gelbe + 1 rote). chance 4x gelbe zu ziehen", function(){
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

  xTest("11 bonbons (10 gelbe + 1 rote). chance rote zu ziehen", function(){
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

  xTest("Urn: A < k AND B > k", function(){
    let urn = Urn({
      content: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    });
    let A = urn.getRandom();
    let B = urn.getRandom();
    let k = this.getRndInt(1, 10);
    return A < k && B > k;
  });

  xTest("Dice: A == B", function(){
    let dice = Urn({
      content: [1, 2, 3, 4, 5, 6],
      putBack: true
    });
    let d1 = dice.getRandom();
    let d2 = dice.getRandom();

    return d1 == d2;
  })

  xTest("Dice: A == B == C", function(){
    let dice = Urn({
      content: [1, 2, 3, 4, 5, 6],
      putBack: true
    });
    let d1 = dice.getRandom();
    let d2 = dice.getRandom();
    let d3 = dice.getRandom();
    return d1 == d2 && d1 == d3;
  })

  xTest("Dice: A != B", function(){
    let dice = Urn({
      content: [1, 2, 3, 4, 5, 6],
      putBack: true
    });
    let d1 = dice.getRandom();
    let d2 = dice.getRandom();
    return d1 != d2;
  })

  xTest("Dice: A == 5 AND B == 6", function(){
    let dice = Urn({
      content: [1, 2, 3, 4, 5, 6],
      putBack: true
    });
    let d1 = dice.getRandom();
    let d2 = dice.getRandom();
    return d1 == 5 && d2 == 6;
  })

  xTest("Dice: A > 3 OR B > 3", function(){
    let dice = Urn({
      content: [1, 2, 3, 4, 5, 6],
      putBack: true
    });
    let d1 = dice.getRandom();
    let d2 = dice.getRandom();
    return d1 > 3 || d2 > 3;
  })

  xTest("Dice: A > 3 OR B > 3 AND A != B", function(){
    let dice = Urn({
      content: [1, 2, 3, 4, 5, 6],
      putBack: true
    });
    let d1 = dice.getRandom();
    let d2 = dice.getRandom();
    return (d1 > 3 || d2 > 3) && d1 != d2;
  })

  xTest("Glücksrad 1x rot bei 1 versuch", function(){
    let rad = Urn({
      content: ["rot", "grün", "blau", "weiss"],
      putBack: true
    });

    let v = "";

    v = rad.getRandom();
    return v === "rot";
  })

  xTest("Glücksrad mindestens 1x rot bei 2 versuchen", function(){
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

  xTest("Glücksrad genau 1x rot bei 3 versuchen", function(){
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

  xTest("Glücksrad mindestens 1x rot bei 3 versuchen", function(){
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

  xTest("Glücksrad 3x grün bei 3 versuchen", function(){
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

  xTest("Glücksrad mindestens 2x rot bei 3 versuchen", function(){
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

  xTest("Glücksrad genau 2x rot bei 3 versuchen", function(){
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

  xTest("Skat: 4 gleichfarbige karten ziehen", function(){
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

  xTest("Skat: 2 karten ziehen und ein paar erhalten", function(){
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
