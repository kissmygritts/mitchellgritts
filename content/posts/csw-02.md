---
title: A Short Introduction to SQL
date: 2019-08-30
published: true
tags: ['cs friday', 'sql']
canonical_url: false
description: 'Weekly computer science inspired tips for Instagram'
--- 

## Learn SQL

I have a BS in Wildlife Ecology and Conservation. While in school I learned all about data collection and statistics, but never learned how to best manage that data. We used millions of different spreadsheets or CSVs (all postfixed with versions). Looking back, it was a terrible mess. When I began working I soon learned about SQL. It changed *everything*. SQL is by far one of my favorite languages to write. So, let's get started.

We will create a simple database of researchers and their research. There will be two tables, one for details about each researcher, and the second for details of their different research interests.

The best place to practice this code is on [sqlfiddle.com](sqlfiddle.com). Be sure to change the database engine to PostgreSQL 9.6.

## A Little Background

SQL stands for structured query language. It is the language used to access data from relational database management systems (RDBMS). The RDBMS does all the heavly lifting when it comes to data management. THen SQL is used to query, update, delete, etc... data in the RDBMS. 

## Create a Table

First things first, create and populate the researcher table.

``` sql
-- create researchers table
CREATE TABLE researchers (
  id serial PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL
);

-- insert some researchers into our new table
INSERT INTO researchers (
  first_name, last_name, email
)
VALUES
  ('Mitchell', 'Gritts', 'mgritts@email.com'),
  ('Nathan', 'Jackson', 'njackson@email.com'),
  ('Miranda', 'Crowell', 'mcrowell@email.com');
```

The `CREATE TABLE` command will create a new table, the general pattern is as follows, `CREATE TABLE table name (table columns);` Each column is listed in the following pattern `name type constraints`. Note, each SQL statement must end with a semi-colon (;).

Once the table is created, populate it with the `INSERT INTO` command. Here I'm specifying which columns in the researcher table I want to insert data into. Then specifying the values to be inserted. In this case three researchers.

## Query a Table

This simple example doesn't show the full power of SQL, but you'll get an idea of how SQL works.

``` sql
SELECT 
  first_name,
  last_name
FROM 
  researchers
WHERE first_name = 'Gritts';
```

The general pattern for a query is `SELECT columns FROM table name WHERE criteria`. It all kinda makes sense, even without knowing much about SQL: select first name and last name from the researchers table where the first name is Gritts. It's almost a complete sentence. 

There you have it, a very simple introduction to SQL databases. Stay tuned for additional posts about SQL. In the meantime check out any of these resources for a more thurough introduction to SQL.