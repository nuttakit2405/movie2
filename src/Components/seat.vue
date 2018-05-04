<template>
  <div class="box">
        <template v-for="s in seats">
            <button :key='s.id'
                :class="className(s)"
                :disabled="s.seated"
                @click="chooseSeat(s)"
            >{{s.id}} {{s.price}}</button>
             <span :key='s.id'>&nbsp;</span>
        </template>
      
    </div>
</template>

<script>
import movie from 'other/movie.json'

export default {
    props: [ 'movieId', 'selectSeats', 'firebaseSeats' ],
    methods: {
        className(seat) {
            const ids = this.selectSeats.map(s => s.id)
            const idx = ids.indexOf(seat.id)

            const firebaseIds = this.firebaseSeats.map(s => s.id)
            const firebaseIdx = firebaseIds.indexOf(seat.id)

            return [
                'button',
                { 
                  'is-danger': seat.seated,
                  'is-primary': idx != -1,
                  'is-warning': firebaseIdx != -1 && idx === -1
                 }
            ]
        },
        chooseSeat(seat) {
            this.$emit('chooseSeat', seat)
        }
    },
    computed: {
        seats() {
            return movie[this.movieId]
        }
    }
}
</script>
