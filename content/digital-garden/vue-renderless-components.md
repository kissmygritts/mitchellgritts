---
title: "Vue renderless components"
date: 2020-06-27
published: true
topic: 'vue'
stage: 'seeling'
---

Renderless components are used to encapsulate the interactions and state while leaving the styling up to the user. 

There are two really good sources for this information: 

1. Adam Wathan's post: [Renderless Components in Vue.js](https://adamwathan.me/renderless-components-in-vuejs/)
2. Post on vuejsdevelopers.com: [Extending Vue.js components](https://vuejsdevelopers.com/2017/06/11/vue-js-extending-components/#renderless-components)

The general idea is to use `v-slot` and *scoped slots* to make state of the child component available to the parent component. A very simple example: 

```js
export default {
  data: () => ({
    count: 0
  }),
  methods: {
    increment() {
      this.count++;
    }
  },
  computed: {
    double () {
      return this.count * 2;
    }
  },
  render() {
    return this.$scopedSlots.default({
      count: this.count,
      double: this.double,
      increment: this.toggleState,
    })
  }
}
```

Now the `count`, `double`, and `increment` are available in the parent by destructuring within a `v-slot={ count, double, increment }` on the component in the parent:

```vue
<template>
  <counter-renderless v-slot="{ count, double, increment }">
    <div>Count is: {{ count }}</div> 
    <div>Double is: {{ double }}</div>
    <button @click="increment">Increment</button>
  </counter-renderless>
</template>

<script>
import CounterRenderless from "./CountRenderless";
export default {
  components: {
    CounterRenderless
  }
}
</script>
```