<template>
  <div class="post-list-item">
    <div class="post-list-item__left">
      <g-link :to="post.path" class="post-list-item__link">
        <p class="post-list-item__title">{{ post.title }} </p>
      </g-link>
    </div>
    <div class="post-list-item__right">
      <p class="post-list-item__date">{{ post.date }} </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['post']
}
</script>

<style lang="scss" scoped>
.post-list-item {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  background-color: #ffffff;
  padding-left: 3.5rem;
  padding-right: 3.5rem;
  padding-top: .15rem;
  padding-bottom: 0;
  margin-bottom: .15rem;

  &__title {
    font-size: 1.1rem;
    font-weight: 300;

    &:hover {
      color: green;
      text-decoration: underline;
    }
  }

  &__link {
    font-size: 1.1rem;
    font-weight: 300;
    color: #3d3c3d;
    text-decoration: none;
  }

  &__date {
    color: #6d6d6d;
    font-size: 1rem;
    font-weight: 300;
    font-family: monospace;
  }

  p {
    padding-bottom: 0;
    margin-bottom: 0;
  }
}

@media (max-width: 600px) {
  .post-list-item {
    flex-direction: column;
    justify-content: space-between;
    // padding-left: 1rem;
    // padding-right: 1rem;

    &__date {
      font-size: .85rem;
    }
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  .post-list-item {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
