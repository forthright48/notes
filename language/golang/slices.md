# Slices

Slices are references to arrays.

# Difference between slice and array

Array has a fixed length. Slices are dynamic arrays.

```go
var a [10]int
// The length of the array is a part of it
```

Arrays can be hashed, slices cannot.

# Length vs Capacity

The length of a slice is the number of elements it contains.

The capacity of a slice is the number of elements in the underlying array, counting from the first element in the slice.

The length and capacity of a slice s can be obtained using the expressions `len(s)` and `cap(s)`.

## Nil Slices

If slice has length 0, then it is a nil slice

```go
var s []int
if s == nil {
  fmt.Println("nil")
}
```

# Initiate Slice

Slices can be initated by assigning values directly.

```go
x := []bool{true, false, true}
```

But what if we don't have initiate values and just want an empty slice?

For that we have make.

```go
a := make([]int, length, capacity)
```

# Append to Slice

We can append items to slice using `append()` method.

```go
func append(s []T, vs ...T) []T
s := make(int[], 2)
s = append(s, 1, 2, 3, 4, 5, 6)
```

# Iterating over Slice

For iterating we have `range()` method

```go
var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}
for i, v := range pow {
  fmt.Printf("2**%d = %d\n", i, v)
}
```
`range()` returns index and copy of each value in slice.
