<template>
    <div id="app">
        <p class="title">Hola {{ name }}</p>
        <hr>
        <input v-model="userName">
        <button @click="addUser">Añadir</button>
        <hr>
        <user v-for="user in users" :name="user" @buttonPressed="sayHello"></user>
    </div>
</template>

<script>

import User from './User.vue'

export default {
    name: 'app',
    components: {
        User
    },
    data () {
        return {
            name: 'Laraveles',
            userName: '',
            users: []
        }
    },
    methods: {
        addUser() {
            this.users.push(this.userName)
            this.userName = ''
        },
        sayHello(name) {
            this.name = name
        }
    }
}
</script>

<style>
.title {
    text-align: center;
    color: red;
}
</style>
