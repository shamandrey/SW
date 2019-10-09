<template>
    <div id="app">
        <nav>
            <router-link to="/people">People</router-link>
            <router-link to="/planets">Planets</router-link>
            <router-link to="/starships">StarShips</router-link>
        </nav>
        <AdvertisingPlanetCard :population="population"
                               :randomIndex="randomIndex"
                               :rotation_period="rotation_period"
                               :diameter="diameter"
                               :name="name"
                               :image="image"/>
        <router-view/>
    </div>
</template>

<script>
  import AdvertisingPlanetCard from './components/AdvertisingPlanetCard.vue'
  import {randomInteger} from './utils/random'
  import Axios from 'axios'

  export default {
    name: 'app',
    data() {
      return {
        onePlanet: null,
        randomIndex: null,
        countPlanet: null,
        population: '', rotation_period: '', diameter: '', name: '', image: ''
      }
    },

    mounted() {
      this.getRandomPlanet();
      this.getInterval();
    },
    components: {
      AdvertisingPlanetCard: AdvertisingPlanetCard
    },
    beforeDestroy () {
      clearInterval(this.intervalid1)
    },
    methods: {
      getInterval() {
        let me = this
        me.intervalid1 = setInterval(me.getRandomPlanet, 10000);
      },
      getRandomPlanet(){
        Axios.defaults.headers.get['Content-Type'] ='application/x-www-form-urlencoded';
        let me = this,
          randomIndex
        if (me.countPlanet) {
          randomIndex = randomInteger(0, me.countPlanet)
          Axios.get(`https://swapi.co/api/planets/${randomIndex}/`)
            .then(response => {
            me.population = response.data.population;
            me.rotation_period = response.data.rotation_period;
            me.name = response.data.name;
            me.diameter = response.data.diameter;
            me.image = `https://starwars-visualguide.com/assets/img/planets/${randomIndex}.jpg`;
            me.onePlanet = response.data;
          })
          .catch((/*err*/) => {
            // handle err
          });
        } else {
          Axios
            .get(' https://swapi.co/api/planets')
            .then(response => {

              let data = response.data
              me.countPlanet = data.count
              randomIndex = randomInteger(0, me.countPlanet)
              me.randomIndex = randomIndex
              return Axios(`https://swapi.co/api/planets/${randomIndex}/`)

            })
            .then(response => {
              me.population = response.data.population;
              me.rotation_period = response.data.rotation_period;
              me.name = response.data.name;
              me.diameter = response.data.diameter;
              me.image = `https://starwars-visualguide.com/assets/img/planets/${me.randomIndex}.jpg`;
              me.onePlanet = response.data;
            })
            .catch((/*err*/) => {
              // handle err
            });
        }

      }
    }
  }

</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 60px;
    }

    body {
        background: rgba(74, 74, 74, 0.81);
        /*font-family: 'Montserrat', sans-serif;*/
        display: grid;
        grid-template-rows: auto;
        /*justify-items: center;*/
        padding-top: 50px;
    }

    nav {
        padding: 20px 20px 20px 0;
    }

    nav a {
        padding: 10px;
        text-decoration: none;
        background: #fff;
        border-radius: 3px;
        color: rgb(0, 110, 255);
        font-weight: bold;
        margin-right: 15px;
    }
</style>
