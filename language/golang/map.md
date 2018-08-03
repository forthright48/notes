# Map

Key to Value map. Key can be any comparable element. Value can be literally anything.

## Using it

- Map is like a slice. A pointer. So you must inititate it first
- Unassigned map is like a nil pointer.
- Nil Map: you can still "get" keys from them, but trying to assign to it will panic

```go
// Initiate 
m = make(map[string]int)
m = map[string]int{
    "hello": 1,
    "world": 2,
}

// Access
v := m[key]
v, ok := m[key]

// Length
len(m)

// Delete key
delete(m, key)

// Iterate
for key, value := range m {}
```