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
