# Retry it

A very simple way to retry a function until a condition is met. 

## Installation

```
    npm install retry-it
```


To use, include in your node application:

```
    var retry = require('retry-it');
```

## Example use

**retry until a callback work as expected:**

```

    retry(getUsers) // getUsers takes a callback
      .every(100) // ms
      .until(function(users){
        return users.length>0; // until the users array has something.
      })
      .limit(9000)
      .go(function(users){
        console.log(users); // a list of users
      });
```

## Limitations

Currently the retried function must accept a single callback. You can easily turn a function into this format. For example:

```

    // before
    var originalFunction = function(arg1,arg2){
       var something;
       // something happens
       return something;
    }
    // usage before
    var res = originalFunction('foo','var');
    console.log(res);


    // after
    var wrappedFunction = function(cb){
      cb(originalfunction('foo','var'));
    }

    //usage after
    wrappedFunction(function(result){
      console.log(result);
});
```