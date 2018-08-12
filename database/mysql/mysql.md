# Mysql 

## Limit

```sql
SELECT * FROM MyTable ORDER BY whatever LIMIT 0,1000
SELECT * FROM MyTable ORDER BY whatever LIMIT 1000,1000
SELECT * FROM MyTable ORDER BY whatever LIMIT 2000,1000
```

`OFFSET` is very bad. Instead of processing the data in $O(N)$ time, it will take $O(N^2)$. This is because of the effort to skip past the "offset" rows.