# SQL Cheatsheet

## Basic Commands

### SELECT Statement

```sql
-- Basic SELECT
SELECT column1, column2 FROM table_name;

-- Select all columns
SELECT * FROM table_name;

-- Select with alias
SELECT column1 AS alias1, column2 AS alias2 FROM table_name;

-- Select distinct values
SELECT DISTINCT column1 FROM table_name;

-- Select with limit
SELECT * FROM table_name LIMIT 10;
SELECT * FROM table_name LIMIT 10 OFFSET 20;
```

### WHERE Clause

```sql
-- Basic WHERE
SELECT * FROM table_name WHERE column1 = 'value';

-- Multiple conditions
SELECT * FROM table_name 
WHERE column1 = 'value' AND column2 > 100;

-- OR condition
SELECT * FROM table_name 
WHERE column1 = 'value' OR column2 = 'value2';

-- NOT condition
SELECT * FROM table_name WHERE NOT column1 = 'value';

-- IN operator
SELECT * FROM table_name WHERE column1 IN ('value1', 'value2', 'value3');

-- BETWEEN operator
SELECT * FROM table_name WHERE column1 BETWEEN 10 AND 100;

-- LIKE operator
SELECT * FROM table_name WHERE column1 LIKE 'pattern%';
SELECT * FROM table_name WHERE column1 LIKE '%pattern%';
SELECT * FROM table_name WHERE column1 LIKE '_pattern%';
```

### ORDER BY

```sql
-- Basic ORDER BY
SELECT * FROM table_name ORDER BY column1;

-- Multiple columns
SELECT * FROM table_name ORDER BY column1 ASC, column2 DESC;

-- Ascending (default)
SELECT * FROM table_name ORDER BY column1 ASC;

-- Descending
SELECT * FROM table_name ORDER BY column1 DESC;
```

## Joins

### INNER JOIN

```sql
-- Basic INNER JOIN
SELECT table1.column1, table2.column2
FROM table1
INNER JOIN table2 ON table1.id = table2.table1_id;

-- Multiple table JOIN
SELECT t1.column1, t2.column2, t3.column3
FROM table1 t1
INNER JOIN table2 t2 ON t1.id = t2.table1_id
INNER JOIN table3 t3 ON t2.id = t3.table2_id;
```

### LEFT JOIN

```sql
-- LEFT JOIN (keeps all from left table)
SELECT table1.column1, table2.column2
FROM table1
LEFT JOIN table2 ON table1.id = table2.table1_id;
```

### RIGHT JOIN

```sql
-- RIGHT JOIN (keeps all from right table)
SELECT table1.column1, table2.column2
FROM table1
RIGHT JOIN table2 ON table1.id = table2.table1_id;
```

### FULL OUTER JOIN

```sql
-- FULL OUTER JOIN (keeps all from both tables)
SELECT table1.column1, table2.column2
FROM table1
FULL OUTER JOIN table2 ON table1.id = table2.table1_id;
```

### CROSS JOIN

```sql
-- CROSS JOIN (Cartesian product)
SELECT table1.column1, table2.column2
FROM table1
CROSS JOIN table2;
```

## Aggregation Functions

```sql
-- COUNT
SELECT COUNT(*) FROM table_name;
SELECT COUNT(column1) FROM table_name;
SELECT COUNT(DISTINCT column1) FROM table_name;

-- SUM
SELECT SUM(column1) FROM table_name;

-- AVG
SELECT AVG(column1) FROM table_name;

-- MIN and MAX
SELECT MIN(column1), MAX(column1) FROM table_name;

-- GROUP BY
SELECT column1, COUNT(*) as count
FROM table_name
GROUP BY column1;

-- HAVING (filter after GROUP BY)
SELECT column1, COUNT(*) as count
FROM table_name
GROUP BY column1
HAVING COUNT(*) > 5;
```

## Subqueries

### Basic Subqueries

```sql
-- Subquery in WHERE clause
SELECT * FROM table1 
WHERE column1 IN (SELECT column1 FROM table2 WHERE condition);

-- Subquery in SELECT clause
SELECT column1, (SELECT MAX(column2) FROM table2) as max_value
FROM table1;

-- Subquery in FROM clause
SELECT * FROM (
    SELECT column1, column2 FROM table1 WHERE condition
) AS subquery;
```

### EXISTS

```sql
-- EXISTS operator
SELECT * FROM table1 
WHERE EXISTS (SELECT 1 FROM table2 WHERE table2.id = table1.id);

-- NOT EXISTS
SELECT * FROM table1 
WHERE NOT EXISTS (SELECT 1 FROM table2 WHERE table2.id = table1.id);
```

## Data Manipulation

### INSERT

```sql
-- Insert single row
INSERT INTO table_name (column1, column2) VALUES ('value1', 'value2');

-- Insert multiple rows
INSERT INTO table_name (column1, column2) VALUES 
    ('value1', 'value2'),
    ('value3', 'value4'),
    ('value5', 'value6');

-- Insert from another table
INSERT INTO table1 (column1, column2)
SELECT column1, column2 FROM table2 WHERE condition;
```

### UPDATE

```sql
-- Basic UPDATE
UPDATE table_name SET column1 = 'new_value' WHERE condition;

-- Update multiple columns
UPDATE table_name 
SET column1 = 'new_value1', column2 = 'new_value2' 
WHERE condition;

-- Update with subquery
UPDATE table1 
SET column1 = (SELECT column1 FROM table2 WHERE table2.id = table1.id)
WHERE condition;
```

### DELETE

```sql
-- Basic DELETE
DELETE FROM table_name WHERE condition;

-- Delete all rows
DELETE FROM table_name;

-- Delete with subquery
DELETE FROM table1 
WHERE column1 IN (SELECT column1 FROM table2 WHERE condition);
```

## Table Operations

### CREATE TABLE

```sql
-- Basic CREATE TABLE
CREATE TABLE table_name (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- With constraints
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    age INT CHECK (age >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### ALTER TABLE

```sql
-- Add column
ALTER TABLE table_name ADD COLUMN column_name VARCHAR(100);

-- Modify column
ALTER TABLE table_name MODIFY COLUMN column_name VARCHAR(200);

-- Drop column
ALTER TABLE table_name DROP COLUMN column_name;

-- Add constraint
ALTER TABLE table_name ADD CONSTRAINT constraint_name UNIQUE (column1);

-- Drop constraint
ALTER TABLE table_name DROP CONSTRAINT constraint_name;
```

### DROP TABLE

```sql
-- Drop table
DROP TABLE table_name;

-- Drop if exists
DROP TABLE IF EXISTS table_name;
```

## Indexes

```sql
-- Create index
CREATE INDEX index_name ON table_name (column1);

-- Create unique index
CREATE UNIQUE INDEX index_name ON table_name (column1);

-- Create composite index
CREATE INDEX index_name ON table_name (column1, column2);

-- Drop index
DROP INDEX index_name ON table_name;
```

## Views

```sql
-- Create view
CREATE VIEW view_name AS
SELECT column1, column2 FROM table_name WHERE condition;

-- Create or replace view
CREATE OR REPLACE VIEW view_name AS
SELECT column1, column2 FROM table_name WHERE condition;

-- Drop view
DROP VIEW view_name;
```

## Common Functions

### String Functions

```sql
-- CONCAT
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM users;

-- UPPER and LOWER
SELECT UPPER(name) as upper_name, LOWER(name) as lower_name FROM users;

-- LENGTH
SELECT name, LENGTH(name) as name_length FROM users;

-- SUBSTRING
SELECT SUBSTRING(name, 1, 3) as name_start FROM users;

-- TRIM
SELECT TRIM('  hello  ') as trimmed_string;
```

### Date Functions

```sql
-- Current date/time
SELECT NOW(), CURRENT_DATE, CURRENT_TIME;

-- Date arithmetic
SELECT DATE_ADD(date_column, INTERVAL 1 DAY) as tomorrow;
SELECT DATE_SUB(date_column, INTERVAL 1 MONTH) as last_month;

-- Date formatting
SELECT DATE_FORMAT(date_column, '%Y-%m-%d') as formatted_date;

-- Date extraction
SELECT YEAR(date_column), MONTH(date_column), DAY(date_column) FROM table_name;
```

### Numeric Functions

```sql
-- ROUND
SELECT ROUND(3.14159, 2) as rounded; -- 3.14

-- CEIL and FLOOR
SELECT CEIL(3.7) as ceiling, FLOOR(3.7) as floor;

-- ABS
SELECT ABS(-15) as absolute; -- 15

-- MOD (remainder)
SELECT MOD(10, 3) as remainder; -- 1
```

## Advanced Queries

### Window Functions

```sql
-- ROW_NUMBER
SELECT column1, column2,
       ROW_NUMBER() OVER (ORDER BY column2 DESC) as row_num
FROM table_name;

-- RANK
SELECT column1, column2,
       RANK() OVER (ORDER BY column2 DESC) as rank_num
FROM table_name;

-- LAG and LEAD
SELECT column1, column2,
       LAG(column2) OVER (ORDER BY column1) as prev_value,
       LEAD(column2) OVER (ORDER BY column1) as next_value
FROM table_name;
```

### Common Table Expressions (CTE)

```sql
-- Basic CTE
WITH cte_name AS (
    SELECT column1, column2 FROM table1 WHERE condition
)
SELECT * FROM cte_name;

-- Recursive CTE
WITH RECURSIVE cte_name AS (
    -- Base case
    SELECT id, name, parent_id, 1 as level
    FROM table_name WHERE parent_id IS NULL
    
    UNION ALL
    
    -- Recursive case
    SELECT t.id, t.name, t.parent_id, c.level + 1
    FROM table_name t
    JOIN cte_name c ON t.parent_id = c.id
)
SELECT * FROM cte_name;
```

## Best Practices

### Performance

```sql
-- Use specific columns instead of *
SELECT id, name, email FROM users; -- Good
SELECT * FROM users; -- Avoid

-- Use LIMIT for large datasets
SELECT * FROM large_table LIMIT 1000;

-- Use appropriate indexes
CREATE INDEX idx_email ON users(email);

-- Avoid SELECT DISTINCT when possible
SELECT column1 FROM table1 GROUP BY column1; -- Often better than DISTINCT
```

### Security

```sql
-- Use parameterized queries (prevent SQL injection)
-- In application code:
-- "SELECT * FROM users WHERE id = ?" with parameter binding

-- Limit user permissions
GRANT SELECT, INSERT ON database_name.* TO 'username'@'localhost';

-- Use prepared statements
PREPARE stmt FROM 'SELECT * FROM users WHERE id = ?';
EXECUTE stmt USING @user_id;
DEALLOCATE PREPARE stmt;
```

### Readability

```sql
-- Use meaningful aliases
SELECT u.id, u.name, p.title as post_title
FROM users u
JOIN posts p ON u.id = p.user_id;

-- Format queries clearly
SELECT 
    u.id,
    u.name,
    COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
WHERE u.active = 1
GROUP BY u.id, u.name
HAVING post_count > 0
ORDER BY post_count DESC;
```
