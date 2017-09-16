<template>
  <div class="intro">
    <!--<h1>Intro component</h1>
    <p>{{ txt | reverse }}</p>
    <p @click="clickIntro(txt)">Pulsa aquí!</p>
    <ul v-if="users.length">
      <li v-for="user in users">
        {{ user.id }} - {{ user.name | reverse }}
      </li>
    </ul>
    <div v-else>
      No existen usuarios
    </div>

    <input v-model="userInput" />
    <p>{{ userInput }}</p>
    <button @click="showUserInput">Ver user input desde el componente</button>

    <ul>
      <li v-for="component in components">
        <button @click="changeComponent(component)">Componente: {{ component }}</button>
      </li>
    </ul>

    <transition name="fade">
      <component v-bind:is="currentView"></component>
    </transition>

    <child1 v-on:customEvent="fireCustomEvent" :text="'Hola Componente Child1'" :text2="currentView"></child1>
    -->

    <slots-component>
      <template scope="props">
        <h1 slot="header">
          Header del Slot
        </h1>
        <p>
          {{ props.text }}
        </p>
        <p>
          Segundo texto
        </p>
        <p slot="footer">
          Footer del Slot
        </p>
      </template>
    </slots-component>
  </div>
</template>

<script>
  import Child1 from './Child1.vue'
  import Child2 from './Child2.vue'
  import SlotsComponent from './SlotsComponent.vue'

  let myMixin = {
    data () {
      return {
        txt: 'Hola Mundo desde Intro'
      }
    },
    methods: {
      fireCustomEvent (text2) {
        console.log('fireCustomEvent')
        console.log(text2)
      }
    }
  }

  export default {
    mixins: [myMixin],
    components: {
      Child1, Child2, SlotsComponent
    },
    data () {
      return {
        txt: 'Hola Mundo desde Intro!!!!!',
        users: [],
        userInput: '',
        components: ['child1', 'child2'],
        currentView: 'child1'
      }
    },
    methods: {
      clickIntro (txt) {
        console.log(txt)
      },
      showUserInput () {
        console.log(this.userInput)
      },
      changeComponent (cmp) {
        this.currentView = cmp
      },
      fireCustomEvent (text2) {
        console.log('fireCustomEvent from component')
        console.log(text2)
      }
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
    display: none;
  }
  .fade-leave-active {
    opacity: 0.8
  }
</style>
