var retry = require('..');

describe('retryIt()',function(){

  describe('basics',function(){
    var guessNumber;
    var getUsers;
    var theNumber;
    var tries;
    var isdone;
    beforeEach(function(){
      tries = 0;
      theNumber = 5;
      isdone=false;
      guessNumber = function(){
        tries++;
        if(tries === theNumber){
          isdone =true;
          return true;

        }else{
          return false;
        }
      };
      getUsers = function(callback){
        tries++;
        if(tries === theNumber){
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
        .limit(10)
        .every(5)
        .go();
      setTimeout(function(){
        if(!isdone){
          done('Didnt retry');
        }
        else if(tries>5){
          done('Tried more times than necessary');
        }else{
          done();
        }
      },42)
    });
    it('should handle async functions.',function(done){
      retry(getUsers)
        .limit(10) // check at most 10 times
        .every(100) // try every 5 ms
        .until(function(result){ // return a truthy or falsy value. timeout is considered failing.
          return result.length > 0;
        })
        .go(function(result){// what we want to do with the data. After we succeed.

        });
      setTimeout(function(){
        if(!isdone){
          done('Didnt retry');
        }
        else if(tries>5){
          done('Tried more times than necessary. Got '+ tries);
        }else{
          done();
        }
      },700);
    });

    it('should work for waiting for a certain state',function(done){
      var userHasReturned = false;
      var user = {};
      var getUser = function(callback){
        callback(user);
      };
      var logs = [];
      retry(getUser).every(100).limit(9000).until(function(){
        return userHasReturned;
      }).go(function(result){
        logs.push('1');
      });
      logs.length.should.equal(0);

      setTimeout(function(){
        userHasReturned = true;
        user = {name:'jose'};
      },100);

      setTimeout(function(){
        logs.length.should.equal(1);
        done();
      },300);
    })
  });

});