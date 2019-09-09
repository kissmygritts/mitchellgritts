---
title: 'Weeknotes #2'
date: 2019-09-08
published: true
tags: ['weeknotes']
canonical_url: true
description: 'A summary of the things I do, read, listen to over the week'
---

## Notes from the week

### gql-gus

I think I've finally figured out my pg-promise repository composition propblem. I'm letting the repo deal with all the database communication. The repo will run the queries, and gather results. The queries from the repos are called from the services layer. The services layer will take care of any validation, authentication (maybe that'll be moved to middleware eventually), transaction orchestration, etc. It seems a little clunky right now. But not having all the queries dynamically generated based on the pg-promise ColumnSet is great. And if I need to add additional functionality to the repo I can easily extend it.

`npm audit fix` to fix security alerts in `package.json`. No, not in `package-lock.json`. I'll need to look into this later. Right now this security alert is in a few packages in devDependencies `eslint-utils`.

I keep putting it of, but I need to get work on adding tests... so much failure (update the test database and all will be fixed!). And now I've gotten around to fixing the testing. I'm starting from, almost, scratch. The database updates will fix it for now. But I really need to move ahead with better tests, and that includes better test fixtures. [This document](https://github.com/goldbergyoni/javascript-testing-best-practices) is my guide.

A little hint from the [reddit post](https://www.reddit.com/r/javascript/comments/cynbzd/best_practices_for_testing_in_javascript_nodejs/?utm_source=share&utm_medium=ios_app) I found this article through, re: test structure:

```javascript
describe('Products Service', function() {
  describe('adding a new product', function() {
    describe('price is unspecified', function() {
      it("sets the product status to 'pending approval'", ()=> ());
    });
    describe('price is set', function() {
      it("sets the product status to 'something else'", ()=> ());
    });
  });
});

// Products Service
//    adding a new product
//      price is unspecified
//        sets the product status to 'prending approval'
//      price is set
//        sets the product status to 'something else'
```

And some more advice in the comments of [this post on dev.to](https://dev.to/jjjjcccjjf/need-recommendations-in-mocking-database--testing-cleanup-unit-testing-28eb). I know that I am not doing unit testing right now, instead integration or end to end testing. For these types of tests I do need to hit the database. Tests aren't unit tests if:

* it talks to a database
* it communicates across the network
* it touches the file system
* it can't run at the same time as other unit tests (in parallel)
* you have to do speciel things to your environment to run it

So how can I test at the service or repo level rather than the resolver level, without mocking, stubbing, or spying? Given an array of species objects, `getSpecies` should return all the species. In development this array of species is coming from a call to the database, `db.any` for instance. I can't insert that array at that point? Can I? Then a filtered or paginatd array of species is also the result of a specific database call. 

Maybe I need to test that the call to the database I expect is hapenning. In that case I catch the query sent to the database, and make sure the sql query is a query that I expect to be run? If the query is correct, the resulting data should be correct. I can later write these integration tests to make sure that the queries are correct. *How do I catch the query being sent to the database, then test that the query matches the expected query?* 

Query formatting happens lower in the abstaction(?). The formatters take care of formatting queries, do I only test the formatters? No, because not all queries are generated from the formatters. Some queries written from scratch, then called with the `db.*` function calls. These are the functions making the actual calls to the database. So catch the result of these. Do I need to separate the database call and the formatting, ie, in the services? Create a query handler, with the args it needs to be called with? 

Am I spinning my wheels with this too much?

### postgres postmaster.pid
Every once in a while my computer my computer doesn't properly shutdown. When that happens, and I try and log back into postgres I receive an error similar t this, "error, server or directory does not exist". [This anser on StackOverlow](https://superuser.com/a/553545) explains what went wrong. I work through the following steps to get postgres running again.

```bash
# confirm the error
postgres -D /usr/local/var/postgres

# FATAL: lock file "postmaster.pid already exists
# HINT: Is another postmaster running in data directory ...

# identify the pid of the postmaster, first line of the return value
cat /usr/local/var/postgres/postmaster.pid

# kill process
kill 441 # use whatever you got in the cat return

# delete postmaster.pid
rm /usr/local/var/postgres/postmaster.pid

# finally
psql <database name>
```

### R Bootcamp

Another R Bootcamp. I think this is my 4th time helping run one of these things. So many people this time, apparently 130 people wanted to attend. WOW. This reminds me. I started writing a book as a resource for the bootcamp. Better get some work done on that, I'll be helping with the bootcamp at the Western Section meeting.

## Project Ideas

> I became a proponent of trying to give things away first. Tell everybody what you're doing... you try to give these ideas away, and people are happy, because they love great ideas. - Kevin Kelly

I read that quote in Tim Ferris' Tools of Titans and it stuck with me. I really like the idea of giving away my project ideas, etc. I don't claim to have great ideas, but I do know that I don't have enough time to work on all my ideas. Maybe just one person will take an idea I have and do something with it. Maybe no one will, I don't really care. Probably, this idea already exists out there in the world and I need to be told about it. Really, I just need a place to keep track of them all.

### CLI calender app    
I always have my terminal open, and most of the time that I need a calendar it is to view the dates. I rarely add or view anything in a calendar, that all exists in my bullet journal. Create a CLI that prints the current month as a calender. Specify a month/year to display. There is a command line tool called [WTFutil](https://wtfutil.com/) that does this and so much more. However, it'll make for a good challenge.

## Read

### Tidyverse Skeptic
Norm Matloff - [Link](https://github.com/matloff/TidyverseSkeptic/blob/master/README.md)

Same old arguments about the Tidyverse. Norm also talks about how it is causing a divergence in the R community between base R and the Tidyverse. I don't agree with this, and the argument is very similar to the whole vanilla Javascript vs. framework argument. I really think this is overblown. Learn both, it isn't that hard. Any, Tidyverse can't be used for everything (accessing class attributes). You'll be a better R user if you know both!

### Effective Database Design
Adam McNeilly - [Part 1](https://dev.to/adammc331/how-to-properly-design-a-database-part-1-2h6f) [Part 2](https://dev.to/adammc331/effective-database-design-part-2-2ben) [Part 2](https://dev.to/adammc331/effective-database-design-part-3-1113) [Part 4](https://dev.to/adammc331/effective-database-design-part-4-jbj)

Overview of the normal forms in a database design, with practical examples. I'll probably need to come back to this several times in the near future.

### JavaScript Inheritance vs Composition
Tyler McGinnis - [Link](https://tylermcginnis.com/javascript-inheritance-vs-composition/)

Another look at object composition. See last week.

### Google Interview Problems: Ratio Finder
Alex Golec - [Link](https://medium.com/@alexgolec/google-interview-problems-ratio-finder-d7aa8bf201e3)
    
Feel the imposter syndrom flowing through your veins. Especially after hearing back from my technical assessment and realizing how poorly I did. 

> ... every CS program or bootcamp worth its salt teaches graphs. If a candidate doesn't have the CS skills to know a graph problem when they see one, that's a "not worth hiring" signal.
    
Well, I guess I need to find time to work through data structures and algorithms, on top of everything else I need to learn to be a better developer. From the article, these are the things the candidate needed to do to answer the question:

* understand the question
* frame the conversion network graph
* realize conversion rates can be mapped to paths through the graph
* recognize they can use search algorithms to accomplish this
* choose their favorite algorithm and modify it to track the conversion rate
* if the implemented DFS as a naive solution, realize its weaknesses
* implement BFS
* step back and examine the edge cases
* what if we're asked for a nonexistent node
* what if the conversion rate doesn't exist?
* realize the reversing of the conversions is possible and likely necessary
* oh, then there is the extra credit 

Well I'm a terrible probrammer, arent' I, wouldn't even be able to frame the question as a graph problem.

## Code Snippets, etc.

*npx* - npx is included with NPM, fun fact.