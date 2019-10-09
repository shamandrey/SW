<template>
    <div class='main-planet'>

        <div class='ava-planet'>
            <img :src='image' :alt="name">
        </div>
        <div class='card'>
            <div class='planet-name'>
                {{ name }}
            </div>
            <div class='attr'>
                <ui>
                    <li><span>Population :</span>{{ population }}</li>
                    <li><span>Rotation period :</span>{{ rotation_period }}</li>
                    <li><span>Diameter :</span>{{ diameter }}</li>

                </ui>
            </div>
        </div>
    </div>
</template>

<script>


  export default {
    props: ['population', 'randomIndex', 'rotation_period', 'diameter', 'name', 'image'],
    data() {
      return {
        planets: 'https://starwars-visualguide.com/assets/img/planets/',
        pending_shots: [],
        test: this.randomIndex
      }
    },
    beforeCreate() {

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .main-planet {
        background-color: #b4b4b4;
        display: flex;
        width: 100%;
    }

    .planet-name {
        font-size: 20pt;
    }

    .ava-planet {
        display: block;
        padding: 5px 0px 0px 5px;
        flex: 0.1;
    }

    .ava-planet > img {
        border-radius: 12px;
        width: 100%;
        line-height: 50px;
        text-align: center !important;
        line-height: -moz-block-height;
    }

    .card {
        padding: 0px 0px 0px 20px;
        text-align: left;
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