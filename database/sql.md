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
- RTrim()

# Mysql Operators

## Like

The LIKE operator is commonly used to select data based on patterns. Using the LIKE operator in the right way is essential to increase the query performance.

The LIKE operator allows you to select data from a table based on a specified pattern. Therefore, the LIKE operator is often used in the WHERE clause of the SELECT statement.

MySQL provides two wildcard characters for using with the LIKE operator, the percentage % and underscore _ .

% works like * in regex, 0 or more characters.
_ works like . in regex, exactly 1 character.

Although it may seem that the % wildcard matches anything, there is one exception, NULL . Not even the clause WHERE prod_name LIKE ‘%’ will match a row with the value NULL as the product name.

# Using Variables

To create a user-defined variable, you use the format @variable_name, where the variable_name consists of alphanumeric characters. The maximum length of the user-defined variable is 64 characters as of MySQL 5.7.5

The user-defined variables are not case-sensitive. It means that the @id and @ID are the same.

You can assign the user-defined variable to a certain data types such as integer, floating point, decimal, string or NULL.

There are two ways to assign values to variable:
1. `SET variable := value`
1. `SELECT variable := value`

[HR Finding Median](https://www.hackerrank.com/challenges/weather-observation-station-20)

# IF/ELSE

It's like ternary operator:

`IF( conditional, truthy, falsy ) AS col`

[HR Problem](https://www.hackerrank.com/challenges/the-report?h_r=next-challenge&h_v=zen)
