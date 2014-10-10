var retry = require('..');

describe('retryIt()',function(){

  describe('basics',function(){
    it('should retry if it fails.',function(done){
      var theNumber = 5;
      var guess = 0;
      var isdone=false;
      var guessNumber = function(){
        guess++;
        if(guess === theNumber){
          isdone =true;
          return true;

        }else{
          return false;
        }
      };
      retry(guessNumber)
        .times(7)
        .every(5)
        .go();
      setTimeout(function(){
        if(!isdone){
          done('Didnt retry');
        }
        else if(guess>5){
          done('Tried more times than necessary');
        }else{
          done();
        }
      },42)
    })
  });

});