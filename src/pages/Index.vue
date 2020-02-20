<template>
  <Layout class="layout" :show-logo="false">

    <section class="main">
      <g-image class="main__img img--round" alt="Example image" src="/nasa_250x250.jpg" />
      <div class="main__text">
        <h1>Hi, my name is <g-link to="/about">Mitchell Gritts</g-link></h1>
        <p class="h5">
          I'm a wildlife ecologist, data analyst, and developer based in Reno, Nevada
        </p>
      </div>
    </section>

    <section class="post-list">
      <h2>Posts</h2>
      <post-list class=""
                 :posts="$page.posts.edges" />
    </section>

  </Layout>
</template>

<script>
import PostList from '~/components/PostList.vue'

export default {
  components: {
    PostList
  },
  metaInfo: {
    title: '🤠 howdy!'
  }
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main__img {
  width: 200px;
  height: 200px;
  margin-top: 2em;
}

.main__text {
  text-align: center;
  margin-top: 2em;
  margin-bottom: 2em;
}

.main__text > p {
  margin-top: 1em;
}

.img--round {
  border-radius: 100%;
}

.post-list {
  max-width: 40em;
  margin: 0 auto;
  padding: 0 1em;
}

footer {
  color: var(--gray);
  margin: 4em auto 1em auto;
}
</style>

<page-query>
query {
  posts: allPost {
    edges {
      node {
        id
        title
        datetime: date (format: "YYYY-MM-DD")
        description
        path
      }
    }
  }
}
</page-query>