<template>
<div class="box">
    <h3 class="title">App: {{ movieId }}</h3>
    <movie @chooseMovie="handleChooseMovie" :movieId="movieId"></movie>
</div>  
</template>

<script>
import firebase from 'firebase'

import Movie from 'Components/movie.vue'
import Seat from 'Components/seat.vue'

const config = {
    databaseURL: "https://movie-firebase.firebaseio.com/"
}

firebase.initializeApp(config)

const db = firebase.database()

const dbRef = db.ref('/').child('civilwar')
dbRef.set('yyy')

export default {
    components: {Movie},
    data(){
        return {
            movieId: '',
            selectSeats: [],
            status: { count: 0, price: 0}
        }
    },
    methods: {
        handleChooseMovie(movieId){
            if (this.status.count){
                if (confrim('Data will be lost ?')){
                    this.status = {count: 0, price: 0}
                    this.selectSeats = []
                }else {
                    return false
                }
            }
            this.movieId = movieId
        }
    }
}
</script>
