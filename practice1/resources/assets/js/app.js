
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//Vue.component('example', require('./components/Example.vue'));

//TODO First Component (global) -- inline
//TODO v-model => Associate data with model (bidireccional)
Vue.component('first-component', {
    template: `<div>
                    <div v-if="showMessage"><input type="text" v-model="message"></div>
                    <div v-if="! showMessage">{{ message }}</div>
                    <ul>
                        <li v-for="fruit in fruits">{{ fruit }}</li>
                    </ul>
               </div>`,
    data: function(){
        return {
            message: 'Hello world',
            showMessage: true,
            fruits: [
                'Fruit1',
                'Fruit2',
                'Fruit3'
            ]
        }
    }
})

const app = new Vue({
    el: '#app'
});
