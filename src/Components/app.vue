<template>
<div class="box">
    <h3 class="title">Title: {{ movieId }}</h3>
    <p>Count: {{ status.count }}, Price: {{ status.price }}</p>
    <movie @chooseMovie="handleChooseMovie" :movieId="movieId"></movie>
    <seat 
        :movieId="movieId"
        @chooseSeat="handleChooseSeat"
        :selectSeats="selectSeats"
        :firebaseSeats="firebaseSeats"
    />
</div>  
</template>

<script>
import firebase from 'firebase'
import _ from 'lodash'

import Movie from 'Components/movie.vue'
import Seat from 'Components/seat.vue'
import { pushToArray } from 'other/lib'

const config = {
    databaseURL: "https://movie-firebase.firebaseio.com"  
}

firebase.initializeApp(config)

const db = firebase.database()

// const dbRef = db.ref('/').child('civilwar')
// dbRef.set('yyy')

export default {
    components: { Movie, Seat },
    data(){
        return {
            movieId: '',
            selectSeats: [],
            firebaseSeats:[],
            status: { count: 0, price: 0}
        }
    },
    methods: {
        handleChooseMovie(movieId){
            if (this.status.count){
                if (confirm('Data will be lost ?')){
                    this.status = {count: 0, price: 0}
                    this.selectSeats = []
                }else {
                    return false
                }
            }
            this.movieId = movieId

            const movieRef = db.ref('/').child(this.movieId)
            movieRef.on('value', snapshot => {
                console.log(snapshot.val())
                const seats = snapshot.val()

                this.firebaseSeats = []
                _.forOwn(seats, s => {
                    pushToArray(s, this.firebaseSeats)
                })
            })
        },

        handleChooseSeat(seat) {
            // const ids = this.selectSeats.map(s => s.id)
            // const idx = ids.indexOf(seat.id)

            // if (idx == -1) {
            //     this.selectSeats.push(seat)
            // }else{
            //     this.selectSeats.splice(idx, 1)
            // }
            pushToArray(seat, this.selectSeats)

            const movieRef = db.ref('/').child(this.movieId)
            movieRef.push(seat)

            this.status = this.selectSeats.reduce((summary, s) => {
                summary.count ++
                summary.price += s.price

                return summary
            }, { count: 0, price: 0})
        }
    }
}
</script>
