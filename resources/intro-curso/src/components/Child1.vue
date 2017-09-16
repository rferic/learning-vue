<template>
  <div class="child1">
    <h1>Child 1</h1>
    <p>{{ text }}</p>
    <p @click="$emit('customEvent', text2)">{{ text2 }}</p>
  </div>
</template>

<script>
  export default {
    props: ['text', 'text2']
  }
</script>
