# SQL Query

- You can select distinct column items using `Distinct()` function like following:

  ```
  select Distinct(city)
  from station
  where (id % 2) = 0
  ```

- Modular arithmetic works. Look above.
- You can order by selected column as follow:
  ```
  select city, char_length(city)
  from station
  order by 2 desc, 1
  limit 1;
  ```

  [Exercise](https://www.hackerrank.com/challenges/weather-observation-station-5/problem)

- You can match strings with regex like this:

  ```
  select distinct(city)
  from station
  where city REGEXP "^[aeiou]+";
  ```

# Function List

- count
- distinct
- char_length(string s)
- substring(sting s, int start)

# Mysql Operators

## Like

The LIKE operator is commonly used to select data based on patterns. Using the LIKE operator in the right way is essential to increase the query performance.

The LIKE operator allows you to select data from a table based on a specified pattern. Therefore, the LIKE operator is often used in the WHERE clause of the SELECT statement.

MySQL provides two wildcard characters for using with the LIKE operator, the percentage % and underscore _ .

% works like * in regex, 0 or more characters.
_ works like . in regex, exactly 1 character.
