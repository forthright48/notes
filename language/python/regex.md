# Regex


If you need to match at the beginning of the string, or to match the entire string use `match`. It is faster. Otherwise use `search`.

```
import re

m = re.match(pattern, string, flag)
m.group(x) # Find x captured object. 1 based index.
```
