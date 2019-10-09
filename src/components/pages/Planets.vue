<template>
    <div class="main-planet">
        <div class="list">
            <ul>
                <li v-for="(planet, index) in planets" :key="index" @click="openCards(index)"
                    :class="{'selected': select===index}">{{planet.name}}
                </li>
            </ul>
        </div>
        <div class="cards">
            <div v-if="people.length===0&&select>=0&&loading===false">Безжизненный кусок камня.</div>
            <div v-if="loading===true">Загрузка данных</div>
            <div v-if="people.length===0&&select===-1">Выберите планету</div>
            <person-card v-for="(man, index) in people" :key="index" v-else :person="man"></person-card>
        </div>
    </div>
</template>
<script>
  import Axios from 'axios'
  import PersonCard from '../PersonCard.vue'
  export default {
    data() {
      return {
        planets: [],
        people: [],
        select: -1,
        loading: false
      }
    },
    components: {
      PersonCard: PersonCard
    },
    methods: {
      openCards(index) {
        let residents = this.planets[index] ? this.planets[index].residents : []
        this.select = index
        this.loading = true
        this.people = []
        Axios.all(residents.map(v => {
          return Axios.get(v)
        }))
          .then(response => {
            this.loading = false
            this.people = response.map(v => v.data)
            // eslint-disable-next-line
//            debugger;
          })
          .catch(e => {
            me.loading = false
            // eslint-disable-next-line
            console.log(e)
          })

//      debugger
      }
    },
    mounted() {
      Axios
        .get('https://swapi.co/api/planets/')
        .then(response => {
          this.planets = response.data.results
          // eslint-disable-next-line
        }).catch(e => console.log(e))
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .main-planet {
        text-align: left;
        display: flex;
        height: 200px;
        margin-top: 50px;
    }

    .selected {
        background-color: aqua;
    }

    .list {
        width: 50%;
        background-color: #b4b4b4;
        margin-right: 10px;
	overflow-x: overlay;
    }

    li {
        border-collapse: collapse;
        border: solid;
        border-width: 1px;
        cursor: pointer;
	list-style-type: none;
    }

    li:hover {
        background-color: darkgrey;
    }
    ul {
      display: block;
      list-style-type: disc;
      margin-block-start: 0em;
      margin-block-end: 0em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      padding-inline-start: 0px;
    }
    .cards {
        display: flex;
        flex-direction: column;
        padding: 5px;
        overflow: auto;
        height: auto;
        flex: 1;
        margin-left: 10px;
        background-color: #b4b4b4;
    }

    .cards > * {

        margin: 5px;
    }
</style>
