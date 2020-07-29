---
title: 'A Guide to Vectors in R'
date: 2019-09-09
published: true
category: R programming
tags: ['r', 'programming']
canonical_url: false
description: 'A complete guide to vectors in R'
---

This weekend was my 4th time helping with an R Bootcamp. The bootcamp is two days. The first day consists of the very basics of R, data structures, reading data into R, then simple exploratory data analysis. We generally spend most of day one drilling the basic data structures in R - vectors, matrices, lists, etc. In this post I tried to compile as complete a guide as I can on R vectors.

Let's get started.

## Atomic classes

We need to review the basic data types before getting to vectors. These basic types are called atomic classes (or atomic vectors). R has 5 basic vector types. These can be called atomic classes, or atomic types. These are the essential building blocks of which everything else in R is composed. The following are the basic atomic classes in R:

* `logical`: `TRUE`, `FALSE`
* `integer`: 1L, 45L, 328L. *The `L` stands for `Long` and is required to force R to use an integer*
* `double`: or `numeric` 1.23, 4.6
* `complex`: `5i`
* `character`: strings, wrapped in single or double quotes

We can check the type or atomic class of an object with the function `typeof()`.

```r
typeof(5.52)
#> [1] "double"

typeof(6L)
#> [1] "integer"
```

## Vectors

This is the most common data structure you will encounter in R. Vectors are sets of atomic classes. They are one dimensional, and displayed as a single row of data when printed by the R console. 

In order to create a vector you will need to use the function `c()` (again, more on functions in a moment). This will combine atomic classes into a vector. Each item in e vector is referred to as an element. `typeof()` can be used to check the type of data in each vector.

```r
vector_1 <- c(1, 2, 3)
vector_2 <- c('a', 'b', 'c')

# check types
typeof(vector_1)
#> [1] double

typeof(vector_2)
#> [1] character
```

All Vectors can only contain a set of a single atomic classes (character, integer, ...). R will coerce the data into a common type (most likely a character) when attempting to create a vector with a mix of atomic classes. Try running some of the code below to see what happens when attempting to create vectors of mixed atomic classes.

```r
vector_3 <- c('apple', 3, 'orange', 4)
#> [1] "apple" "3" "orange" "4"

vector_4 <- c('apple', TRUE, 'orange', FALSE)
#> [1] "apple" "TRUE" "orange" "FALSE"

vector_5 <- c(1.43, 1L, 4L, 6.25)
#> [1] 1.43 1 4 6.25

typeof(vector_5)
#> "double"
```

`vector_3` and `vector_4` are character vectors. The values of `3`, `4`, `TRUE`, and `FALSE` were coerced, or converted, to characters. R chooses character because it is possible to convert a number to a character, but it is not possible to convert a character into a number.

In `vector_5`, `1L` and `4L` are coerced from integers to doubles (floating point numbers). This example is a little more complex because it is possible to convert a double into an integer, however you'll lose data. The safer operation is to convert an integer into a double.

This property of vectors is really important to understand. And while it may seem like a constraint, it is a very useful property. Since we know that a vector contains a set of data of the same type, we can safely perform data operation on that vector. 

### Vector properties

There are two main properties of vectors: 

* length: how many elements are in the vector - `length()`
* type: the type of data in the vector - `typeof()`

```r
# return length of vector_3
length(vector_3)
#> [1] 4

# return the type of vectors
typeof(vector_3)
#> [1] "character"

typeof(vector_5)
#> [1] "double"

typeof(c(1L, 2L, 3L))
#> [1] "integer"
```

The `typeof()` function returns a single result because every element in a vector must be of the same type.

### Vectorized operations

Many operations in R are *vectorized*. This means that vectorized operations will perform the same operation on every element of a vector. This is a very handy aspect of working in R.

A simple example of this is adding 2 to each value of `vector_1`.

```r
vector_1 + 2
#> [1] 3 4 5
```

This works for any of the mathematical operations (`-`, `*`, `^`, etc).

R will properly perform mathematical operations on two vectors because of vectorized operations. 

```r
vector_1 * c(8, 9, 10)
#> [1] 8 18 30

vector_1 + c(10, 20, 30)
#> [1] 11 22 33
```

Without vectorized operations we would have to manually loop through each vector, grab the proper element by its index, then perform the proper mathematical operation. This tends to be a very handy property. 

The main use of R is to work with data. Data is rarely just one thing, but mostly rows and columns of observations. And when working with data we want operations to be applied to every element of the data (vector) by default, that way we can avoid the looping required in other general programming languages.

One caveat of vectorized operations to be aware is called *recycling*. R naturally likes to operate on vectors of the same length. If it encounters two vectors of different lengths it will recycle the smaller vector until the lengths are the same.

```r
# adding a vector of length 3 to a vector of length 2
vector_1 + c(10, 20)
#> longer object length is not a multiple of shorter object length
#> [1] 11 22 13
```

R still returns a result, but maybe not the result you were expecting. R will also warn you if the vectors are of different lengths. The warning can be a little cryptic; `longer object length is not a multiple of shorter object length` which essentially means the vectors are of different lengths. However, if the length of the vectors are multiples of each other, then R will not throw this warning.

```r
c(1, 2, 3, 4) + c(10, 20)
#> 11 22 13 24

c(1, 2, 3, 4) + c(10, 20, 30)
#> longer object length is not a multiple of shorter object length
#> [1] 11 22 33 14
```

### Indexing

Indexing is an operation that selects subsets of the data in a vector. This operation can be performed to return a single, or multiple elements of a vector. This operation is sometimes referred to as subsetting, as we are taking a subset of a larger set of data.

An index is used to specify the location of an element in a set of data. All data structures in R have an index, so this concept will also apply to later R objects. For those of you coming from another language R indexes starts at 1.

```r
vector_6 <- c('a', 'b', 'c', 'd')
#> [1] "a" "b" "c" "d"
```

In the vector above, each element belongs to a specific location. So the index for "a" is 1, the index for "b" is 2, the index for "c" is 3, and the index for "d" is 4.

*Note: When a vector is printed to the console there will be square brackets with a number on the left hand side of the window. This is the index for the left most value in the console.*

R uses square brackets (`[ ]`) to select elements based on the index of that element. It looks a like this: `vector[x]`, where, vector is the name of the vector we want to subset, and x is the index of the element we want. The command to return the third element of `vector_6` looks like this: `vector_6[3]`. Try it!

```r
vector_6[3]
#> [1] "c"
```

We can select more than one element by using a vector of indices. That might sound confusing, let's see an example. If we want to select the first and third element of `vector_6` we need to create a second vector with the indices 1 and 3, like this: `c(1, 3)`. What happens if we put `c(1, 3)` in square brackets?

```r
vector_6[c(1, 3)]
#> [1] "a" "c"
```

The first and third element are returned!

### Reassign elements in a vector

We can now use the concept of indexes to assign new values to each element of a vector. This is done by specifying the index of an element (like above), then using the assignment operator (`<-`), and supply a new value.

```r
# what is in the vector
vector_6
#> [1] "a" "b" "c" "d"

# reassign
vector_6[1] <- 'z'
#> [1] "z" "b" "c" "d"

# multiple values at once
vector_6[2:3] <- c('y', 'x')
#> [1] "z" "y" "x" "d"

```

### Add new values to a vector

New values can be assigned to a vector using the `c()` function, just like with vector creation. Two different vectors can be combined using the `c()` function as well

```r
vector_6 <- c(vector_6, 'a')
#> [1] "z" "y" "x" "d" "a"

vector_6 <- c(vector_6, c('b', 'c'))
#> [1] "z" "y" "x" "d" "a" "b" "c"
```

*Info: This operation isn't really adding the values to the `vector_6` vector. Instead, it is reassigning the value of `vector_6` to the vectors we've supplied. This is just a fun fact.*

### Named vectors

Each element in a vector can be given a unique name. This is a handy trick when we want to refer to elements of a vector as something other than their name. In the example below we will create a vector of color hex codes. Then assign each hex code the name of the color.

```r
color_vector <- c('#0000FF', '#008000', '#800080')
names(color_vector) <- c('blue', 'green', 'purple')

color_vector
#>      blue     green   purple
#> "#0000FF" "#008000" "800080"

# inspect the structure of color_vector
str(color_vector)
#> Named chr [1:3] "#0000FF" "#008000" "#800080"
#> - attr(*, "names")= chr [1:3] "blue" "green" "purple"

# the names of a vector can be accessed with the function names()
names(color_vector)
#> [1] "blue" "green" "purple"
```

Names are assigned to a vector with the `names()` function, then assigning the vector `c('blue', 'green', 'purple')` to the vector. As you can see by printing `color_vector`, each hex code now has a color name associated with it. 

The results of the `str()` function show an addition attribute of the vector. There is an attribute,  `attr`, called names. This is additional metadata associated with the vector.

### Logical subsetting

We can subset vectors by using any of the logical operators to identify values within a vector that match the specified condition. Here is a list of logical operators (or boolean operators) available in R: 

* `>`: greater than
* `<`: less than
* `>=`: greater than or equal to
* `<=`: less than or equal to
* `==`: equal to
* `!=`: not equal to
* `%in%`: in a vector of possibilities

We can use these operators to check if values meet a certain condition. The return of boolean operators is always `TRUE` or `FALSE`, a logical value.

```r
10 > 1
#> [1] TRUE

1 > 10
#> [1] FALSE

green <- 'green'
'green' ==  green
#> [1] TRUE

'green' != green
#> [1] FALSE
```

R allows us to check an entire vector against a boolean condition thanks to vectorization! The results of this operation is a vector of logical values (`TRUE` or `FALSE`) for each index. `TRUE` for the indices that match the condition, and false for those that don't. In the code block below I'm going to use the `:` which is a shortcut for generating a sequence of numbers that increment by 1.

```r
# create a sequence of numbers from 101 to 106
x <- 101:106

# apply boolean logic
x > 103
#> [1] FALSE FALSE FALSE  TRUE  TRUE  TRUE

x >= 103
#> [1] FALSE FALSE TRUE  TRUE  TRUE  TRUE

x == 103
#> FALSE FALSE TRUE FALSE FALSE FALSE

x != 103
#> [1] TRUE TRUE FALSE TRUE TRUE TRUE
```

All of the examples above return a logical vector that is equal to the length of the vector we are checking (the length of `x` here is 6). We can use this logical vector to subset our original vector, `x`, to return only the values we specify with our boolean operator. 

Remember from the section on indexing that we use the `[ ]` to return elements based on the their index. We will use the square brackets again here to return a subset of a vector that match our logical criteria.

```r
# 1. create a logical vector
logical_vector <- x > 103
logical_vector
#> [1] FALSE FALSE FALSE  TRUE  TRUE  TRUE

# 2. identify which indices are true
indices <- which(logical_vector)
indices
#> [1] 4 5 6

# 3. now subset x using the indices variable
x[indices]
#> [1] 104 105 106
```

Hopefully you all were able to follow along. If not, don't worry. Work through it again, think about what is happening in each line of code. Read each line out loud and think about what the result of each line will be. Let's walk through each line now.

1. In step one we are asking what values of `x` are greater than (`>`) 103. R checks each element in `x` and returns a logical vector of `TRUE`/`FALSE` values and assigns it to the variable `logical_vector`, which looks like this `FALSE FALSE FALSE TRUE TRUE TRUE`.
2. `which()` is a function that returns the indices of a logical vector (`logical_vector`) that are `TRUE`. In this case, those are indices 4, 5, and 6. This is assigned to the variable `indices`.
3. Finally, we subset our original vector `x` by the indices specified in the variable `indices`, which are indices 4, 5, and 6. This returns the values in the vector that are over 103. 

We don't need to include all these intermediate steps to get the same answer. One of the great things about R is there are many different ways to get the same answer, no single method is the correct method. There might be better methods, but not always a correct method. The code below returns the same answer with a single line of code. 

```r
x[x > 103]
#> [1] 104 105 105
```

This is possible because subsetting with the square brackets works with a logical vector where the length is equal to the original vector. So we can use the `logical_vector` variable from above to subset `x`. And the `logical_vector` variable contains the results of our initial boolean operation, `x > 103`. Therefore the code chunk above is a shorter, quicker way of achieving the same exact results. 

In the code chunk below you can see that it is possible to subset a vector with a logical vector. Thus, making the `which()` function call unnecessary.

```r
x[c(FALSE, FALSE, FALSE, TRUE, TRUE, TRUE)]
#> [1] 104 105 106
```

## Summary of vectors

That is a lot of detail for such an apparently simple object. But now you have a thorough understanding of what vectors are and how to work with them. Understanding the other data structures in R will be easier since vectors are the building blocks of nearly all the other data structures in R. All the principles above will be rehashed again, and again in the following sections about matrices, lists, and data frames.

I probably likely missed a lot of details of vectors in this guide. If you can think of any please leave a comment so that I can add it to this guide. 

I'm thinking of putting together another post about fun applications or tricks with vectors. If you can think of any, please leave a comment.

Thanks for reading!

## Cheat Sheet

```r
# create a vector
c(2, 4, 6)
2:6
seq(2, 6, by = 2)
rep(2:3, times = 3)
rep(2:3, each = 3)

# subset vectors
x <- 11:15
#> [1] 11 12 13 14 15

## by element
x[4]
#> [1] 14

x[-4]
#> [1] 11 12 13 15

x[1:2] 
#> [1] 11 12

x[c(1, 5)]
#> [1] 11 15

## by value
x[x == 14]
#> [1] 14

x[x > 13]
#> [1] 14 15
```
