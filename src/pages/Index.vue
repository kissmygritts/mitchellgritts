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
      <h2>Recent Posts</h2>
      <post-list class=""
                 :posts="$page.recentPosts.edges" />
    </section>

    <section class="post-list pad-top">
      <h2>Posts by Category</h2>
      <div
        v-for="category in $page.postByCategories.edges"
        :key="category.node.id"
      >
        <h3
          class="capitalize h4"
        >
          {{ category.node.title }}
        </h3>
        <post-list
          :posts="category.node.belongsTo.edges"
        />
      </div>
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

.capitalize {
  text-transform: capitalize;
}

.pad-top {
  padding-top: 3em;
}

footer {
  color: var(--gray);
  margin: 4em auto 1em auto;
}
</style>

<page-query>
query {
  recentPosts: allPost (
    sortBy: "date"
    limit: 5
  ) {
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
  
  postByCategories: allCategory (
    sortBy: "title"
  ) {
    edges {
      node {
        id
        title
        belongsTo {
          edges {
            node {
              ...on Post {
                id
                path
                title
                datetime: date (format: "YYYY-MM-DD")
              }
            }
          }
        }
      }
    }
  }
}
</page-query>