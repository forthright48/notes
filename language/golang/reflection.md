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

## Resources

1. [Go Blog: The Laws of Reflection](https://blog.golang.org/laws-of-reflection)
1. [GopherCon 2016: Emily Gu - The Power and Elegance of Reflection](https://www.youtube.com/watch?v=lI17OEJCPVw)