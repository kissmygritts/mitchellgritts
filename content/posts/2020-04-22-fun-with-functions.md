---
title: "Fun with Functions in R, pt. 1"
date: 2020-04-22
published: true
tags: ["r", "programming", "functions"]
canonical_url: false
description: "Functions are fundamental building block in R."
---

Functions are one of the best tools in the R toolbox. In my experience, working with the people that I work with, they are an underutilized tool. I think R is taught to wildlife and natural resource students as a means to an end. A researcher first versus programmer first mindset (and before I get too far, that isn't a bad thing).

A lot of analyses that I've seen from colleagues are giant scripts. Entire workflows written as one (or many) file. If this works, great! But I find workflows like this may benefit from wrapping chunks of the workflow into functions. A few of the benefits may include:

- Reusability - wrapping logical blocks of code into functions means they can be used elsewhere.
- Maintenance - breaking code into smaller chunks makes it easier to test. Instead of testing that the whole script works with any new changes, only the functions that change need to be tested.
- Readability - breaking code into smaller chunks might make it easier to reason about the logic of the program.

> The most obvious application of functions is defining a new vocabulary. Creating new words in prose is usually bad style. But in programming, it is indispensable.
>
> [Marjin Haverbeke - Eloguent Javascipt](https://eloquentjavascript.net/index.html)

## What even is a function?

Functions are programs, they consume inputs and produce outputs. You've likely been using functions for as long as you've been using R, perhaps without even knowing it!

Most introductions to R include a section about using R as a calculator. Type `2 + 2` into an R console, press enter, and you get a result. And there you have it, we just used a function. In this case, a special type of function called an infix function, but a function nonetheless.

Perhaps a more familiar example is `sum(2, 2)`. The result is the same, `4`. `sum` is a function that takes an input(s) (2, 2), calculates the sum of the inputs, and returns a value (4).

Not all functions return a value. Some produce a figure, others write data to a file. For instance, the following function, `plot(1:5, 1:5)` produces a plot. There isn't a value that can be saved to a variable.

> To understand computations in R, two slogans are helpful:
>
> - Everything that exists is an object
> - Everything that happens is a function call
>
> John Chambers

## Defining functions

Let's start creating some of our own functions. Every function definition includes a name, parameters, and the body of the function.

```r
add <- function(a, b) {
  c <- a + b
  return(c)
}
```

There are four lines of code in the snippet above.

1. Declare a function with the `function` keyword.

- In this example we've created a function called `add`.
- `add` takes 2 parameters, _a_ and _b_.
- line one ends with an open curl brace `{`, this begins the function body.

2. `add` will compute the sum of the two parameters _a_ and _b_, which saved in a variable _c_.
3. The return statement. Here we are explicitely telling R to return the value of _c_ with the `return` function.
4. Close the function body with a closed curly brace `}`.

There you have it. A first function. In order to use the function this chunk of code must be run, which will save `add` to the global environment.

Call the function like any other function.

```r
add(4, 5)
#> [1] 9
```

There you have it. The basics of writing a function. But wait! There is so much more to functions than just writing, then calling them. Continue reading for more information than you ever wanted to know about function!

### A little about style

Code style is an important topic. I won't rehash all the articles, posts, blogs, style guides out there. Just a few pointers from my experience.

1. Use meaningful names &mdash; meaningful names will provide future you, and potential collaborators, clues about the purpose of a function
2. use verbs to name your functions &mdash; functions do things, so do verbs.
3. don't use an existing function name &mdash; avoid the headache. I once had a friend save a function to `c`, debugging his code was difficult.
4. be consistent with your conventions &mdash; help future you and collaborators to read your code.
5. make it readable, please use spaces &mdash; help future you and collaborators to read your code.

```r
# 1. meaningless function names
f <- function(...){}
g <- function(...){}

# 2. use verbs
## good function name
remove_na <- function(...){}
generate_model <- function(...){}

## bad function name
no_na <- function(...){}
model_a <- function(...){}

# 3. don't use existing function names
## mean already exists as a function in R
mean <- function(a, b, c) {
  (a + b + c) / 3
}

# 4. be consistent, don't mix naming conventions
# if you have a function remove_na and want to write another
# function to remove empty strings
## do this:
remove_na <- function(...){}
remove_empty_strings <- function(...){}

## not this:
remove_na <- function(...){}
removeEmptyStrings <- function(...){}

# 5. when writing your functions, make it readable
## in this very contrived example
## good:
square_and_double <- function(x) {
  2 * x ^ 2
}

## bad:
square_and_double<-function(x){2*x^2}
```

Hopefully that illustrates the points I'm trying to make. To clarify the 4th point, I stick to [snake_case](https://en.wikipedia.org/wiki/Snake_case) to name my functions and variables. It doesn't matter which convention is used, just be consistent.

I will, however, caution that you should not use a `.` (period) to separate words in a function. `square.and.double` is better written as `square_and_double` or `squareAndDouble`. This is due to conventions in other programming languages. That may not sound important, it is just a convention I like to follow while attempting to maintain a consistent style across programming languages that I use.

And to emphasize the first point, code with intent and purpose. The code examples below are both syntactically correct. The purpose of the first example is unclear, while the second is obvious.

```r
# what does it even mean?
x <- function(y, z){
  return(y * (1 + (z / 100)))
}

# meaningful
calculate_bill <- function(price, tax_rate){
  total <- price * (1 + (tax_rate / 100))
  return(total)
}

# then used, as it might be in a program or script
a <- x(12.80, 6.6)

# or
bill <- calculate_bill(12.80, 6.6)
```

As I said earlier, there a hundreds of style guids or style recommendations out there. It doesn't matter which you choose to use. The important thing is to be consistent. You'll understand then next time you try and read your own code from a few years ago.

## Wrap up

I think I'll close this first article about functions with a section from the book [Machine Beauty: Elegance and the Heart of Technology](https://www.thriftbooks.com/w/machine-beauty-elegance-and-the-heart-of-technology-repr-ed-masterminds_david-gelernter_gelernter/1302596/#isbn=046504316X&idiq=33737473) by David Gelernter. I think it summarizes the power and simplicity of functions.

"Algol 60 is based on one simple-seeming discovery: big programs can be built out of little programs that are structurally identical to the big ones. This idea is called "recursive structure," _recursive_ &mdash; an important word in computer science &mdash; meaning that you refer to yourself; recursive structures are built of components that are structurally identical to themselves. If an atom were recursive in structure, it would be built out of little atoms instead of protons, neutrons, and electrons. If a car were recursive in structure, the engine, transmission, and so forth would each be a little automobiles. Recursive structures, in short, are rare and usually make no sense. But software is a strange material.

Software can be built, the Algol designers observed, in roughly the fashion of an algebraic expression. Tear down complex algebraic expression &mdash; disassemble a multiplication problem, let's say, stipulating that Thing 1 is to be multiplied by Thing 2 &mdash; and you will find yourself holding a collection of smaller algebraic expressions. Thing 1 is _itself_ an aglebraic expression, in other words, and thing 2 likewise. Software can be made to work the same way. It is brilliantly simple, powerful observation: instead of having to master the rules for many kinds of structure on many scales (instead of having to learn about spark plugs, about the engine that contains the spark plugs, about the powertrain that contains the engine), programmers would need to understand only one set of rules, and those rules would hold good at every scale. Recursive structure brilliantly simplified the synthesis and the analysis of programs, and remains the most important singel development in the history of software."

All that to say big, long workflows can be broken into smaller, easier to reason about pieces, then reassembled into a program. Those smaller pieces, for us, are functions.

### I lied, one more thing

I'm passionate about functions. It's a strange thing to be passionate about. But hey! Who cares? I suppose it is due to my desire for clean, simple code. Perhaps even minimal code. Computer programming is hard enough, why make it harder. Functions are my attempts to reconcile the difficulty of programming with my desire for minimal programs.

I think.

At the time of writing this I'm not really sure where I want this post to go, or what I want it to say. I've built myself a bit of a reputation as an R guru amongst my colleagues. I started to teach myself R in 2010. There have been streches of time that I've used R daily for weeks or months on end, for hours and hours a day. Most of what my colleagues see as an R guru is really increased exposure to a number of different problems &mdash; insert 10,000 hours to mastery cliche here. Simply due to the amount of time I've spent solving problems in R, I've been exposed to more solutions, troubleshooting, etc. than most of my friends.

It's a positive feedback loop. Because I've acquired this reputation as an R guru, people come to me for help. Because people come to me for help, I'm given more opportunites to solve interesting problems. Because I solve those interesting problems, colleagues think of me as an R guru.

It isn't fair. Many of the problems that people bring to me I can solve quickly and/or easily. They see this and think I am a better programmer than them. I am constantly overwhelmed by imposter syndrome, so I like to think I can sympathize with them. I want to make this clear. I am not special. I just have more experience. I honestly think that most people, if given the same amount of time I've had working in R, will become better programmers than I currently am.

I started just like everyone else. I remember the first few weeks I was learning R. BIOL 394 - Ecology Lab. I was sick and tired of learning new tools to do statistics. I eventually found R, figured out it could do anything I wanted, and was free to use! Like most beginning programmers, without sufficient training, everything that I did was overly complex. Big long script files, without any sense of code style. And filled with all the anti-patterns and poor practices.

I used R as a means to an end. I wanted results and figures for statistical analyses. I didn't care how it was done, I just wanted answers. A researcher first mindset, and a very naive researcher first mindset.

I struggled. But I learned, I stuck with it. Eventually I taught myself a few other languages (SQL is probably my favorite) and developed an interest in programming and computer science for its own sake. I began to peek inside the black box with a desire to learn how programs worked. What is the best way to build a function? Is there a better way to build software with R? Can I borrow from Javascript, Java, C, etc.? There is a whole body of work out there, I need to go find it and dig in.

This is when I started to aproach development from a programming first mindset. Borrowing from the knowledge others, I began to build an appreciation for simple programs.

I really want to explain some of the most common problems (pitfalls, shortcomings, traps) I come across when I help people. I think I can put the accumulation of experiences to work. Maybe I can help identify some tools that anyone can add to their toolboxes that will help them progress more quickly. And I think the best place to start is with functions.

Moving forward, I hope to write a series of posts about functions. How to write, test, refactor, deconstruct, and compose them. I'm by no means an expert, but I think I have some experiences and ideas that might be helpful.

It's a journey to craft good software. I'm going to try and convince you that you are indeed building software. Whether it be the code for your dissertation, or a simple workflow to read CSV files and produce maps, these processes can benefit with the best practices from the world of computer science.

The first step in that journey is understanding the basic data types of R, which I'm going to assume, for now, you understand. But the second step is understanding how to build and use functions.

Stay tuned!

## Resources

These are some resources that I've read over the last few weeks that I really like. Not all of them are R specific. The concepts are language agnostic.

[Eloquent Javascript](https://eloquentjavascript.net/index.html)

[How to Design Programs](https://htdp.org/2018-01-06/Book/index.html)

[Professor Frisby's Mostly Adequate Guide to Functional Programming](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/)
