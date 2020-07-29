---
title: Format SQL Output as JSON
date: 2019-09-06
published: true
category: SQL
tags: ['cs friday', 'sql']
canonical_url: false
description: 'Weekly computer science inspired tips for Instagram, #3'
--- 

I often need to export JSON data from my postgres database, and just as often I forget how to do it.

## Setup

Let's start by creating an simple table and seed it with some data. You can do this at [DB Fiddle](https://www.db-fiddle.com/), a database playground. Be sure to select the PostgreSQL 10.0 database engine. Copy and paste the following into the Schema SQL container.

```sql
CREATE TABLE species (
  common_name text,
  species_name text
);

INSERT INTO species
VALUES
  ('mountain goat', 'Oreamnos americanus'),
  ('mule deer', 'Odocoileus hemionus'),
  ('pronghorn antelope', 'Antilocapra americana');
```

## JSON Query

The following query will create a valid JSON object in DB Fiddle. `json_agg()` takes an expression and aggregates the values as a JSON array ([docs](https://www.postgresql.org/docs/9.5/functions-aggregate.html)).

```sql
SELECT json_agg(d)
FROM (
  SELECT
    common_name,
    species_name
  FROM species
) AS d;
```

If you are running this outside of DB Fiddle, your result will return something that looks like this.

```bash
                                   json_agg                                    
-------------------------------------------------------------------------------
 [{"common_name":"mountain goat","species_name":"Oreamnos americanus"},       +
  {"common_name":"mule deer","species_name":"Odocoileus hemionus"},           +
  {"common_name":"pronghorn antelope","species_name":"Antilocapra americana"}]
(1 row)
```

Which isn't valid JSON. This is due to some default settings that postgres uses to make table results look nice. Let's adjust how postgres formats results, then rerun the query.

```sql
\t
\a

SELECT json_agg(d)
FROM (
  SELECT
    common_name,
    species_name
  FROM species
  WHERE species_group = 'ungulate'
  offset 4 limit 3 
) AS d;
```

* `\t` toggles tupples on or off for the output
* `\a` toggles the alignment of the output

This will return the following (which is a valid JSON)

```json
[{"common_name":"mountain goat","species_name":"Oreamnos americanus"}, 
 {"common_name":"mule deer","species_name":"Odocoileus hemionus"}, 
 {"common_name":"pronghorn antelope","species_name":"Antilocapra americana"}]
```

Now, to export (again, outside of DB Fiddle. This only works when using your own database) this we will use the `\g` psql metacommand. Remember that the `\t` and `\a` toggles the output display. If you've already run those command you won't need to do it again. If you haven't run them, you will need to run them. In full, the following commands will export JSON to a file. Change the value of `<filepath>` to the path you want to export the JSON. For me, that looks like `/Users/mitchellgritts/Documents/output.json`.

```sql
\t
\a

SELECT json_agg(d)
FROM (
  SELECT
    common_name,
    species_name
  FROM species
) AS d

\g '<filepath>'
```

`\g` acts as the end of the query, so you don't include a semi-colon here. Check you file to make sure it completed export. You can check to make sure it is valid JSON by copying the contents of this file and pasting them in [JSONLint](https://jsonlint.com/). You should see a green box with Valid JSON near the bottom of the window. 

## Install Postgres Locally

If you want to play around with postgres locally,

* MacOS - download the [postgres.app](https://postgresapp.com) application. The easiest way to get started with PostgreSQL on a Mac
* Windows - download the [Windows installers](https://www.postgresql.org/download/windows/). Your mileage may vary. Most importantly, make sure you have access to the command line tool `psql`. Sorry I can't be more help. I don't use postgres on a Windows machine.
* Linux - you'll figure it out