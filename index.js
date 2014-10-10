exports = module.exports = function retry(f){
  var obj = {};
  var _that = undefined;
  var _delay = 200;
  var _times = 2;
  var _count = {val:0};
  var _success = false;
  var _check = function(val){
    return val;
  };
  var run = function(args){
    var callback = function(val){
      if(_success !== true){
        _success = !!_check(val);
        if(_success===true){
          args[0](val);
        }
      }
    };
    if(_count.val>=_times||_success){
      //we are done.
    }else{
      var res = f.apply(_that,[callback]);
      _count.val++;

      if(res){
        _success = true;
      }

      setTimeout(run.bind(null,args),_delay);
    }
    return obj;
  };


  obj.every = function(delay){
    _delay = delay;
    return obj;
  };

  obj.bind = function(context){
    _that = context;
    return obj;
  };
  obj.times = function(times){
    _times = times;
    return obj;
  };
  obj.check = function(fun){
    _check = fun;
    return obj;
  }
  obj.timeout = function(times){

  }
  obj.go = function(){
    if(_that===undefined){
      _that=this;
    }
    run(arguments);
    return obj;
  };

  return obj;
}