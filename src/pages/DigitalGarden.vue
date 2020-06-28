<template>
  <div class="main">
    <!-- about digital garden section -->
    <div>
      <h1>Digital Garden</h1>

      <p>
        Below is my <a href="https://joelhooks.com/digital-garden">digital garden</a>.
        A  collection of notes, thoughts, and work that I'm currently cultivating. Seedling. 
        These notes are almost always a work in progress. Snapshots of my current work in progress. 
        Eventually some of these ideas will coalesce into forest of content.
      </p>
      <p>
        In the meantime they will continue to be my attempt to <a href="https://chriscoyier.net/2012/09/23/working-in-public/">work</a>
        and <a href="https://www.swyx.io/writing/learn-in-public">learn</a> in public.
      </p>
    </div>
    <!-- posts -->
    <section
      class="topic"
      v-for="topic in $page.allTopic.edges"
      :key="topic.node.title"
    >
      <div class="topic__header">
        <h2 class="topic__title h5">{{ topic.node.title }}</h2>
      </div>

      <!-- articles within a topic -->
      <article
        class="topic__post"
        v-for="article in topic.node.belongsTo.edges"
        :key="article.node.id"
      >
        <g-link
          :to="article.node.path"
          class="h5"
        >
          {{ article.node.title }}
        </g-link>
      </article>
    </section>
  </div>
</template>

<page-query>
query {
  allTopic {
    edges {
      node {
        title
        path
        belongsTo {
          totalCount
          edges {
            node {
              ... on DigitalGarden {
                id
                title
                path
                stage
              }
            }
          }
        }
      }
    }
  }
}
</page-query>

<script>
export default {

}
</script>

<style scoped>
.main {
  max-width: 35em;
  margin: 0 auto;
  padding: 4em 0;
}

.topic {
  margin-top: 2em;
}

.topic__title {
  padding: 0;
  margin: 1.25em 0 0 0;
  text-transform: uppercase;
  letter-spacing: .125em;
}

.topic__post {
  padding: .5em 0 0 1.25em;
}
</style>