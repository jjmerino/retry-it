exports = module.exports = function retry(f){
  var obj = {};
  var _that = undefined;
  var _delay = 200;
  var _times = 2;
  var _count = 0;
  var _success = false;
  var run = function(){
    var res = f.apply(_that,arguments)
    if(res){
      _success = true;
    }
    _count++;
    if(_count>=_times||_success){
      //we are done.
    }else{
      setTimeout(run,_delay);
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

  obj.go = function(){
    if(_that===undefined){
      _that=this;
    }
    run.apply(_that,arguments);
    return obj;
  };

  return obj;
}