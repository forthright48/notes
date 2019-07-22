# Bazel

## How to run a module in BUILD

In bazel, you must have a root somewhere. Just create a file name `WORKSPACE` somewhere and that becomes your root.

Now, somewhere down the root, you will have a folder with BUILD file in it. The BUILD file will contain lots of rules. If you want to run a rule, you have to use relative path from the root.

```
build run //relative/path/to/build/file:rule
```