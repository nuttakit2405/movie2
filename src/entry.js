import Vue from 'vue'
import App from 'Components/app.vue'

new Vue({
    el: '#app',
    render (createElement){
        return createElement(App)
    }
})