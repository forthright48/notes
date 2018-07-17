# Shebang

`#!/usr/bin/env python3`

# argparse

```
import argparse

parser = argparse.ArgumentParser()

# Positional argument
parser.add_argument("echo", help="echo the string you use here")

# argparse treats the options we give it as strings, unless we tell it otherwise.
parser.add_argument("square", type=int, help="display a square of a given number")

# Optional argument (if absent, value is set to None)
parser.add_argument("--verbosity", help="increase output verbosity")

# Optional boolean argument ( checks for presence of flag )
parser.add_argument("--verbose", help="increase output verbosity", action="store_true")

# Short version
parser.add_argument("-v", "--verbose", help="increase output verbosity", action="store_true")

args = parser.parse_args()
```
**Learn more**: [Argparser turorial](https://docs.python.org/3/howto/argparse.html#id1)

# pathlib

```
from pathlib import Path

# current working directory
str(Path.cwd())

# Join paths
str(Path('/', 'Users', 'stephanfitzpatrick', 'git'))

# Open files
with Path('.', 'truth.txt').open() as foo:
    print(foo.read())

# Make path absolute
filepath = Path.resolve(filepath);
```

**Learn more**: [Pathlib doc](https://docs.python.org/3/library/pathlib.html#pathlib.Path)

# Resource

1. [Ultimate script tutorial](http://www.dreamsyssoft.com/python-scripting-tutorial/)
