# Shell Scripting

```sh
#!/bin/sh

# There can be no space around "=" in var=value, otherwise (var = value) shell will think var is a command and try to execute it.  
MY_MESSAGE="Hello World"

# Read input from standard input
read MY_NAME

# Concatenate stuff with variable
touch "${MY_NAME}_file"

for i in 1 2 3 4 5
do
  echo "Looping ... number $i"
done

INPUT_STRING=hello
while [ "$INPUT_STRING" != "bye" ]
do
  echo "Please type something in (bye to quit)"
  read INPUT_STRING
  echo "You typed: $INPUT_STRING"
done

# Printing positional arguments
echo $0 $1 $2 $3
```

# Test

`[[ ]]` is the extended test. It has less surprises. [Extended Test Manual](http://mywiki.wooledge.org/BashFAQ/031)

`< > != =` all these are string comparison. Use `-ge -gt -ne` flags for integer comparison.

```bash
# [ must be surrounded by space cause its a command
if  [ something ]; then
 echo "Something"
 elif [ something_else ]; then
   echo "Something else"
 else
   echo "None of the above"
fi


# More test commands
if [ "$X" -lt "0" ]
then
  echo "X is less than zero"
fi
if [ "$X" -gt "0" ]; then
  echo "X is more than zero"
fi
[ "$X" -le "0" ] && \
      echo "X is less than or equal to  zero"
[ "$X" -ge "0" ] && \
      echo "X is more than or equal to zero"
[ "$X" = "0" ] && \
      echo "X is the string or number \"0\""
[ "$X" = "hello" ] && \
      echo "X matches the string \"hello\""
[ "$X" != "hello" ] && \
      echo "X is not the string \"hello\""
[ -n "$X" ] && \
      echo "X is of nonzero length"
[ -f "$X" ] && \
      echo "X is the path of a real file" || \
      echo "No such file: $X"
[ -x "$X" ] && \
      echo "X is the path of an executable file"
[ "$X" -nt "/etc/passwd" ] && \
      echo "X is a file which is newer than /etc/passwd"

# Escape meta characters for multiple condition inside if
if [ $# != 1 -o \( $1 != "dev" -a $1 != "prod" \) ] ; then
  echo "Please enter a single argument to specify prod or dev"
  exit 0
fi

```

# Flag and Option Parsing

[How to get arguments with flags in bash script](https://stackoverflow.com/a/21128172/2042242)

`getopts` does not support long flags. Single : means its has argument and :: means argument is optional.

```
verbose='false'
aflag=''
bflag=''
files=''

while getopts 'abf:v' flag; do
  case "${flag}" in
    a) aflag='true' ;;
    b) bflag='true' ;;
    f) files="${OPTARG}" ;;
    v) verbose='true' ;;
    *) error "Unexpected option ${flag}" ;;
  esac
done
```
