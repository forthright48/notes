# AWK

AWK is a programming language designed for text processing and typically used as a data extraction and reporting tool. It is a standard feature of most Unix-like operating systems.

**For tasks that read files line by line and split on delimiters, AWK is probably the right tool for the job.**

## Number of field in each row

```bash
awk "{print NF}" < pos_cut.txt
```

NF is an AWK built in variable and it stands for number of fields.

## Searching

```bash
awk '/2410626/' pos_cut.txt
```

Will print the rows that contain the integer 2410626.

## Searching and Printing

```bash
less file | awk '{ if (/samiul/) { print $2} }'
```

## Custom separator

```bash
awk -F ":" '/2410626/' pos_cut.txt
awk 'BEGIN {OFS=","} /samiul/{ print $2} }' pos_cut.txt
```

## Resources

1. [Tim-Dennis: Using AWK to Filter Rows](https://www.tim-dennis.com/data/tech/2016/08/09/using-awk-filter-rows.html)
2. [StackOverflow: What is the difference between sed and awk?](https://stackoverflow.com/questions/1632113/what-is-the-difference-between-sed-and-awk)
3. [Learn Awk in Y minutes](https://learnxinyminutes.com/docs/awk/)