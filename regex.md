# Javascript Regex

Use the following syntax to build regex

```
regexp = /regex-expression/flag;
match = regexp.exec(a_string_to_match_against);

// If you want boolean only
test = regexp.test(a_string_to_match_against);
```

Returns captured groups in a 1-indexed array (because match[0] contains the input).

If no match occurs, it returns null.


# Non Capturing Group
`/(?:whatever)/`

`(?:)` is a non-capturing group
