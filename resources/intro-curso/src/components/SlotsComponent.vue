<template>
  <div class="slots-component">
    <h2>Componentes con Slots en Vue.js 2</h2>
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot text="hola slot"></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
  export default {

  }
</script>
