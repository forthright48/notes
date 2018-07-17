# Lodash

## Loop for N times
```
for(var i = 0; i < 5; i++) {
    // ....
}

_.times(5, function(i){
    // ...
});
```

## Deep-cloning Javascript object

```
var objA = {
    "name": "colin"
}

// Normal method? Too long. See Stackoverflow for solution: http://stackoverflow.com/questions/4459928/how-to-deep-clone-in-javascript

// Lodash
var objB = _.cloneDeep(objA);
objB === objA // false
```

However, this will only work if there are no function within the object.

# Resource

1. [Lodash: 10 Javascript Utility Functions That You Should Probably Stop Rewriting](https://colintoh.com/blog/lodash-10-javascript-utility-functions-stop-rewriting)
