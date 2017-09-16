<!--TODO First Component -->
<template>
  <div class="intro">
    <h1>Intro component</h1>
    <p>
      {{ txt }}
    </p>

    <!-- TODO Use filter -->
    <p>
      {{ txt | reverse }} <i>(Filter Component)</i>
    </p>

    <!-- TODO Use external filter -->
    <p>
      {{ txt | reverse2 }} <i>(Filter Global)</i>
    </p>

    <!-- TODO Event call Method -->
    <p v-on:click="clickIntro(txt)">Click here</p>

    <!-- TODO Shorthand for Event call Method -->
    <p @click="clickIntro(txt)">Click here <i>(Shorthand)</i></p>

    <!-- TODO Conditional (if & else) -->
    <ul v-if="users.length">
      <!-- TODO Iteration -->
      <li v-for="user in users">
        {{ user.name }} ({{ user.id }})
      </li>
    </ul>
    <p v-else>
      Users not found
    </p>

    <!-- TODO Two Way Binding -->
    <input v-model="userInput" />
    <p>
      {{ userInput }}
    </p>
    <button @click="showUserInput">Show User Input from Component</button>

    <!-- TODO Print Component between "''" -->
    <h1>Child Component Static</h1>
    <component v-bind:is="'child1'"></component>

    <h2>Child Component Static</h2>
    <ul>
      <li v-for="component in components">
        <button @click="changeComponent(component)">Component: {{ component }}</button>
      </li>
    </ul>

    <component v-bind:is="currentComponent" :text="'Hello'" :currentComponent="'child1'" v-on:customEvent="fireCustomeEvent"></component>

    <!-- TODO Transition change component -->
    <transition name="fade">
      <component :is="currentComponent" :text="'Hello'" :currentComponent="currentComponent" v-on:customEvent="fireCustomeEvent"></component>
    </transition>

    <!-- TODO v-on:{event} => Fire Parent Event -->
    <child1 :text="'Hello'" :currentComponent="'child1'" v-on:customEvent="fireCustomeEvent"></child1>

    <!-- TODO Slots => Print layour (slot) & Override content -->
    <slots-component>
      Override Content Slot
    </slots-component>

    <!-- TODO Slot maintance the Structure Slot (Order internal Slots how Slot) -->
    <slots-component2>
      <!-- TODO <template scope="props"> -->
      <!-- TODO Only require if we want access to Slot Params -->
      <template scope="props">
        <p slot="footer">
          Footer Slot
        </p>
        <h1 slot="header">Header of Slot2</h1>
        <p>
          <!-- TODO Print Param Slot -->
          {{ props.text }}
        </p>
        <p>
          Second text
        </p>
      </template>
    </slots-component2>
  </div>
</template>

<script>
  import Child1 from './Child1'
  import Child2 from './Child2'
  import SlotsComponent from './SlotsComponent'
  import SlotsComponent2 from './SlotsComponent2'

  let myMixin = {
    data () {
      return {
        txt: 'Hello World from Intro'
      }
    },
    methods: {
      fireCustomeEvent (param) {
        console.log('Fire Event Parent')
        console.log(`Param => ${param}`)
      }
    }
  }

  export default {
    components: {
      Child1, Child2, SlotsComponent, SlotsComponent2
    },
    // TODO mixins => Extend a Class
    mixins: [myMixin],
    data () {
      return {
        users: [
          {
            id: 1,
            name: 'John Snow'
          },
          {
            id: 2,
            name: 'Danaerys'
          },
          {
            id: 3,
            name: 'Arya'
          }
        ],
        userInput: '',
        components: ['child1', 'child2'],
        currentComponent: 'child1'
      }
    },
    // TODO Methods Component
    methods: {
      clickIntro (txt) {
        console.log(`Clicked! => ${txt}`)
      },
      showUserInput () {
        console.log(this.userInput)
      },
      changeComponent (component) {
        this.currentComponent = component
      }
    },
    // TODO Filters Component
    filters: {
      reverse (value) {
        return value.split('').reverse().join('')
      }
    },
    // TODO Use Hook Mounted
    // TODO Case: Recover users
    mounted () {
      this.users.push(
        {
          id: 4,
          name: 'Baelish'
        },
        {
          id: 5,
          name: 'James Lannister'
        }
      )
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
