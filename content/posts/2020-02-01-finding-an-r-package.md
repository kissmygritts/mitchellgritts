---
title: 'How I find an R package'
date: 2020-02-01
published: true
tags: ['r', 'programming']
canonical_url: false
description: 'How I find an R package, and encapsulate functions'
---

The other day I needed to generate [UUID's (universally unique identifier)](https://en.wikipedia.org/wiki/Universally_unique_identifier) for some database inserts. I couldn't think of a package off the top of my head. Off to Google I went.

There were several promising results.

1. [uuid](https://cran.r-project.org/web/packages/uuid/index.html)
2. [dpIR](https://cran.r-project.org/web/packages/dplR/index.html)
3. [ids](https://cran.r-project.org/web/packages/ids/index.html)
4. [This R-Bloggers post](https://www.r-bloggers.com/generate-uuids-in-r/)

Below I discuss the how I ultimately decided to use the `{uuid}` package to generate UUIDs.

## uuid

The `{uuid}` package is small. There is 1 function `UUIDgenerate`. It is important to check the package descriptions for information (see the code above for a truncated version). This package doesn't import any other packages, which is nice. However it uses a low version number (0.1-2) and was last published in 2015. That isn't very actively maintained. But, a UUID generate probably doesn't need to be updated very frequently. The author as a r-project.org email address. This is the organization that builds R. So he knows R well.

I even went so far as to check the [mirrored CRAN GitHub repo](https://github.com/cran/uuid) for this package. The actual code that generates the UUIDs is written in C then called from R. Cool, it'll be fast.

But how is the interface? The only parameter is `use.time` and it can be `NA`, `TRUE`, or `FALSE`. Pretty easy. Depending on the input provided to this parameter it will generate a v4 or v1 UUID. This isn't super important for my applications. I do, however, like to generate v4 UUIDs for consistency between all the different languages, databases I use.

```r
uuid::UUIDgenerate(use.time = NA)
#> [1] "da84f022-2ee1-4221-898c-c0f580a12c7a"

uuid::UUIDgenerate(use.time=F)
# > [1] "9781816b-d5b1-45a3-b90d-a8136fe23392"

uuid::UUIDgenerate(use.time=T)
#> [1] "79d194fc-4510-11ea-bbdb-109add52c272"
```

Ulitmately I decided to use this package because of it's simplicity, C source code, and the author's affiliation with the R Project. 

### The contenders

`{dplR}` is a dendrochronolgy package that has many, many functions. I didn't want that much bloat in the package I was writing.

`{ids}` has functions that generate many different types of IDs. This might be useful in the future. But right now I only needed a UUID. The code that generates the UUID in this package [directly calls](https://github.com/cran/ids/blob/master/R/uuid.R#L34) the `{uuid}` package. Might as well go to the source.

The R-Bloggers post is short and instructive. However, UUIDs rely on very good random number generators and I don't trust R to do that [very well](https://gist.github.com/cbare/5979354#gistcomment-861634). Another important note is that this implementation uses `sample` which may cause problems if using `set.seed` on the randomness of the UUID.

## Encapsulate UUID generation

I need to generate UUIDs for each row in a `data.frame`. So I will need to loop over each row and generate a UUID. I wanted to make this process easier than `uuid::UUIDgenerate(...)` in a loop. So I wrote the following function.

```r
gen_uuid <- function (n) {
  v4 <- function (i) uuid::UUIDgenerate(use.time = F)
  vapply(seq_len(n), v4, character(1))
}

# usage example
df <- data.frame(
  x = sample(LETTERS, 5),
  y = runif(5)
)

df$uuid <- gen_uuid(nrow(df))

#>   x          y                                 uuid
#> 1 O 0.03186449 25febfb8-c175-46cd-8faf-6803089538c7
#> 2 N 0.97447114 879ec786-c53c-4cec-ba1b-8bab5faf4a77
#> 3 C 0.27902098 8e0ee5e2-545e-4d0e-b3a7-c22fc6a93db1
#> 4 G 0.76055082 a1ac592d-551c-4fdf-bcbb-bc86c424108c
#> 5 W 0.44379492 f88d8a9b-8716-4ee8-88ea-9ce4ff89d538
```

Yes. It might be overkill. But programming is all about making your life easier.

## Wrap up

So there you have it. My process of looking for a package. I don't always spend this much time trying to figure out which packages to use. In cases like this it was worth it. I don't want the package I am writing to rely on giant packages. Avoid the bloat!

One last tip. Try different search engines when looking for R packages. My default search engine is [DuckDuckGo](duckduckgo.com). It isn't the best at surfacing tech related results. When I initially searched for UUIDs with R it returned the `{dplR}` package. When I switched to Google the first result was the `{uuid}` package.