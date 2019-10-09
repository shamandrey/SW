<template>

    <div class='main-ship'>
<div class="container">
    <div class='ava'>
        <img src='https://v3toys.ru/kiwi-public-data/Kiwi_Img/86208.png'/>
    </div>
    <div class='card'>
        <div class='name'>
            {{ ship.name }}
        </div>
        <div class='attr'>
            <ui>
                <li><span>Model :</span>{{ ship.model }}</li>
                <li><span>Length :</span>{{ ship.length }}</li>
                <li><span>Cost :</span>{{ ship.cost_in_credits }}</li>
            </ui>
        </div>
    </div>
</div>
    </div>
</template>
<script>
  import Axios from 'axios'
  export default {
    props: ['ship'],
    mounted() {
      let me = this,
          id = this.$route.params.id
      Axios.get(`https://swapi.co/api/starships/${id}`)
        .then(response => {
          me.ship = response.data
        })
        .catch()
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .main-ship {
        text-align: left;
        display: flex;
        margin-top: 50px;
        height: 200px;
        width: 100%;
        background-color: #b4b4b4;
    }

    .container {
        /*background-color: red;*/
        display: flex;
        /*width: 100%;*/border-bottom: solid;
        border-bottom-width: medium;
        border-radius: 16px;
        border-left: solid;
        border-left-width: medium;
        border-width: 0px 1px 4px;
        height: max-content;
    }

    .name {
        font-size: 20pt;
    }

    .ava {
        display: block;
        width: 10%;
        padding: 5px 0px 0px 5px;
    }

    .ava > img {
        border-radius: 12px;
        width: 100%;
    }

    .card {
        padding: 0px 0px 0px 20px;
        text-align: left;
        display: flex;
    }

    ui {
        padding: 0px 0px 0px 20px;
        list-style: none;
        margin: 20px;
    }

    .attr {
        padding: 0px 0px 0px 20px;
    }

    ui > li {
        border-top: solid;
        border-width: 1px;
    }
</style>