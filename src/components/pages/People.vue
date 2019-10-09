<template>
<div class="main-people">
    <div class="list">
        <ul>
            <li v-for="(man, index) in people" :key="index" @click="openCard(index)" :class="{'selected': select===index}">{{man.name}}</li>
        </ul>
    </div>
    <div class="card">
        <person-card  v-if="person" :person="person"></person-card>
        <div v-else>Нет данных для отображения.</div>

    </div>
</div>
</template>
<script>
  import Axios from 'axios'
  import PersonCard from '../PersonCard.vue'
export default {
  data() {
    return {
      people: [],
      select: -1,
      person: undefined
    }
  },
  components: {
    PersonCard: PersonCard
  },

  methods: {
    openCard(index) {
      this.person = this.people[index]
      this.select = index

      // eslint-disable-next-line
//      debugger
    }
  },

  mounted() {
    //let me = this;
    Axios
      .get('https://swapi.co/api/people/')
      .then(response => {
        this.people = response.data.results
        // eslint-disable-next-line
      }).catch(e=> console.log(e))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .main-people {
        text-align: left;
        display: flex;
        height: 200px;
        margin-top: 50px;
    }

    .selected {
        background-color: aqua;
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

    .list {
        width: 50%;
        background-color: #b4b4b4;
	overflow-x: overlay;
    }

    li {
        border-collapse: collapse;
        border: solid;
        border-width: 1px;
        cursor: pointer;
    }
    .card {
        display: flex;
        flex-direction: column;
        padding: 5px;
        overflow: auto;
        height: auto;
        flex: 1;
        margin-left: 10px;
        background-color: #b4b4b4;

    }

    .card > * {

        margin: 5px;
    }
    li:hover {
        background-color: darkgrey;
    }
</style>
