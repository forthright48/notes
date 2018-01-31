# Mongoose

# Find one and update
```
const findObj = {}
const updateFields = {a: "b", c: "d"}
const options = {...} // new, upsert, fields, sort
Model.findOneAndUpdate(findObj, {$set: updateFields}, options)
// Returns original found document
```

# Update

Don't forget to send "multi" true to update multiple object.
```
Coll.update(query,update,{
  multi: true,
  upsert: true
});

$set
$push
$pull
$addToSet
```

# Mongoose Unique values in nested array of objects

[Stack Overflow](https://stackoverflow.com/questions/15921700/mongoose-unique-values-in-nested-array-of-objects)

```
var user = { uid: userOid, ... };
Group.update(
     // This ensures users.uid is unique
    {name: 'admin', 'users.uid': {$ne: user.uid}},
    {$push: {users: user}},
    function(err, numAffected) { ... });
```

# Aggregate

```
db.aggregate([
  {
    // Select docs that match query
    $match: {
      // Normal query
      type: "folder"
  },
  {
    // Used for getting random document
    $sample: {
      size: 1
    }
  }
}  
])
```

# Query Array of Object

Use `$elemMatch`. Returns the parent object.

```
const userList = await User.find({
  ojStats: {
    $elemMatch: {
      ojname,
      solveList: problemId,
    },
  },
}, {username: 1}).exec();
```

[Query an Array of Embedded Documents](https://docs.mongodb.com/manual/tutorial/query-array-of-documents/)

# Index

```
field1: { type: String, unique: true, index: true },
```
