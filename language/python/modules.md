# Pickle

```
import pickle

obj = {'example': 'example'}

"dump to file"
with open('file', 'wb') as file:        "notice the b flag in open"
    pickle.dump(obj, file)

"read from file"
with open('file', 'wb') as file:
    obj = pickle.load(file)
```


