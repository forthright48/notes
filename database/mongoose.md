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
# Path level
field1: { type: String, unique: true, index: true },

# Schema level (mandatory for compound index)
mySchema.index({field1: 1, field2: 1}, {unique: true});

# More options
sparse: true
```

# Populate Selected fields

```
.populate('field1 field2', 'select1 select2');
```

# Backup

## mongodump vs mongoexport

https://stackoverflow.com/questions/44562993/which-one-is-the-preferred-choice-mongodump-vs-mongoexport-for-upgrading-mongodb

Mongodump and Mongorestore are better because:

- They run faster
- They preserve some data formats better than mongoexport and mongoimport, because the data is not translated from BSON into JSON and back.


```
sudo mongodump --db newdb --out /var/backups/mongobackups/`date +"%m-%d-%y"`
sudo mongorestore --db newdb --drop /var/backups/mongobackups/01-20-16/newdb/
```
