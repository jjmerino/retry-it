var retry = require('..');

describe('retryIt()',function(){

  describe('basics',function(){
    var guessNumber;
    var getUsers;
    var theNumber;
    var guess;
    var isdone;
    beforeEach(function(){
      guess = 0;
      theNumber = 5;
      isdone=false;
      guessNumber = function(){
        guess++;
        if(guess === theNumber){
          isdone =true;
          return true;

        }else{
          return false;
        }
      };
      getUsers = function(callback){
        guess++;
        if(guess === theNumber){
          // make it work
          isdone =true;
          // simulate ajax working
          setTimeout(function(){
            callback(['alex','rishi','rick']);
          },30);
        }else{
          // simulate ajax working
          setTimeout(function(){
            callback(false);
          },30);
        }
      };
    });

    it('should retry if it fails.',function(done){
      retry(guessNumber)
        .times(10)
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
    });
    it('should handle async functions.',function(done){
      retry(getUsers)
        .times(10) // check at most 10 times
        .every(100) // try every 5 ms
        .check(function(result){ // return a truthy or falsy value. timeout is considered failing.
          return result.length > 0;
        })
        .go(function(result){// what we want to do with the data. After we succeed.

        });
      setTimeout(function(){
        if(!isdone){
          done('Didnt retry');
        }
        else if(guess>5){
          done('Tried more times than necessary. Got '+ guess);
        }else{
          done();
        }
      },700)
    })
  });

});