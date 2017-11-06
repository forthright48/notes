# Mongoose

```
const findObj = {}
const updateFields = {a: "b", c: "d"}
const options = {...} // new, upsert, fields, sort
Model.findOneAndUpdate(findObj, {$set: updateFields}, options)

// Returns original found document


```
