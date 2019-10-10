<template>
    <div class="main">
        <div class="list">
            <ul>
                <li v-for="(ship, index) in ships" :key="ship.id" @click="openShip(ship.id)" :class="{'selected': select===index}">{{ship.name}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
  import Axios from 'axios'
  export default {
    data() {
      return {
        ships: [],
        select: undefined
      }
    },

    methods: {
      openShip(id) {
        this.$router.push({
          name: 'starship',
          params: {id: id}
        }).catch(e => { e
          // eslint-disable-next-line
//      debugger

        });


      }
    },

    mounted() {
      Axios
        .get('https://swapi.co/api/starships/ ')
        .then(response => {
          this.ships = response.data.results.map(v => {
            v.id = v.url.replace(/https:\/\/|http:\/\//, '')
              .split('/')
              .filter(v => v)
              .pop()
            return v;
          })
          // eslint-disable-next-line
        }).catch(e=> console.log(e))
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .main {
        text-align: left;
        display: flex;
        margin-top: 50px;
        height: 200px;
    }

    .selected {
        background-color: aqua;
    }

    .list {
        width: 100%;
        background-color: #b4b4b4;
        overflow-x: overlay;
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

    li {
        border-collapse: collapse;
        border: solid;
        border-width: 1px;
        cursor: pointer;
    }

    li:hover {
        background-color: darkgrey;
    }
</style>
