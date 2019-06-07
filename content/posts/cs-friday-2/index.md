---
title: CS Friday 1 - SQL Intro
date: 2019-05-31
published: false
tags: ['cs friday', 'sql']
canonical_url: false
description: 'Weekly computer science inspired tips for Instagram'
---

Over the last several months I've posted random snippets of code on my [Instagram page](https://instagram.com/_gritts_)([like this one for R](https://www.instagram.com/p/BuW8ernBb9C/), [or this one for JavaScript](https://www.instagram.com/p/Bh7u4SjF19G/), [or this one about first class functions](https://www.instagram.com/p/BhzimtCFG-8/)). I'm not sharing the actual snippets of code I'm working on, rather simplified versions that make the code easier to explain. It is a fun distraction from work to think about the best ways to describe some interesting concepts. I don't have many follows that are coders, but I do have a few. 

Sometimes it is impossible to summarize everything that needs to be explained in an Instagram post. So I've decided to include them here as well. Hopefully with more thorough explanations. 

## Learn SQL

I have a BS in Wildlife Ecology and Conservation. While I was in school I learned about data collection and statistics, but I never learned how to best manage that data. When I began working at NDOW I soon learned about SQL. It changed *everything*. SQL is by far one of my favorite languages to write. So, let's get started.

We will create a simple database of researchers and their research. There will be two tables, one for details about each researcher, and the second for details of their different research interests.

The best place to practice this code is on [sqlfiddle.com](sqlfiddle.com). Be sure to change the database engine to PostgreSQL 9.6.

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

The general pattern for a query is `SELECT columns FROM table name WHERE criteria`. It all kinda makes sense, even without knowing much about SQL: select first name and last name from the researchers table where the first name is Gritts. It's almost a complete sentence. Of course it does get more powerful from there!

## Relationships

Relationships are the real power behind SQL databases. They allow us to create tables of related data without the need to duplicate data. Avoiding duplicate data in this way is called data normalization. That is beyond the scope of this post. Below let's create another table that will hold project data for the researchers in the researcher table.

```sql
-- create projects table
CREATE TABLE projects (
  id serial PRIMARY KEY,
  project_name text NOT NULL,
  project_description text,
  project_start_date date
);

-- insert data into projects table
INSERT INTO projects (
  project_name, project_description, project_start_date
)
VALUES
```