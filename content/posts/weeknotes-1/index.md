---
title: 'Weeknotes #1'
date: 2019-09-02
published: true
tags: ['weeknotes']
canonical_url: true
description: 'A summary of the things I do, read, listen to over the week'
---

*Aug 26 - Sep 01, 2019*

Here we go, I'm jumping on the [weeknotes](https://www.google.com/search?client=firefox-b-1-d&q=weeknotes) [bandwagon](https://medium.com/job-garden/a-pre-history-of-weeknotes-plus-why-i-write-them-and-perhaps-why-you-should-too-week-16-31a4a5cbf7b0). Really this is just an extension of the purpose of this website, to help organize my thoughts, the things I read, and the progress I make as part of my continuing eduction. Really, a perpetual notebook - a digital archive of the salient points from my [Bullet Journal](https://bulletjournal.com/).

I tend spend my entire day coding, Visual Studio Code on half my screen, a web browser on the other half. It is a cycle of code problem, google, solve problem, new problem. I often forget (or have to relookup) the solutions when I have a similar problem. This isn't efficient. So maybe writing about the small struggles (such as remembering which parameters are available with `.map()`) I'll have better recall, and become a better developer. 

In the eveninings and weekends I sit around the house scrolling through Medium, Dev.to, and the like reading the latest posts. Many of these have great information that I end up forgetting. Perhaps a small summary of the good articles I read in these weekly rollups will help me remember those nuggets of information.

Sitting in on a technical interview. Very interesting to see how people reacted to the questions and attempted to solve them. Especially coming off a techincal assessment of my own, even though it was remote.

## Code

### pg-promise

I had issues using the repository pattern as described in the pg-promise-demo when attempting to use utility functions in the class methods. This is because the classes, and the methods, are initialized before the database (and pgp reference) are exported. Therefore, pgp is undefined in the when the utility functions are used in the class methods. It is kinda of a circular timing issue.

I can think of two solutions, each described in this [forked repo of the pg-promise-demo](https://github.com/kissmygritts/pg-promise-demo). I also created an issue in the [pg-promise repo](https://github.com/vitaly-t/pg-promise/issues/647).

### Object composition

Stuck in a cycle of DRY, premature optimization, and moving fast when it comes to building gus-gql. I'm moving fast, but doing a lot of copy/pasting from other modules (bad, I know). Meanwhile I see room to refactor and optimize. Which might lead to moving even faster, at the cost of slowing down right now. What should I do? This [post on Alligator.io](https://alligator.io/js/class-composition/) really helped clarify what I was trying to do. Here is a note from some code I'm trying to work through:

```js
/*
REPO
create a animal-encounter database connection
this connection will run the queries against the database

the repo can have a columnset for use with helpers
the repo can have a sql statement for connection purposes
the repo can be extended
the repo is initialized with optional functions (loaders, formatters, etc)
the repo receives the pgp context to help with formatting

pseudo code:
Repo (options: {obj}, extend: [arr], ctx: {db, pgp})

options {
  fields, \__ these two are used to create a field
  table,  /
  cs,
  sql,
  custom methods
}

extend: an array of methods to add to the repo, for instance
  reusable elements function array
*/
```

And an example from the post:

```js
// We have some behaviors
const canSayHi = self => ({
  sayHi: () => console.log(`Hi! I'm ${self.name}`)
});
const canEat = () => ({
  eat: food => console.log(`Eating ${food}...`)
});
const canPoop = () => ({
  poop: () => console.log('Going to 💩...')
});

// Combined previous behaviours
const socialBehaviors = self => Object.assign({}, canSayHi(self), canEat(), canPoop());

const alligator = name => {
  const self = {
    name
  };

  const alligatorBehaviors = self => ({
    bite: () => console.log("Yum yum!")
  });

  return Object.assign(self, socialBehaviors(self), alligatorBehaviors(self));
};


const jack = alligator("jack");
jack.sayHi(); // Hi! I'm jack
jack.eat("Banana"); // Eating Banana...
jack.bite(); // Yum yum!
```

Exactly! I want a create an object that is extended with other objects or methods. Object composition. 

The article also talks about class inheritance as syntactic sugar for some of these concepts from object composition.

## Read

### Design patterns for modern web APIs
David Luecke - [Link](https://blog.feathersjs.com/design-patterns-for-modern-web-apis-1f046635215)

Building an API is hard. So many articles out there talk about architecture patters, SOLID, Onion, Hexagonal... I have a difficult time understanding it all. This might be the first article I've read that helps me understand the purpose of a service layer. The folks that developed FeathersJS have great articles, and great documentation. I spent about an hour reading through the FeatherJS documentation last night. I really like what they are doing, and I might have to try it out sometime.

### Timestamps and Time Zones in PostgreSQL
Philipe Fatio - [Link](https://phili.pe/posts/timestamps-and-time-zones-in-postgresql/)

Timestamps are troublesome. I always seem to mess it up. I had the need to convert local time into UTC, mu solution below. This article is a great primer on dealing with timestamps.

```sql
SELECT timezone('UTC', '2019-01-01 00:00'::timestamp)
```

### Class Composition in Javascript
Alex Jover Morales - [Link](https://alligator.io/js/class-composition/)

Exactly what I was looking for! See Object composition above.

### How to Learn New Things
Michael Thiessen - [Link](https://michaelnthiessen.com/how-to-learn-new-things)

Experimentation. I worry a lot about how things will work when I develop. What is the best way to build this Vue component? How should I build this GraphQL API. Should I use pg-promise or Sequelize? Questions like these tend to send me down a rabbit hole of other questions, analysis paralysis. The best way to find out the best way to find the answers to these questions is to experiment with new things. Break things in these experiments to figure out what does and doesn't work. Then apply that to the 