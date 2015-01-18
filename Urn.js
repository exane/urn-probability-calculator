var Urn = (function(){
    var Urn = function(options){
        if(!(this instanceof Urn))
            return (new Urn(options));


        this._content = options.content;
        this._ordered = options.ordered || false;
        this._withReplacement = options.replace || false;
    };
    var r = Urn.prototype;

    r._content = null;

    r.remove = function(index){
        return (this._content.splice(index, 1))[0];
    }

    r.get = function(index){
        return this._content[index];
    }

    r.getRandom = function(){
        var rnd = Math.random() * this._content.length | 0;
        return this._withReplacement ? this.get(rnd) : this.remove(rnd);
    }

    return Urn;
})();

var Test = (function(){
    var Test = function(desc, cb){
        if(!(this instanceof Test))
            return (new Test(desc, cb));

        this.reset();
        this.desc = desc;
        this._test(cb);
    };
    var r = Test.prototype;

    Test.TIMES = 10000;

    r.result = null;
    r.desc = null;

    r._test = function(cb){
        for(var i = 0; i < Test.TIMES; i++) {
            cb.call(this) ? this.result.T++ : this.result.F++;
        }
        this.print();
    }

    r.getRndInt = function(min, max){
        var rnd = Math.random()*max | 0;
        return rnd >= min ? rnd : this.getRndInt(min, max);
    }

    r.print = function(){
        console.log("%c%s:\n\tLast Result: true = %d(%f%) | false = %d(%f%)", "color: green; font-size: 14px",
        this.desc, this.result.T, this._percentage(this.result.T), this.result.F, this._percentage(this.result.F));
    }

    r._percentage = function(nr){
        return Math.round(100 * nr / Test.TIMES);
    }

    r.reset = function(){
        this.result = {
            T: 0,
            F: 0
        }
    }


    return Test;
})();
