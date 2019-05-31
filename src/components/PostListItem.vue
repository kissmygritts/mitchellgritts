<template>
  <div class="post-list-item">
    <div class="post-list-item__left">
      <g-link :to="post.path" class="post-list-item__link">
        <p class="post-list-item__title">{{ post.title }} </p>
      </g-link>
    </div>
    <div class="post-list-item__right">
      <p class="post-list-item__date">{{ post.date}} </p>
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
  justify-content: space-between;
  background-color: #ffffff;
  padding-left: 3.5rem;
  padding-right: 3.5rem;
  padding-top: .15rem;
  padding-bottom: 0;
  margin-bottom: 0;

  &__title {
    font-size: 1.1rem;
    font-weight: 300;
  }

  &__link {
    font-size: 1.1rem;
    font-weight: 300;
    color: #3d3c3d;
    text-decoration: none;
  }

  &__date {
    color: rgb(71, 71, 71);
    font-size: 1.1rem;
    font-weight: 300;
  }

  p {
    padding-bottom: 0;
    margin-bottom: 0;
  }
}
</style>
