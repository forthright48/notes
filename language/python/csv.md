# csv

```python
import csv

with open(filePath,"r") as f:
  fieldnames = ['first_name', 'last_name']
  dict = csv.DictReader(f, delimiter=',', fieldnames=fieldnames)
```
