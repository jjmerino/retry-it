var retry = require('..');

describe('retryIt()',function(){

  describe('basics',function(){
    it('should retry if it fails.',function(done){
      var theNumber = 5;
      var guess = 0;
      var isdone=false;
      var guessNumber = function(){
        if(guess === theNumber){
          isdone =true;
          done();
          return true;

        }else{
          guess++;
          return false;
        }
      };
      retry(guessNumber)
        .times(6)
        .every(20)
        .go();
      setTimeout(function(){
        if(!isdone){
          done('Didnt retry');
        }
      },500)
    })
  });

});