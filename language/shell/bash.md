# Double Expansion

```
x="samiul"
$x # "samiul"
${(P)x} # $samiul
```

It's like pointer. It points to a variable and we dereference it by `$((P)x)` 

# Loop

```
for x in array;
do
    echo $x;
done
```

# Sub shell

How to run command from shell?

```
pwd = $(pwd)
```

`$()` creates a sub shell and runs the command.
