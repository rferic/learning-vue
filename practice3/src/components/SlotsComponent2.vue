<!-- TODO Slots => Create a layout -->
<template>
  <div class="slots-component">
    <h2>Slots v2</h2>

    <header>
      <slot name="header">

      </slot>
    </header>

    <main>
        <slot text="hello slot">

        </slot>
    </main>

    <footer>
        <slot name="footer">

        </slot>
    </footer>
  </div>
</template>

<script>
  export default {

  }
</script>
