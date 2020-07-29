---
title: "Fun with Functions in R, pt. 2 - The Fundementals"
date: 2020-04-25
published: true
category: R programming
tags: ["r", "programming", "functions"]
canonical_url: false
description: "Functions are fundamental building block in R."
---

I grew up in a family of coaches. My grandpa coached basebal and football, so did his three sons. Needless to say, I started playing sports at a fairly young age. Fundementals were everything. I remember going to the batting cages with my grandpa (at the high school he coached at) to practice hitting. Everything was a drill. Bunt the first 10 pitches, and they had to be good bunts. No popups or foul balls. I only bunted the first time I went to the batting cages with him.

Then hit 10 pitches the opposite way, after first performing 10 bunts. Again, something I was terrible at when I first started. Of course there was coaching and corrections along the way. He didn't leave me to figure this out on my own. Eventually I was able to easily bunt 10 times, then hit 10 pitches the opposite way. But that was just the beginning. The progression looked something like this:

1. 10 bunts
2. 10 pitches the opposite way
3. 10 sacrifice fly balls - not popups, the had to be deep enough to score a runner from third
4. 10 ground balls
5. 10 pitches up the middle
6. ... etc.

After several sessions something amazing began to happen. The pitches started to slow down. They were being thrown at the same speed from the pitching machine, but my perception of pitches slowed down. Everything got easier. This was the first time I entered a flow state. I could do anything he asked in the batting cages. Luckily those skill translated to the field. Ever since then I've understood the importance of fundementals to skill acquisition. The same applies to programming.

Yet, I sometimes think that these fundementals and drills are overlooked. It's easy to say "I know about `NA`, `NULL`, `NaN` are, and how they work," but over and over again I get questions about how to remove them from a datasets. These are the type of fundementals that should be practiced occasionally. I often get this practice in my daily work (I'm lucky!). I'll joke that I'm only good at data wrangling and data visualization in R. Honestly, that it the hard part. Once the data are in good shape it is easy to plug them into a function. All functions in R have a nice documentation page that help us understand how they work. There isn't any documentation on how to logically coerce raw data into clean data for that function. That comes with experience and a fundemental understanding of the data structures used in R.

Building functions in R is a tool that requires a good understanding of the fundementals in R. In this post we'll review some of the basic concepts in R that lead to building good functions. Which will ultimatey lead to building good programs.

> Since large programs grow from small ones, it is crucial that we develop an arsenal of standard programs structures of whose correctness we have become sure&mdash;we call them idioms&mdash;and learn to combine them into larger structures using organizational techniques of proven value.
>
> Alan J. Perlis

## Expressions

Let's think back to the R as a calculator example. Type `2 + 2` into the console and press enter. What happened, and why did it happen? We created an _expression_, `2 + 2` and asked R to _evaluate_, calculate the sum, that expression. The process is triggered by hitting the enter (or return) key on the keyboard (just like hitting the equal sign on a calculator). R then reads the expression, evaluates the expression, and prints the expression (repl - Read, Evaluate, Print Loop). This is the interactive programming environment that R provides. R acts as an interpreter between the code we write and the code needed by the computer to compute the result.

`2 + 2` is a simple expression. In fact, anything typed into the R console is an expression. Even the primitive (or atomic) data types like `2`. Try it. What happens? R reads the expression, evaluates it, then prints it to the console. In the case of atomic data types like numbers, there is nothing further to evaluate; the atomic types cannot be further broken into smaller pieces.

What about more complex expressions?

```r
2 + 4 * 10
#> 42

(2 + 4) * 10
#> 60

(3 * 3 + 2 * 10 - 2) / (10 - 1)
#> 3
```

Yup, they all work as expected. Just like a calculator works.

## Variables

It is useful to use names to refer to objects in R. These names are called variables, and variables contain the value of an object in R. Remember back to John Chambers' quote "... everything in R is an object". Variables are defined with the assignment operator, `<-` or `=`. Either is fine, I tend to encourage the use of `<-`, but that is just my habit.

```r
x <- 2
```

The example above causes R to associate the value `2` with the name `x`. Once this expression is run in R we can refer to the value `2` with the variable `x`. This variable can be used in new expressions. Our initial example can be rewritten `2 + x` and will still evaluate to `4`. We can even write that expression as `x + x` since the variable can be reused multiple times.

Creating and using variables is the simplest means of abstraction. It allows us to use simple names to refer to the results complex operations.

### Environments

When naming things as variables the name-object association is stored in memory. This bit of memory is the environment. In the simple example above the value of `x` is saved to the global environment. It's important to understand where things "live" in R.

## Functions

John Chambers said that everything happens in R is a function. The evaluation of expressions happens because of functions. Sometimes it is useful to abstract complex expressions and create our own function. Every package in R does this for us, but let's learn to build our own.

The general format format creating a function is:

```bash
name <- function(parameters) {
	body
}
```

Let's start with a simple example, squares. The idea of "squaring" something means to multiply it by itself. We can express this in R with the following function.

```r
square <- function(x) {
  x * x
}
```

Note that we are using an _implicit return value_ in the `square` function. R will return the last line of the function body automatically if the expression in the last line returns a value. Alternatively, writing the last line as `return(x * x)` is an _explicit return value_. We are telling R exactly what to return so that it doesn't have to guess.

We must evaluate this expression (run it in the R console), which saves it to the global environment. `square` can be used once evaluated and saved to the global environment.

`Square` can be used many different ways. By itself, in combination with other expression, as a parameter in other expressions (such as itself), or even as the basis for creating new functions. The parameter, `x`, for `square` can be a complex expression too.

```r
square(2)
#> 4

square(3) + square(4)
#> 25

square(square(2))
#> 16

square(3 + 2 + 4)
#> 81

sum_of_squares <- function (x, y) {
  square(x) + square(y)
}

sum_of_squares(3, 4)
#> 25
```

The third and forth example above are examples of the same principle. Since everything in R is an object, even functions are objects. That means functions can be passed around as parameters. When functions can be passed around as parameters, or returned from function, they are refered to as _first-class functions_. This is yet another important concept that we will return to later.

## Conditional Expressions

So far we can build fairly complex mathematical operations with the tools we've covered so far. However, we cannot create tests and perform different operations depending on the result of a test. We need to understand one last set of expressions before moving on to solving more complex problems. For example, how can we currently create a function that calculates the absolute value of a number?

The entire set of conditional expressions has many different names, `if...then`, `if...else`, conditionals, `if` statements, etc. Pick a name that suites you.

The general format for `if...else` statements is as follows:

```r
if (condition) {
  expression if condition is true
} else if (condition) {
  expression if second condition is true
} ... {
  expression if n condition is true
} else {
  expression if condition(s) is false
}
```

These `if, else if, else` statements can continue forever if we wanted them too. The `...` above is a shorthand for additional `else if` conditions.

We can define a function `abs_value` as

```r
abs_value <- function(x) {
  if (x > 0) {
    return(x)
  } else if (x == 0) {
    return(0)
  } else {
    return(-x)
  }
}
```

Here we are saying that if `x` is positive return `x`, if `x` is 0 return 0, and if `x` is negative return `-x` to make the value positive. Note that we are using an explicit return statement in this function. A function will stop evaluation at the first `return` statement. Any code below the if statement is ignored.

### Refactoring `abs_value`

This is a good example to think about what logic must be written in a function to return the correct answer. Can we make the `abs_value` function simpler? This exercise is a fundemental worth practicing. The first solution isn't always the best solution. What do you think of the following code?

```r
# i'm using a few shortcuts here
abs_value <- function(x) {
  if (x >= 0) return(x)
  else return(-x)
}

# is the same as
abs_value <- function(x) {
  if (x >= 0) {
    return(x)
  } else {
    return(-x)
  }
}
```

I used a bit of a shorthand here. If the code within the body of the `if` statement, or a `function` statement is short it can be written on a single line withouth the curly braces `{`. I don't recommend doing this unless the expression is short, like it is above.

Is this the right answer? It is correct. But it isn't the only way to solve the problem. We already have 2 solutions for how to find the absolute value of a number in R. What about some alternatives?

```r
abs_value <- function(x) {
  if (x < 0) return(-x)
  else return(x)
}

## or

abs_value <- function(x) {
  if (x < 0) {
    return(-x)
  }
	return(x)
}
```

In the first example above I've reversed the order to check the value of `x`. If `x` is less than zero return `-x`, `else` return x.

In the second example I'm taking advantage of the fact that R only runs code within the `if` statement if the condition evaluates to true. If `x` is negative the code with in the `if` statement is evaluated. The `if` statement is skipped if the condition evaluates to false, then the remainder of the code is evaluated. This is a handy pattern to remember. Sometimes it isn't necessary to include the `else` portion of an `if` statement since the rest of the code will evaluate when the `if` statement is false.

Again, all these examples are correct. But are any the right answer? No. If this problem were given to five different programmers there would likely be five different functions that all return the correct result.

### But R is weird

R is a strange language. It does things differently than other languages because R was built as a statistical programming language.

Vectors are a compound data type in R ([I've written about vectors in the past](/a-guide-to-vectors-in-r)). They are sets of atomic data types combined into a single object. We can create a vector in R with the function `c`. So, `c(-5, 0, 5)` is a vector of numbers. In many ways they are analagous to `arrays` in other languages. However, a quirk of R is that every value in a vector is evaluated when an expression is applied to the vector. For example, our `square` function will be applied to every value in a vector:

```r
square(c(-5, 0, 5))
#> 25 0 25
```

This behavior is refered to as _vectorization_. It can be very useful or very annoying. It is defintely something worth committing to memory.

What happens if we try and applying the `abs_value` function to a vector?

```r
abs_value(c(-5, 0, 5))
#> Warning message:
#> In if (x >= 0) x else -x :
#>   the condition has length > 1 and only the first element will be used
```

We get a warning message. Which means the function did return a result, but if you check the result it is wrong. Another quirk of R, conditional statements written with `if...else` are not vectorized. What a bummer! There are two solutions to vectorize our `abs_value` function,

```r
# first solution
abs_value_loop <- function(x) {
  out <- c()

  for (i in seq_along(x)) {
    if (x[i] < 0) {
      out <- c(out, -x[i])
    } else {
      out <- c(out, x[i])
    }
  }

  return(out)
}

# second solution
abs_value <- function(x) {
	ifelse(x < 0, -x, x)
}
```

1. Evaluate each value of the vector by looping over vector in a `for` loop. We haven't covered how to write loops yet.
2. Use the `ifelse` function. This function is very similar to `if...else` statements. The first parameter is a conditional expression. The second parameter is the value to return if the condition is true. The third parameter is the value to return if the condition is false.

Yes, you should probably use the second. It is much less code; less code means less bugs. For example, I was able to write the second solution correctly on my first try. The first solution took a few attempts. I'll also argue that the second solution requires less knowledge to solve. It requires us to know, or find, a single function. The second solution requires us to know that we must first initialize a vector to add data to, then how to loop, and how to combine the current value with the initial vector.

I do beleive there is a right answer when computing the absolute value. It also happens to be the easiest. I think relates nicely to the following quote ([I've written about this](/simple-correct-fast)).

> The single most important quality in a piece of software is simplicity. It's more important than doing the task you set out to achieve. It's more important than performance. The reason is straightforward: if your solution is not simple, it will not be correct or fast.
>
> Drew DeVault

## Newton's method to find square roots

Let's apply everything we've learned to an interesting problem, computing square roots using Newton's method:

- the square root of `x` is `y` such that `y` is greater than 0 and `y` squared equals `x`.

Sounds like a simple problem, but how can we go about finding an general solution? What is the square root of 2?

If you're better at math than I am you'll likely know about Newton's method. I did not. This example is pulled directly from [Structure and Interpretation of Computer Programs](https://sicp.comp.nus.edu.sg/). Newton's method uses succesive approximations to estimate the square root of a number.

Whenever we have a guess `y` for the value of the square root of a number `x`, we can average `y` with `x/y` to get a better guess. For example, our first quess for the square root of 2 might be 1. Therefore we can average `(2 + 1) / 2`. So that our next guess is 1.5, etc.

Let's write some code that will solve this problem. The square root of 2 is 1.414214

```r
# What is the square root of 2?
# our initial guess is 1
## improve guess
((2 / 1) + 1) / 2
#> 1.5

## improve guess
((2 / 1.5) + 1.5) / 2
#> 1.41667

## improve guess
((2 / 1.41667) + 1.41667) / 2
#> 1.414216

## etc...
```

This is an iterative process that might continue into infinity. Writing it out this way doesn't seem sustainable. Can we write a program to solve this problem for us? Let's try.

```r
# the square function from earlier
square <- function(x) {
  x * x
}

# the absolute value function from earlier
abs_value <- function(x) {
  ifelse(x < 0, -x, x)
}

# a function to calculate the average
avg <- function (x, y) {
  (x + y) / 2
}

# a function to improve our guess
improve <- function (guess, x) {
  avg(guess, x / guess)
}

# a function to check if our guess is good enough
good_enough <- function (guess, x) {
  abs_value(square(guess) - x) < 0.001
}

# a function to continue guessing values of y until
# they are good enough to stop guessing
sqrt_iter <- function (guess, x) {
  ifelse(good_enough(guess, x),
         guess,
         sqrt_iter(improve(guess, x), x))
}

# a function to call that takes a single parameter,
# the value we want to know the square root for
sqrt <- function (x) {
  sqrt_iter(1, x)
}

# finally, test the function with several values
sqrt(2)
#> 1.414216
sqrt(4)
#> 2
sqrt(2)
#> 1.414216
sqrt(10)
#> 3.162278
sqrt(15)
#> 3.872984
sqrt(25)
#> 5.000023
sqrt(81)
#> 9.000011
```

It works, mostly, these are approximations of the correct answer. Obviously they aren't the exact correct answer. Let's step through the logic of this solution, starting with the last function we wrote, `sqrt`.

- `sqrt` &mdash; This is simply a wrapper around the main logic of the solution. We don't necessarily want to provide our guess of the square root when attempting to find it. This allows us to call the function with a single parameter.
- `sqrt_iter` &mdash; As stated above, this is an iterative process. Our program must iterate over several answers in order to get close to the correct answer. We are using _recursion_ to iterate until an answer is good enough.
  - `sqrt_iter` uses an `ifelse` statement to check if the current guess is `good_enough`. If it is then the guess is returned, and the process ends.
  - If the answer isn't good enough `sqrt_iter` is called again (recursively) with an improved guess.
  - This process will continue until a good enough guess is found.
- `good_engough` &mdash; determines if the current guess is good enough. In this program we've decided that if guess squared is within 0.001 of the values supplied to the `sqrt` function that the guess is good enough. This function returns a `boolean` (true or false) value that is then used in the `sqrt_iter` function.
- `improve` &mdash; Uses the Newton method to further improve the guess of the square root of `x`.
- The remaining functions are the `square` and `abs_value` functions we created earlier in this post. We also created a function, `avg`, to calculate the average of two values.

This is a hell of a lot of code to reason about. The logic behind Newton's method is jumping around between every function. Then the recursion causes some of the functions to be called multiple times. Can this program been written as a single function? Yes. Is there a correct way to write this program? No. There are only personal interpretations of the problem and best practices.

I really like to follow [the "do one thing and do it well"](https://en.wikipedia.org/wiki/Unix_philosophy#Do_One_Thing_and_Do_It_Well) philosophy when writing functions. I find that smaller functions tend to be simpler. More complex functions can be assembled, like legos, from these simpler functions. This modular approach has a few advantages. Smaller functions are easier to test, easier to reason about, and easier to write. That doesn't necessarily mean that this approach is easy. It may take several attempts to find the places to break up the logic into distinct functions. For example, the `avg` function only calculates the average of two numbers. The denominator is hard coded as `2`. This logic could have been included in the `improve` function.

```r
improve <- function(guess, x) {
	(guess, (x / guess)) / 2
}
```

The ability to find the natural seams in a problem that can be used to separate the logic into functions takes practice. Sometimes the seams are obvious. The `square` and `avg` functions above are general purpose and have the potential to be used later in a program, or an entirely different program.

Abstracting sections of code into functions to reduce copy and pasting follows the [don't repeat yourself (DRY)](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) principle. Following the DRY principle makes code more robust. If changes are required in a program, and we've copy and pasted code, we'll have to find every instance of copy and paste and make the appropriate changes. If there is a bug when copy and pasting then that bug is in every copy.

## Summary

Writing good code takes practice. One of my coaches loved to remind us that "practice makes perfect" is incorrect, "_perfect_ practice makes perfect," he would say. We could practice with a poor understanding of the fundamentals and never get any better. However, if we practice, guided by the principles of good software engineering, we can improve. I think of it as a "standing on the shoulders of giants" endeavor. Many computer scientists, all much smarter (and more experienced) than most of us, developed these principles after a lifetime of practice.

I find the best place to practice these fundamentals is in my daily work. Every day I write R code I make sure to use meaningful names for varialbes. Eventually I'll break my bad habit of naming inconsequential (to me) variables `x` or `y`. The same goes for my building reproducible workflow, which are large pieces of software we work on daily. Whether it be a simple program like automating map production for a directory of shapefiles or writing a thesis. We are building software, even if you don't think so.

I don't really have a goal for this series of posts. I'm using them as an exercises (see, more practice) to become a better programmer. All the assumptions I've made are the result of working with my peers and teaching a few R trainings. I think that too often some fundamental knowledge falls by the wayside at the expense of doing science. I've corrected many unnecessary `for` loops because programmers forgot or never learned about vectorized operations in R. The same for understanding the difference between `if...else` and `ifelse` conditional statements (hint, one is vectorized, remember?).

The only way to get better is to practice. So get after it!
