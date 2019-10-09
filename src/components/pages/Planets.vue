<template>
    <div class="main-planet">
        <div class="list">
            <ui>
                <li v-for="(planet, index) in planets" :key="index" @click="openCards(index)"
                    :class="{'selected': select===index}">{{planet.name}}
                </li>
            </ui>
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
        let residents = this.planets[index] ? this.planets[index].residents : [],
          me = this;
        this.select = index
        this.loading = true
        this.people = []
        Axios.all(residents.map(v => {
          return Axios.get(v)
        }))
          .then(response => {
            me.loading = false
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
      let me = this;
      Axios
        .get('https://swapi.co/api/planets/')
        .then(response => {
          me.planets = response.data.results
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
    }

    li {
        border-collapse: collapse;
        border: solid;
        border-width: 1px;
        cursor: pointer;
    }

    li:hover {
        background-color: darkgrey;
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