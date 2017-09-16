<template>
  <div id="app">
    <div class="text-center">
      <img src="./assets/logo.png">
    </div>

    <counter></counter>
  </div>
</template>

<script>
import Counter from './components/Counter.vue'
export default {
  name: 'app',
  components: {
    Counter
  }
}
</script>

