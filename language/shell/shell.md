# Shell Scripting

# How to check OS

```
var=$(uname -s)
if [[ $var == "Darwin" ]]; then
  echo "Mac"
fi
```
Possible names are: Darwin, Linux
