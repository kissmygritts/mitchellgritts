<template>
  <Layout :show-logo="false">
    <!-- Author intro -->
    <Author :show-title="true" />
    
    <!-- List posts -->
    <section class="post-list">
      <h2 class="post-list__title">Posts</h2>
      <PostListItem v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node" />
    </section>

  </Layout>
</template>

<page-query>
{
  posts: allPost (
    sortBy: "date",
    order: DESC,
    filter: { published:{ eq: true }}
  ) {
    edges {
      node {
        id
        title
        path
        date (format:"YYYY-MM-DD")
      }
    }
  }
}
</page-query>

<script>
import Author from '~/components/Author.vue'
import PostCard from '~/components/PostCard.vue'
import PostListItem from '~/components/PostListItem.vue'

export default {
  components: {
    Author,
    PostCard,
    PostListItem
  },
  metaInfo: {
    title: 'Mitchell Gritts'
  }
}
</script>

<style lang="scss" scoped>
.post-list {
  max-width: 860px;
  margin: 0 auto;
  padding-bottom: 1.5rem;
  background-color: #ffffff;
  border-radius: 5px;

  &__title {
    font-size: 1.15rem;
    font-weight: 400;
    padding: 1rem 0 0 3.5rem;
    margin-bottom: 0;
  }
}
</style>
