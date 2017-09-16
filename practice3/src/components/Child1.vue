<template>
  <div class="child1">
    <h2>Child 1</h2>
    <p>{{ text }} <strong>{{ currentComponent }}</strong></p>
    <!-- TODO $emit({event}, {param}) => Call Parent Method -->
    <p @click="$emit('customEvent', currentComponent)">Click for Call Parent Method</p>
  </div>
</template>

<script>
    export default {
      // TODO Declarate Params
      props: ['text', 'currentComponent']
    }
</script>
