---
title: "Full text search in PostgreSQL"
date: 2020-06-27
published: true
topic: 'postgres'
stage: seedling
---

A `document` is the unit to be searched in full text search. The search must be able to parse documents and store associations of lexemes (key words) with their parent document. 

*This example is very specific to the data in my database. Maybe I'll get around to creating a better example soon.*

## Create a document

```sql
SELECT
  concat_ws(
    ' ',
    coalesce(water_name, ''), 
    coalesce(region, ''),
    coalesce(county, '')
  ) as document
FROM fishable_waters
LIMIT 5
```

