<template>

  <div id="post-list">
      <div v-for="post in posts" :key="post.node.id">
        <div class="post-link" :to="post.node.path">

          <span class="date">{{ post.node.datetime }}</span>
          <g-link 
            :to="post.node.path"
            class="title h5">
            {{ post.node.title }}
          </g-link>

        </div>
      </div>
  </div> 
 
</template>

<script>
export default {
  name: 'PostList',
  props: {
    posts: Array
  }
}
</script>

<style scoped>
.post-link {
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: .5em;
  align-items: baseline;
}

.date {
  font-family: monospace;
  color: var(--gray);
  margin-right: 2em;
}

.title {
  flex-grow: 1;
  margin: 0;
}

@media screen and (min-width: 769px) {
  .post-link {
    flex-direction: row;
    align-content: stretch;
  }
}
</style>
