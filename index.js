exports = module.exports = function retry(f){
  var obj = {};
  // Configuration options to be exposed via setters
  var _that = undefined;
  var _delay = 200;
  var _limit = 2;
  var _count = {val:0};
  var _success = false;
  var _until = function(val){
    return val;
  };

  // tries to run the function and checks if it was successfull or not
  var run = function(args){
    var callback = function(val){
      if(_success !== true){
        _success = !!_until(val);
        if(_success===true){
          args[0](val);
        }
      }
    };
    if(_count.val>=_limit||_success){
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


  /*
   * Start of public methods (mostly setters)
   */


  obj.every = function(delay){
    _delay = delay;
    return obj;
  };

  obj.bind = function(context){
    _that = context;
    return obj;
  };

  obj.limit = function(limit){
    _limit = limit;
    return obj;
  };

  obj.until = function(fun){
    _until = fun;
    return obj;
  };

  obj.timeout = function(times){

  };

  /**
   * Starts trying, pass in the exact parameters you expect from your function.
   */
  obj.go = function(){
    if(_that===undefined){
      _that=this;
    }
    run(arguments);
    return obj;
  };

  return obj;
}