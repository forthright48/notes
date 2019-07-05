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

- enum and enum class are different. Always use enum class. They are strongly typed enums, local scoped, do not convert to integer and does not operate between different enum classes. More safe.

