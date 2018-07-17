# File

```
f = open('workfile', 'w')
f.write(string)
f.close()
```

# List

```
myList.append(["a", "true"]) # Array appended
myList.extend(["a", "true"]) # Elements appended separately

myList.remove('a') # Remove a single 'a'
myList = [x for x in myList if x != 'a'] # Multiple 'a' removed

# Sorting

## Sorting list of objects by key
newlist = sorted(list_to_be_sorted, key=lambda k: k['name'])
```

# Print

```python
# Print without newline
print('.', end='')
```

# String

```
# Long string without newline break
s = ("this is a very"
      "long string too"
      "for sure ..."
     )

x = 'blue,red,green'
x.split(",") # ['blue', 'red', 'green']
```
