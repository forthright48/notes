- Function Overload: when functions have same name but different signiture. The functions should implement the same semantics, e.g, print(string) and print(int)
- Use curly braces {} for initilization instead of = (if you are using auto, then use =)
    - TODO: Explore why curly braces is better than equal sign
- There are three kinds of scope: local, class and namespace.
    - Objects created by new are not part of any scope. They are only destroyed when "delete" is used on them.
- Constants
    - const: Values that we do not change. The compiler enforces this. Once a variable is declared const, we cannot reassign it again. We do not know the value of the constant during compile time though. All we know is that it doesn't change once assigned.
    - constexpr: Behaves like const but with the extra feature that we know the value during compile time. Compiler enforces this.
        - Read more on constexpr: [Demystifying constexpr](https://blog.quasardb.net/2016/11/22/demystifying-constexpr)
- A reference cannot be changed to a different object once initialized.
- Use nullptr instead of NULL for null pointer.

# User Defined Types

- prefer enum class over plain enum. enum and enum class are different. Enum class is strongly typed enums, local scoped, do not convert to integer and does not operate between different enum classes. More safe.
- define constructors to gurantee and simplify initialization of class
- avoid naked union. wrap them in a class together with a type field.

# Modularity

- .h files are like interfaces
- if a function doesn't throw any exception, use "noexcept" tag to indicate that. If the function still throws an exception, the program gets terminated.
- use static_assert for compilation asserts

# Classes

- Use static_cast instead of normal cast. Safer and better.
    - Easy to spot in code. Easy to search for.
- Concrete classes are like built in types. We define them directly.
- Classes in Class Hierarchy are different. We define them with new and use pointers to access them.
    - Why? Because we might have a function that returns abstract class shape. The function can return any of its derived class among Triangle, Square and Circle.

## Dynamic Cast for Hierarchy Navigation: is instance of

```
if (Derived* p = dynamic_cast<Derived*> (base)) {
    // This is the derived class
}
```

If the base class is not an instance of derived class, dynamic_cast returns nullptr.

## Use smart pointers: unique_ptr vs raw

```
unique_ptr<base> x = new Derived();
```

Using unique_ptr behaves like java. When there is no unique_ptr left pointing to an instance, that instance is freed.

## Copy and Move

A variable can be copied in two ways: a copy constructor (`complex z2{z1}`) or a copy assignment (`complex z3 = z1`)

How do we define them?

```
Vector(const Vector &a);   // Copy constructor
Vector& operator = (const Vector &a); // Copy assignment
```

Some times we don't want to copy things. For example, a = x + y + z. If we use the logic as the following code:

```cpp
Vector operator+(const Vector& a, const Vector& b) {
    if (a.size()!=b.size())
        throw Vector_size_mismatch{};
    Vector res(a.size());
    for (int i=0; i!=a.size(); ++i)
        res[i]=a[i]+b[i];
    return res;
}
```
then, the vector gets copied twice and we don't even use the copy eventually. We just wanted the result.

In such cases, move is better.

```cpp
Vector(Vector&& a); // move constructor
Vector& operator=(Vector&& a); // move assignment

Vector::Vector(Vector&& a)
:elem{a.elem}, // "grab the elements" from a
sz{a.sz} {
    a.elem = nullptr; // now a has no elements
    a.sz = 0;
}

```

Notice the `&&` sign. The `&&` means "rvalue reference" and is a reference to which we can bind a rvalue. It complements "lvalue" which usually appears on left hand side of equal sign. Therefore, "rvalue" which appears on right side of equal sign and nobody can assign to. In our example, the `res` returned from the function is a local variable which does not exist outside of its scope and hence nobody can assign to it. Hence, it is safe to steal its value.

Where the programmer knows that a value will not be used again, but the compiler can’t be expected to be smart enough to figure that out, the programmer can be specific:

```
Vector f(){
    Vector x(1000);
    Vector y(1000);
    Vector z(1000);
    z = x; // we get a copy
    y = std::move(x); // we get a move
    return z; // we get a move  
};
```

## Explicit
Always use explicit with single argument constructors unless there is strong reason not to.

## Suppressing Operations

Using the default copy or move for a class in a hierarchy is typically a disaster given only a pointer to a base, we simply don’t know what members the derived class has, so we can’t know how to copy them. So, the best thing to do is usually to delete the default copy and move operations, that is, to eliminate the default definitions of those two operations

```
Shape(const Shape&) =delete;
```

## Support Range for loop

To support the range-for loop for our Vector, we must define suitable begin() and end() functions

```
template<typename T>
T* begin(Vector<T>& x) {
    return x.size() ? &x[0] : nullptr; // pointer to first element or nullptr
}

template<typename T>
T* end(Vector<T>& x) {
    return begin(x)+x.size(); // pointer to one-past-last element
}
```

# Templates

## Functor: Function Objects

```
template<typename T>
class Less_than {
    const T val; // value to compare against
    public:
    Less_than(const T& v) :val(v) { }
    bool operator()(const T& x) const { return x<val;  } // call operator 
};
```

The function called `operator()` implements the function call behavior.

```
Less_than<int> lti {42};
bool b1 = lti(12);
```

## Lambda Expression

```
int x = 7;

example( [&](int a){ return a<x;  } );

template<typename P>
bool example (P pred) {
    return pred(7);
}
```

