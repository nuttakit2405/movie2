<template>
<div class="box">
    <h3 class="title">{{ movieId }}</h3>
    <div class="columns">
        <div :key='m.id' v-for =" m in movies " :class= "className(m.id)" @click="chooseMovie(m.id)">
            <figure class="image">
                <!-- </img src="/movies/civilwar.jpg"> -->
                <img :src="imgSrc(m.id)">
                
            </figure>
        </div>    
    </div>    
</div>  
</template>

 <script>
 import { movies } from 'other/movie.json'

// console.log(movies)

export default {
    props: ['movieId'],
    data(){
        return{
            movies
        }
    },
    methods: {
        imgSrc(movieId) {
            return `/movies/${ movieId }.jpg`
        },
        chooseMovie(movieId){
            // console.log('OK')
            this.$emit('chooseMovie',movieId)
        },
        className(movieId){
            return [
                'column', 'pointer',
                { 'chosen': this.movieId === movieId}
            ]
        }
    },
    mounted() {
        this.chooseMovie(movies[0].id)
    }
}
 </script>

<style>
.pointer{
    cursor: pointer;
}
.chosen {
    border-style:solid;
}
</style>
