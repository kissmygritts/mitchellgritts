<template>
  <layout>

    <article class="article">

      <div class="article__head">
        <h1 v-html="$page.post.title" />
        <p class="article__head--lighter">
          {{ $page.post.datetime }} 
          <span class="em-dash">&mdash;</span>
          {{ $page.post.timeToRead }} min. to read
        </p>
      </div>

      <div class="article__content" v-html="$page.post.content" />
    </article>

  </layout>

</template>

<script>
</script>

<style scoped>
.article {
  margin: 2em 0 4em 0;
}

.article__head--lighter {
  color: var(--gray);
}

.em-dash {
  margin-left: 0.5em;
  margin-right: 0.5em;
}
</style>

<page-query>
query Post ($path: String) {
  post (path: $path) {
    title
    path
    datetime: date (format: "MMM. DD, YYYY")
    content
    timeToRead
  }
}
</page-query>