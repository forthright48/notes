# Reflection

- > Reflection in a computing is the ability of a program to exaine its own structure, particulary through types; it's a form of metaprogramming. - Rob Pike at The Laws of Reflection

- > It's a power tool that should be used with care and avoided unless strictly necessary - Rob Pike at The Laws of Reflection

- > Compared to a disk seek or network transfer, the cost of reflection will be negligible. - Dave Cheney

- Without Reflection, you will have to write different code for every type when doing data transformation or resource injection.

## Kind vs Type

Kind is builtin type. Type is user defined type.

## Relation to Interface

Assigning an object to interface does not change the output of reflect.  

## API

1. `reflect.ValueOf()`
2. `rv.Kind()`
3. `rv.Elem()`
4. `rv.NumField()`

```go
import reflect;

func display (v interface{}) {
    // Inspect the concrete type value that is passed in
    rv := reflect.ValueOf(v)

    if (rv.Kind() == reflect.Ptr) {
        rv = rv.Elem()
    }
}
```

## Laws of Reflection

### First Law: Reflection goes from interface value to reflection object

I was really confused about what this line meant. Later I realized, they are simply introducing some functions that take `interface{}` as input and spits out `reflect` object as output. 

The functions introduced are: `reflect.TypeOf` and `reflect.ValueOf` which extracts `reflect.Type` and `reflect.Value` correspondingly.

### Second Law: Reflection goes from reflection object to interface value

Basically, we have a function to convert `reflect` object to interface again.

```go
func (v Value) Interface() interface{}
```

### Third Law: To modify a reflection object, the value must be settable

Not all reflect object have settable properties.

```go
var x float64 = 3.4
v := reflect.ValueOf(x)
fmt.Println(v.CanSet())  // false
v.SetFloat(7.1) // Error: will panic.
```

Basically, when we set a property of a reflect object, we want that to reflect in the original value too. But this is not possible above, as reflect object was provided a copy of x.

In order to allow it to change the original value, we need to pass pointer.

```go
var x float64 = 3.4
p := reflect.ValueOf(&x) // Note: take the address of x.
fmt.Println("type of p:", p.Type()) // Output: type of p: *float
fmt.Println("settability of p:", p.CanSet()) // Output: settability of p: false

v := p.Elem() // dereference the pointer
fmt.Println("settability of v:", v.CanSet()) // Output: settability of v: true
```

## Application of Reflect

Read more on [Learning to Use Go Reflection — Part 2](https://medium.com/capital-one-developers/learning-to-use-go-reflection-part-2-c91657395066)

- Marshaling and Unmarshaling data from a file or a network.

## Resources

1. [Go Blog: The Laws of Reflection](https://blog.golang.org/laws-of-reflection)
2. [GopherCon 2016: Emily Gu - The Power and Elegance of Reflection](https://www.youtube.com/watch?v=lI17OEJCPVw)
3. [Learning to Use Go Reflection — Part 2](https://medium.com/capital-one-developers/learning-to-use-go-reflection-part-2-c91657395066)