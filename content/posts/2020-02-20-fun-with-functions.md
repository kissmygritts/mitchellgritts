---
title: 'Fun with Functions in R'
date: 2020-02-28
published: false
tags: ['r', 'programming']
canonical_url: false
description: 'Functions are fundamental building block in R.'
---

Functions. Once you learn the basics of writing functions you'll never look back. Imagine wrapping bits of reusable code in a reproducible code block instead of constantly copy and pasting. Functions are easier to maintain than the long R scripts we are all guilty of trying to keep updated.

Before all that, let's get a few basics out of the way.

## Calling Functions

One of the first functions you've probably used in R is `typeof`, it is used to determine the type of an object in R. `typeof` is the name of the function. It takes a parameter `x`, which can be any object, and returns a character string that describes the type of object provided.

```r
typeof('functions are fun')
#> [1] "character"
```

Most functions are called in this manner.

## Create your own functions

Creating functions is easy. Writing good functions &mdash well that will take a lifetime to master. 

```r
add <- function(a, b) {
  c <- a + b
  return(c)
}
```

There are four lines of code in the snippet above. 

1. Declare a function with the function.
  * In this example we've created a function called `add`.
  * a function is created using a function, called `function`
  * `add` takes 2 parameters, *a* and *b*. 
  * line one ends with an open curl brace `{`. This begins the function's code block
2. `add` will compute the sum of the two parameters *a* and *b*, saved in a variable *c*.
3. The return statement. Here we are explicitely telling R to return the value of *c*.
4. Close the function block with a closed curly brace `}`.

There you have it. A first function. In order to use the function this chunk of code must be run, which will save `add` to the global environment.

Call the function like any other function.

```r
add(4, 5)
#> [1] 9
```

There you have it. The basics of writing a function. But wait! There is so much more to functions than just writing, then calling them. Continue reading for more information than you ever wanted to know about function!

## A little about style

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
## rm is short for remove, remember to be consistent
generate_model <- function(...){}

## bad function name
no_na <- function(...){}
model_a <- function(...){}

# 3. don't use existing function names
# mean already exists as a function in R
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
# in this very contrived example
## good:
square_and_double <- function(x) {
  2 * x ^ 2
}

## bad:
square_and_double <- function(x) {
  2*x^2
}
```

Hopefully that illustrates the points I'm trying to make. To clarify the 4th point, I stick to [snake_case](https://en.wikipedia.org/wiki/Snake_case) to name my functions and variables. It doesn't matter which convention is used, just be consistent.

And to emphasize the first point, code with intent and purpose. The code examples below are both syntactically correct. The purpose of the first example is unclear, while the second is obvious.

```r
# what does it even mean?
x <- function(y, z){
  return(y * (1 + z))
}

# meaningful
calculate_bill <- function(price, tax_rate){
  total <- price * (1 + tax_rate)
  return(total)
}
```

That's enough about style for now.

## What even is a function

> To understand computations in R, two slogans are helpful:
> * Everything that exists is an object
> * Everything that happens is a function call
> &mdash; John Chambers

Functions are objects. For instance, our `add` function has two 

## Function evaluation

## Partial application

## Scope

### Closures

## Infix functions