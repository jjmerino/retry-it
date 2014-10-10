# Retry it

A very simple way to retry a function until a condition is met. 

## Installation

```
  npm install retry-it
```

## Example usage

First require the retry-it library:
```
  var retry = require('retry-it');
```

Then take any function that may fail. E.g an async function. and wrap it like so:
```
// Example function
var getUsers = function(callback){
   // a function that queries a server and passes a list of users to the callback
   // i.e:  callback(listOfUsers);
}

retry(getUsers)
   .times(10) // run at most 10 times
  .every(100) // try every 100 ms
  .check(function(result){ 
    return result.length > 0;// return a truthy or falsy value. Truthy will indicate retry-it to stop.
  })
  // Starts executing
  .go(function(result){// (this is the callback you would originally pass to getUser.)
    console.log(result);// Note: This is only called once. After check returns true
  });
```

Currently, your function can either return a truthy/falsy value to report success, or it must have a single callback as the first parameter.

