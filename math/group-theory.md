# Group Theory

Group -> Ring -> Field

## Group

A group is a set $G$ with operation $*$ such that it has the following properties:

- **Closure**: For all $x,y \in G$, $x*y = z\in G$
- **Associativity**: $a * (b * c) = (a * b) * c$
- **Identity**: There is an element $e \in G$ such that $e * g = g * e = g$ for all $g \in G$.
- **Inverse**: For every $g \in G$ there exists $g^{-1} \in G$ such that $g * g^{-1} = g^{-1} * g = e$.

A group does not need to be commutative, i.e, $x * y \not = y * x$.

If a group is commutative then it is called **abelian**.

If a set only has closure and associative property, then it is called **Semi-Group**.

If a set has closure, associative and identity property, it is called **Monoid**.

Example: $(Z,+)$, where $Z$ is the set of all integers.

## Ring

A ring is a set $R$ with two operations $+$ and $*$, which has the following properties:

- $R$ is a abelian group under $+$.
- $R$ is monoid under $*$.
- The operation $*$ distributes over $+$:
    $$a * (b + c) = ( a * b) + (a * c) \\\\
    (a + b) * c = (a * c) + ( b * c)$$

## Field

A field is a set $F$ together with two operations $+$ and $*$ which has the following properties:

- $F$ is commutative ring under $+$ and $*$.
- Multiplicative Inverser: For every nonzero $f \in F$, there is $g \in F$ such that $f * g = g * f = 1$.

For example, $Z_p$ is a field, where $Z_p$ is set of integers modulo a prime $p$.
