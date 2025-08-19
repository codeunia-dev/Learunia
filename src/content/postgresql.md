# PostgreSQL Cheatsheet

## Getting Started

### Installation
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS (Homebrew)
brew install postgresql

# Start PostgreSQL service
sudo systemctl start postgresql    # Linux
brew services start postgresql     # macOS

# Connect to PostgreSQL
sudo -u postgres psql              # Linux
psql postgres                      # macOS

# Create user and database
sudo -u postgres createuser --interactive
sudo -u postgres createdb mydatabase
```

### psql Commands
```sql
-- Connect to database
\c database_name

-- List databases
\l

-- List tables
\dt

-- Describe table
\d table_name

-- List users
\du

-- Show current user
SELECT current_user;

-- Show current database
SELECT current_database();

-- Execute SQL file
\i /path/to/file.sql

-- Quit psql
\q

-- Help
\?
```

### Connection String
```bash
# Format
postgresql://username:password@host:port/database

# Examples
postgresql://user:pass@localhost:5432/mydb
postgresql://postgres:secret@192.168.1.100:5432/production

# Environment variable
export DATABASE_URL="postgresql://user:pass@localhost:5432/mydb"
```

## Database Operations

### Create and Drop Database
```sql
-- Create database
CREATE DATABASE company_db;
CREATE DATABASE company_db WITH OWNER = myuser;

-- Create database with specific settings
CREATE DATABASE company_db
    WITH OWNER = myuser
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TEMPLATE = template0;

-- Drop database
DROP DATABASE company_db;
DROP DATABASE IF EXISTS company_db;

-- Rename database
ALTER DATABASE old_name RENAME TO new_name;

-- Change database owner
ALTER DATABASE company_db OWNER TO new_owner;
```

### Users and Permissions
```sql
-- Create user/role
CREATE USER john WITH PASSWORD 'secret123';
CREATE ROLE admin WITH LOGIN PASSWORD 'admin123';

-- Create user with specific privileges
CREATE USER developer WITH 
    LOGIN 
    PASSWORD 'dev123'
    CREATEDB
    CREATEROLE;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE company_db TO john;
GRANT CONNECT ON DATABASE company_db TO john;
GRANT USAGE ON SCHEMA public TO john;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO john;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO john;

-- Grant specific table privileges
GRANT SELECT, INSERT, UPDATE, DELETE ON employees TO john;
GRANT SELECT ON employees TO readonly_user;

-- Create role and assign to user
CREATE ROLE hr_role;
GRANT hr_role TO john;

-- Revoke privileges
REVOKE ALL PRIVILEGES ON DATABASE company_db FROM john;
REVOKE INSERT, UPDATE, DELETE ON employees FROM john;

-- Drop user
DROP USER john;
DROP ROLE IF EXISTS admin;

-- Change password
ALTER USER john PASSWORD 'newpassword';

-- List user privileges
\du
SELECT * FROM information_schema.role_table_grants WHERE grantee = 'john';
```

## Table Operations

### Create Tables
```sql
-- Basic table creation
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hire_date DATE DEFAULT CURRENT_DATE,
    salary DECIMAL(10,2),
    department_id INTEGER REFERENCES departments(id)
);

-- Table with constraints
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) CHECK (price > 0),
    category VARCHAR(50) DEFAULT 'General',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_name_category UNIQUE (name, category)
);

-- Table with foreign key
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    order_date DATE DEFAULT CURRENT_DATE,
    total_amount DECIMAL(10,2),
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Temporary table
CREATE TEMPORARY TABLE temp_data (
    id INTEGER,
    value TEXT
);

-- Table from query
CREATE TABLE high_earners AS
SELECT * FROM employees WHERE salary > 100000;

-- Create table like another
CREATE TABLE employees_backup (LIKE employees INCLUDING ALL);
```

### Alter Tables
```sql
-- Add column
ALTER TABLE employees ADD COLUMN phone VARCHAR(20);
ALTER TABLE employees ADD COLUMN age INTEGER DEFAULT 0;

-- Drop column
ALTER TABLE employees DROP COLUMN phone;
ALTER TABLE employees DROP COLUMN IF EXISTS age;

-- Modify column
ALTER TABLE employees ALTER COLUMN salary TYPE DECIMAL(12,2);
ALTER TABLE employees ALTER COLUMN salary SET NOT NULL;
ALTER TABLE employees ALTER COLUMN salary DROP NOT NULL;
ALTER TABLE employees ALTER COLUMN salary SET DEFAULT 50000;
ALTER TABLE employees ALTER COLUMN salary DROP DEFAULT;

-- Rename column
ALTER TABLE employees RENAME COLUMN first_name TO fname;

-- Rename table
ALTER TABLE employees RENAME TO staff;

-- Add constraint
ALTER TABLE employees ADD CONSTRAINT salary_check CHECK (salary > 0);
ALTER TABLE employees ADD CONSTRAINT fk_department 
    FOREIGN KEY (department_id) REFERENCES departments(id);

-- Drop constraint
ALTER TABLE employees DROP CONSTRAINT salary_check;
ALTER TABLE employees DROP CONSTRAINT IF EXISTS fk_department;

-- Add primary key
ALTER TABLE employees ADD PRIMARY KEY (id);

-- Add unique constraint
ALTER TABLE employees ADD CONSTRAINT unique_email UNIQUE (email);

-- Change table owner
ALTER TABLE employees OWNER TO new_owner;
```

### Drop Tables
```sql
-- Drop table
DROP TABLE employees;
DROP TABLE IF EXISTS employees;

-- Drop multiple tables
DROP TABLE employees, departments, orders;

-- Drop table with dependencies
DROP TABLE employees CASCADE;

-- Truncate table (faster than DELETE)
TRUNCATE TABLE employees;
TRUNCATE TABLE employees RESTART IDENTITY;
TRUNCATE TABLE employees CASCADE;
```

## Data Types

### Numeric Types
```sql
-- Integer types
SMALLINT        -- -32,768 to 32,767
INTEGER (INT)   -- -2,147,483,648 to 2,147,483,647
BIGINT          -- -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
SERIAL          -- Auto-incrementing integer (1 to 2,147,483,647)
BIGSERIAL       -- Auto-incrementing bigint

-- Decimal types
DECIMAL(precision, scale)
NUMERIC(precision, scale)
REAL            -- 6 decimal digits precision
DOUBLE PRECISION -- 15 decimal digits precision

-- Examples
CREATE TABLE numeric_examples (
    small_num SMALLINT,
    regular_num INTEGER,
    big_num BIGINT,
    auto_id SERIAL,
    price DECIMAL(10,2),
    percentage REAL,
    scientific DOUBLE PRECISION
);
```

### String Types
```sql
-- Character types
CHAR(n)         -- Fixed-length, padded with spaces
VARCHAR(n)      -- Variable-length with limit
TEXT            -- Variable unlimited length

-- Examples
CREATE TABLE string_examples (
    country_code CHAR(2),           -- Always 2 characters
    name VARCHAR(100),              -- Up to 100 characters
    description TEXT,               -- Unlimited length
    status VARCHAR(20) DEFAULT 'active'
);

-- String functions examples
SELECT 
    UPPER('hello') as uppercase,           -- HELLO
    LOWER('WORLD') as lowercase,           -- world
    LENGTH('PostgreSQL') as length,        -- 10
    SUBSTRING('PostgreSQL', 1, 4) as sub,  -- Post
    CONCAT('Hello', ' ', 'World') as concat, -- Hello World
    TRIM('  spaced  ') as trimmed,         -- spaced
    POSITION('SQL' IN 'PostgreSQL') as pos; -- 8
```

### Date and Time Types
```sql
-- Date/time types
DATE            -- Date only (YYYY-MM-DD)
TIME            -- Time only (HH:MM:SS)
TIMESTAMP       -- Date and time
TIMESTAMPTZ     -- Timestamp with timezone
INTERVAL        -- Time interval

-- Examples
CREATE TABLE datetime_examples (
    event_date DATE,
    event_time TIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    scheduled_at TIMESTAMPTZ,
    duration INTERVAL
);

-- Date/time functions
SELECT 
    CURRENT_DATE as today,
    CURRENT_TIME as now_time,
    CURRENT_TIMESTAMP as now_timestamp,
    NOW() as now_function,
    AGE('2023-01-01') as age_calc,
    EXTRACT(YEAR FROM NOW()) as year_part,
    DATE_TRUNC('month', NOW()) as month_start;

-- Date arithmetic
SELECT 
    NOW() + INTERVAL '1 day' as tomorrow,
    NOW() - INTERVAL '1 month' as last_month,
    DATE '2023-01-01' + INTEGER '7' as week_later;
```

### Boolean and Other Types
```sql
-- Boolean
CREATE TABLE boolean_example (
    id SERIAL PRIMARY KEY,
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN NOT NULL
);

-- Array types
CREATE TABLE array_example (
    id SERIAL PRIMARY KEY,
    tags TEXT[],
    scores INTEGER[],
    matrix INTEGER[][]
);

-- JSON types
CREATE TABLE json_example (
    id SERIAL PRIMARY KEY,
    data JSON,
    metadata JSONB  -- Binary JSON (recommended)
);

-- UUID type
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE uuid_example (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100)
);

-- Enum type
CREATE TYPE mood AS ENUM ('sad', 'ok', 'happy');
CREATE TABLE person (
    name TEXT,
    current_mood mood
);
```

## CRUD Operations

### INSERT
```sql
-- Basic insert
INSERT INTO employees (first_name, last_name, email, salary)
VALUES ('John', 'Doe', 'john.doe@email.com', 75000);

-- Multiple rows
INSERT INTO employees (first_name, last_name, email, salary) VALUES
    ('Jane', 'Smith', 'jane.smith@email.com', 80000),
    ('Bob', 'Johnson', 'bob.johnson@email.com', 70000),
    ('Alice', 'Williams', 'alice.williams@email.com', 85000);

-- Insert from another table
INSERT INTO employees_backup 
SELECT * FROM employees WHERE salary > 75000;

-- Insert with ON CONFLICT (PostgreSQL specific)
INSERT INTO employees (email, first_name, last_name, salary)
VALUES ('john.doe@email.com', 'John', 'Doe', 80000)
ON CONFLICT (email) DO UPDATE SET
    salary = EXCLUDED.salary,
    updated_at = CURRENT_TIMESTAMP;

-- Insert and return values
INSERT INTO employees (first_name, last_name, email, salary)
VALUES ('Charlie', 'Brown', 'charlie@email.com', 72000)
RETURNING id, first_name, last_name;

-- Insert with DEFAULT values
INSERT INTO employees (first_name, last_name, email)
VALUES ('Default', 'User', 'default@email.com');
```

### SELECT
```sql
-- Basic select
SELECT * FROM employees;
SELECT first_name, last_name, salary FROM employees;

-- Where clause
SELECT * FROM employees WHERE salary > 75000;
SELECT * FROM employees WHERE department = 'IT' AND salary BETWEEN 60000 AND 80000;
SELECT * FROM employees WHERE first_name IN ('John', 'Jane', 'Bob');
SELECT * FROM employees WHERE email LIKE '%@gmail.com';
SELECT * FROM employees WHERE hire_date >= '2023-01-01';

-- Ordering
SELECT * FROM employees ORDER BY salary DESC;
SELECT * FROM employees ORDER BY last_name, first_name;
SELECT * FROM employees ORDER BY salary DESC NULLS LAST;

-- Limiting results
SELECT * FROM employees LIMIT 10;
SELECT * FROM employees LIMIT 10 OFFSET 20;

-- Grouping and aggregation
SELECT department, COUNT(*) as employee_count, AVG(salary) as avg_salary
FROM employees
GROUP BY department
HAVING COUNT(*) > 5
ORDER BY avg_salary DESC;

-- Distinct values
SELECT DISTINCT department FROM employees;
SELECT DISTINCT department, location FROM employees;

-- Window functions
SELECT 
    first_name,
    last_name,
    salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) as salary_rank,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank,
    LAG(salary) OVER (ORDER BY hire_date) as previous_salary
FROM employees;

-- Common Table Expressions (CTE)
WITH high_earners AS (
    SELECT * FROM employees WHERE salary > 80000
),
departments_stats AS (
    SELECT department, COUNT(*) as count FROM high_earners GROUP BY department
)
SELECT * FROM departments_stats WHERE count > 2;

-- Recursive CTE
WITH RECURSIVE employee_hierarchy AS (
    -- Base case: top-level managers
    SELECT id, first_name, last_name, manager_id, 1 as level
    FROM employees
    WHERE manager_id IS NULL
    
    UNION
    
    -- Recursive case
    SELECT e.id, e.first_name, e.last_name, e.manager_id, eh.level + 1
    FROM employees e
    JOIN employee_hierarchy eh ON e.manager_id = eh.id
)
SELECT * FROM employee_hierarchy ORDER BY level, last_name;
```

### JOIN Operations
```sql
-- Inner Join
SELECT e.first_name, e.last_name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;

-- Left Join
SELECT e.first_name, e.last_name, d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;

-- Right Join
SELECT e.first_name, e.last_name, d.department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;

-- Full Outer Join
SELECT e.first_name, e.last_name, d.department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.id;

-- Self Join
SELECT e1.first_name as employee, e2.first_name as manager
FROM employees e1
LEFT JOIN employees e2 ON e1.manager_id = e2.id;

-- Multiple Joins
SELECT 
    e.first_name,
    e.last_name,
    d.department_name,
    l.city,
    l.country
FROM employees e
JOIN departments d ON e.department_id = d.id
JOIN locations l ON d.location_id = l.id;

-- Cross Join
SELECT e.first_name, p.project_name
FROM employees e
CROSS JOIN projects p;
```

### UPDATE
```sql
-- Basic update
UPDATE employees SET salary = 80000 WHERE id = 1;

-- Update multiple columns
UPDATE employees 
SET salary = salary * 1.1, 
    updated_at = CURRENT_TIMESTAMP 
WHERE department = 'IT';

-- Update with subquery
UPDATE employees 
SET salary = (
    SELECT AVG(salary) * 1.1 
    FROM employees e2 
    WHERE e2.department = employees.department
)
WHERE performance_rating = 'Excellent';

-- Update from another table
UPDATE employees 
SET salary = salary_adjustments.new_salary
FROM salary_adjustments
WHERE employees.id = salary_adjustments.employee_id;

-- Update and return
UPDATE employees 
SET salary = salary * 1.05 
WHERE department = 'Sales'
RETURNING id, first_name, last_name, salary;

-- Conditional update
UPDATE employees 
SET bonus = CASE 
    WHEN salary > 100000 THEN salary * 0.1
    WHEN salary > 75000 THEN salary * 0.05
    ELSE 1000
END;
```

### DELETE
```sql
-- Basic delete
DELETE FROM employees WHERE id = 1;

-- Delete with condition
DELETE FROM employees WHERE salary < 50000;
DELETE FROM employees WHERE hire_date < '2020-01-01';

-- Delete with subquery
DELETE FROM employees 
WHERE department_id IN (
    SELECT id FROM departments WHERE budget < 100000
);

-- Delete from multiple tables (using JOIN)
DELETE e1 FROM employees e1
JOIN employees e2 ON e1.email = e2.email AND e1.id > e2.id;

-- Delete and return
DELETE FROM employees 
WHERE department = 'Marketing'
RETURNING id, first_name, last_name;

-- Truncate (faster for large tables)
TRUNCATE TABLE employees;
TRUNCATE TABLE employees RESTART IDENTITY CASCADE;
```

## Advanced Features

### Indexes
```sql
-- Create index
CREATE INDEX idx_employees_email ON employees (email);
CREATE INDEX idx_employees_salary ON employees (salary);
CREATE INDEX idx_employees_name ON employees (last_name, first_name);

-- Unique index
CREATE UNIQUE INDEX idx_employees_email_unique ON employees (email);

-- Partial index
CREATE INDEX idx_active_employees ON employees (last_name) 
WHERE status = 'active';

-- Expression index
CREATE INDEX idx_employees_lower_email ON employees (LOWER(email));

-- Full-text search index
CREATE INDEX idx_products_search ON products 
USING gin(to_tsvector('english', name || ' ' || description));

-- List indexes
\di
SELECT * FROM pg_indexes WHERE tablename = 'employees';

-- Drop index
DROP INDEX idx_employees_email;
DROP INDEX IF EXISTS idx_employees_salary;

-- Reindex
REINDEX INDEX idx_employees_email;
REINDEX TABLE employees;
```

### Views
```sql
-- Create view
CREATE VIEW employee_summary AS
SELECT 
    e.id,
    e.first_name || ' ' || e.last_name as full_name,
    e.email,
    d.department_name,
    e.salary
FROM employees e
JOIN departments d ON e.department_id = d.id;

-- Materialized view
CREATE MATERIALIZED VIEW department_stats AS
SELECT 
    d.department_name,
    COUNT(e.id) as employee_count,
    AVG(e.salary) as avg_salary,
    MIN(e.salary) as min_salary,
    MAX(e.salary) as max_salary
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
GROUP BY d.id, d.department_name;

-- Refresh materialized view
REFRESH MATERIALIZED VIEW department_stats;

-- Updatable view
CREATE VIEW high_earners AS
SELECT * FROM employees WHERE salary > 80000
WITH CHECK OPTION;

-- Drop view
DROP VIEW employee_summary;
DROP MATERIALIZED VIEW department_stats;
```

### Functions
```sql
-- Simple function
CREATE OR REPLACE FUNCTION get_employee_count()
RETURNS INTEGER AS $$
BEGIN
    RETURN (SELECT COUNT(*) FROM employees);
END;
$$ LANGUAGE plpgsql;

-- Function with parameters
CREATE OR REPLACE FUNCTION get_employees_by_department(dept_name TEXT)
RETURNS TABLE(id INTEGER, full_name TEXT, salary DECIMAL) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        e.id,
        e.first_name || ' ' || e.last_name,
        e.salary
    FROM employees e
    JOIN departments d ON e.department_id = d.id
    WHERE d.department_name = dept_name;
END;
$$ LANGUAGE plpgsql;

-- Function with default parameters
CREATE OR REPLACE FUNCTION calculate_bonus(
    base_salary DECIMAL,
    performance_rating TEXT DEFAULT 'average'
)
RETURNS DECIMAL AS $$
BEGIN
    CASE performance_rating
        WHEN 'excellent' THEN RETURN base_salary * 0.15;
        WHEN 'good' THEN RETURN base_salary * 0.10;
        WHEN 'average' THEN RETURN base_salary * 0.05;
        ELSE RETURN 0;
    END CASE;
END;
$$ LANGUAGE plpgsql;

-- Call functions
SELECT get_employee_count();
SELECT * FROM get_employees_by_department('IT');
SELECT calculate_bonus(75000, 'excellent');

-- Drop function
DROP FUNCTION get_employee_count();
```

### Triggers
```sql
-- Create trigger function
CREATE OR REPLACE FUNCTION update_modified_time()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER employees_update_trigger
    BEFORE UPDATE ON employees
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_time();

-- Audit trigger
CREATE TABLE employee_audit (
    audit_id SERIAL PRIMARY KEY,
    employee_id INTEGER,
    action TEXT,
    old_values JSONB,
    new_values JSONB,
    changed_by TEXT DEFAULT current_user,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION employee_audit_trigger()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO employee_audit (employee_id, action, new_values)
        VALUES (NEW.id, 'INSERT', row_to_json(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO employee_audit (employee_id, action, old_values, new_values)
        VALUES (NEW.id, 'UPDATE', row_to_json(OLD), row_to_json(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO employee_audit (employee_id, action, old_values)
        VALUES (OLD.id, 'DELETE', row_to_json(OLD));
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER employee_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON employees
    FOR EACH ROW
    EXECUTE FUNCTION employee_audit_trigger();

-- Drop trigger
DROP TRIGGER employees_update_trigger ON employees;
```

### Transactions
```sql
-- Basic transaction
BEGIN;
UPDATE employees SET salary = salary * 1.1 WHERE department = 'IT';
UPDATE departments SET budget = budget * 1.1 WHERE name = 'IT';
COMMIT;

-- Transaction with rollback
BEGIN;
UPDATE employees SET salary = salary * 2;
-- Oops, that's too much!
ROLLBACK;

-- Savepoints
BEGIN;
UPDATE employees SET salary = salary * 1.05;
SAVEPOINT before_bonus;
UPDATE employees SET bonus = salary * 0.1;
-- Decide we don't want the bonus
ROLLBACK TO before_bonus;
COMMIT;

-- Transaction isolation levels
BEGIN ISOLATION LEVEL READ COMMITTED;
-- Your queries here
COMMIT;

BEGIN ISOLATION LEVEL REPEATABLE READ;
-- Your queries here
COMMIT;

BEGIN ISOLATION LEVEL SERIALIZABLE;
-- Your queries here
COMMIT;
```

## JSON Operations

### JSON and JSONB
```sql
-- Create table with JSON columns
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    attributes JSON,
    metadata JSONB
);

-- Insert JSON data
INSERT INTO products (name, attributes, metadata) VALUES
('Laptop', '{"brand": "Dell", "ram": "16GB", "storage": "512GB SSD"}', 
 '{"category": "electronics", "tags": ["computer", "portable"], "price": 999.99}'),
('Phone', '{"brand": "Apple", "model": "iPhone 14", "storage": "128GB"}',
 '{"category": "electronics", "tags": ["mobile", "smartphone"], "price": 799.99}');

-- Query JSON data
SELECT name, attributes->>'brand' as brand FROM products;
SELECT name, attributes->'ram' as ram FROM products;
SELECT * FROM products WHERE attributes->>'brand' = 'Dell';

-- JSONB operations
SELECT * FROM products WHERE metadata @> '{"category": "electronics"}';
SELECT * FROM products WHERE metadata ? 'price';
SELECT * FROM products WHERE metadata->'tags' ? 'computer';

-- JSON functions
SELECT 
    name,
    json_extract_path_text(attributes, 'brand') as brand,
    jsonb_extract_path(metadata, 'price') as price,
    jsonb_array_length(metadata->'tags') as tag_count
FROM products;

-- Update JSON
UPDATE products 
SET metadata = metadata || '{"on_sale": true}'
WHERE metadata->>'category' = 'electronics';

UPDATE products 
SET metadata = jsonb_set(metadata, '{price}', '899.99')
WHERE name = 'Laptop';

-- Remove JSON key
UPDATE products 
SET metadata = metadata - 'on_sale'
WHERE name = 'Phone';

-- JSON aggregation
SELECT 
    metadata->>'category' as category,
    json_agg(name) as products,
    avg((metadata->>'price')::numeric) as avg_price
FROM products
GROUP BY metadata->>'category';
```

### Arrays
```sql
-- Create table with arrays
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    tags TEXT[],
    ratings INTEGER[]
);

-- Insert array data
INSERT INTO posts (title, tags, ratings) VALUES
('PostgreSQL Tutorial', ARRAY['database', 'sql', 'postgresql'], ARRAY[5, 4, 5, 4]),
('Web Development', ARRAY['html', 'css', 'javascript'], ARRAY[4, 5, 3, 4]);

-- Query arrays
SELECT * FROM posts WHERE 'postgresql' = ANY(tags);
SELECT * FROM posts WHERE tags @> ARRAY['database'];
SELECT * FROM posts WHERE array_length(tags, 1) > 2;

-- Array functions
SELECT 
    title,
    array_length(tags, 1) as tag_count,
    array_to_string(tags, ', ') as tag_list,
    array_agg(ratings) as all_ratings,
    (SELECT avg(r) FROM unnest(ratings) as r) as avg_rating
FROM posts
GROUP BY id, title, tags, ratings;

-- Update arrays
UPDATE posts 
SET tags = array_append(tags, 'tutorial')
WHERE title LIKE '%Tutorial%';

UPDATE posts 
SET tags = array_remove(tags, 'css')
WHERE 'css' = ANY(tags);
```

## Performance and Optimization

### Query Optimization
```sql
-- Explain query plans
EXPLAIN SELECT * FROM employees WHERE salary > 75000;
EXPLAIN ANALYZE SELECT * FROM employees WHERE salary > 75000;
EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM employees WHERE salary > 75000;

-- Index usage
EXPLAIN SELECT * FROM employees WHERE email = 'john@email.com';

-- Join optimization
EXPLAIN ANALYZE
SELECT e.first_name, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE e.salary > 75000;

-- Subquery vs JOIN
-- Subquery
EXPLAIN ANALYZE
SELECT * FROM employees 
WHERE department_id IN (SELECT id FROM departments WHERE budget > 100000);

-- JOIN (often faster)
EXPLAIN ANALYZE
SELECT e.* FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE d.budget > 100000;
```

### Statistics and Vacuum
```sql
-- Update table statistics
ANALYZE employees;
ANALYZE;  -- All tables

-- Vacuum (reclaim space and update statistics)
VACUUM employees;
VACUUM ANALYZE employees;
VACUUM FULL employees;  -- More aggressive, locks table

-- Auto-vacuum settings
SHOW autovacuum;
SHOW autovacuum_naptime;

-- View table statistics
SELECT 
    schemaname,
    tablename,
    n_tup_ins,
    n_tup_upd,
    n_tup_del,
    last_vacuum,
    last_autovacuum,
    last_analyze
FROM pg_stat_user_tables;
```

### Configuration and Monitoring
```sql
-- View current settings
SHOW all;
SHOW shared_buffers;
SHOW work_mem;
SHOW maintenance_work_mem;

-- Session-level settings
SET work_mem = '256MB';
SET enable_seqscan = off;

-- View active connections
SELECT 
    pid,
    usename,
    application_name,
    client_addr,
    state,
    query_start,
    query
FROM pg_stat_activity
WHERE state = 'active';

-- Kill connection
SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE pid = 12345;

-- Database size
SELECT 
    datname,
    pg_size_pretty(pg_database_size(datname)) as size
FROM pg_database;

-- Table sizes
SELECT 
    tablename,
    pg_size_pretty(pg_total_relation_size(tablename::regclass)) as size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(tablename::regclass) DESC;

-- Index usage
SELECT 
    indexrelname,
    idx_tup_read,
    idx_tup_fetch,
    idx_scan
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;
```

## Backup and Recovery

### pg_dump and pg_restore
```bash
# Backup single database
pg_dump -h localhost -U username -d database_name > backup.sql
pg_dump -h localhost -U username -d database_name -f backup.sql

# Backup with custom format (recommended)
pg_dump -h localhost -U username -d database_name -Fc > backup.dump

# Backup specific tables
pg_dump -h localhost -U username -d database_name -t employees -t departments > tables_backup.sql

# Backup with compression
pg_dump -h localhost -U username -d database_name | gzip > backup.sql.gz

# Backup all databases
pg_dumpall -h localhost -U username > all_databases.sql

# Restore from SQL file
psql -h localhost -U username -d database_name < backup.sql

# Restore from custom format
pg_restore -h localhost -U username -d database_name backup.dump

# Restore specific tables
pg_restore -h localhost -U username -d database_name -t employees backup.dump

# Restore with verbose output
pg_restore -h localhost -U username -d database_name -v backup.dump

# Restore and drop existing objects first
pg_restore -h localhost -U username -d database_name -c backup.dump
```

### Point-in-Time Recovery
```bash
# Enable WAL archiving in postgresql.conf
archive_mode = on
archive_command = 'cp %p /path/to/archive/%f'
wal_level = replica

# Create base backup
pg_basebackup -h localhost -U username -D /path/to/backup -Ft -z -P

# Recovery configuration in recovery.conf (PostgreSQL < 12)
restore_command = 'cp /path/to/archive/%f %p'
recovery_target_time = '2023-12-01 14:30:00'

# Recovery configuration in postgresql.conf (PostgreSQL 12+)
restore_command = 'cp /path/to/archive/%f %p'
recovery_target_time = '2023-12-01 14:30:00'
```

## Best Practices

### Performance Tips
1. **Use appropriate indexes** for frequently queried columns
2. **Analyze query plans** with EXPLAIN ANALYZE
3. **Use LIMIT** when you don't need all results
4. **Prefer EXISTS over IN** for large subqueries
5. **Use connection pooling** (PgBouncer, pgpool-II)
6. **Regular VACUUM and ANALYZE** for table maintenance
7. **Partition large tables** for better performance
8. **Use appropriate data types** (don't use TEXT for everything)
9. **Normalize data** but consider denormalization for read-heavy workloads
10. **Monitor slow queries** and optimize them

### Security Best Practices
1. **Use strong passwords** and regular rotation
2. **Limit user privileges** to minimum required
3. **Use SSL/TLS** for connections
4. **Regular security updates** for PostgreSQL
5. **Audit database access** and monitor logs
6. **Use parameterized queries** to prevent SQL injection
7. **Backup encryption** for sensitive data
8. **Network security** with firewalls and VPNs
9. **Regular security assessments**
10. **Follow principle of least privilege**
