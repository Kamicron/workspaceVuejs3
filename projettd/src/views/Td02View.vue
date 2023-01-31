<template>
  <div>
    <div class="title center">Td 02 : Cycle de vie / Ajax</div>
    <hr />

    <h4>
      <span class="float-right">
        <i
          v-if="viewCard"
          class="fa fa-level-up"
          v-on:click="viewCard = !viewCard"
        >
          &UpArrow;</i
        >
        <i
          v-if="!viewCard"
          class="fa fa-level-up"
          v-on:click="viewCard = !viewCard"
        >
          &DownArrow;</i
        >
      </span>
      <span> cards villageois</span>
    </h4>
    <div v-if="viewCard" class="cardGlobal">
      <div
        class="card cardGaulois"
        v-for="villageois in liste"
        :key="villageois.id"
      >
        <img
          class="card-ilg-top center image"
          :src="villageois.image"
          :alt="villageois.nom"
        />
        <div class="card-body">
          <h5 class="card-title-titre">{{ villageois.nom }}</h5>
          <p class="card-text texte">
            {{ villageois.laSpecialite.nom }}
            <br />
            {{ villageois.leLieuHabitat.nom }}
          </p>
        </div>
      </div>
    </div>
    <hr />

    <h4>
      <span class="float-right">
        <i
          v-if="viewList"
          class="fa fa-level-up"
          v-on:click="viewList = !viewList"
        >
          &UpArrow;</i
        >
        <i
          v-if="!viewList"
          class="fa fa-level-up"
          v-on:click="viewList = !viewList"
        >
          &DownArrow;</i
        >
      </span>
      <span> Liste villageois</span>
    </h4>

    <ul v-if="viewList">
      <li v-for="villageois in liste" :key="villageois.id">
        {{ villageois.nom }} - {{ villageois.laSpecialite.nom }} -
        {{ villageois.leLieuHabitat.nom }}
      </li>
    </ul>
    <hr />

    <h4>
      <span class="float-right">
        <i
          v-if="viewFiltre_1"
          class="fa fa-level-up"
          v-on:click="viewFiltre_1 = !viewFiltre_1"
        >
          &UpArrow;</i
        >
        <i
          v-if="!viewFiltre_1"
          class="fa fa-level-up"
          v-on:click="viewFiltre_1 = !viewFiltre_1"
        >
          &DownArrow;</i
        >
      </span>
      <span> Filtrage par nom</span>
    </h4>
    <div v-if="viewFiltre_1">
      <div class="input-group">
        <input
          type="text"
          v-model="query"
          class="form-control"
          placeholder="recherche"
        />
        <div class="input-group-append">
          <span class="input-group-text"><i class="fa fa-search"></i></span>
        </div>
      </div>
      <div class="cardGlobal">
        <div class="card cardGaulois" v-for="villageois in searchByName" :key="villageois.id">
          <img
            class="card-ilg-top center image"
            :src="villageois.image"
            :alt="villageois.nom"
          />
          <div class="card-body">
            <h5 class="card-title-titre">{{ villageois.nom }}</h5>
            <p class="card-text texte">
              {{ villageois.laSpecialite.nom }}
              <br />
              {{ villageois.leLieuHabitat.nom }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <hr />

    <h4>
      <span class="float-right">
        <i
          v-if="viewFiltre_2"
          class="fa fa-level-up"
          v-on:click="viewFiltre_2 = !viewFiltre_2"
        >
          &UpArrow;</i
        >
        <i
          v-if="!viewFiltre_2"
          class="fa fa-level-up"
          v-on:click="viewFiltre_2 = !viewFiltre_2"
        >
          &DownArrow;</i
        >
      </span>
      <span> Filtrage par spéciliaté</span>
    </h4>
    <div v-if="viewFiltre_2">
      <p>tu te fous de moi ?</p>

      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">Spécialités</span>
        </div>
        <select v-model="spSelect">
          <option v-for="sp in listeSp" :key="sp.id" :value="sp.id">
            {{sp.nom}}
          </option>
        </select>
      </div>
      <div class="cardGlobal">
        <div class="card cardGaulois" v-for="villageois in searchBySpec" :key="villageois.id">
          <img
            class="card-ilg-top center image"
            :src="villageois.image"
            :alt="villageois.nom"
          />
          <div class="card-body">
            <h5 class="card-title-titre">{{ villageois.nom }}</h5>
            <p class="card-text texte">
              {{ villageois.laSpecialite.nom }}
              <br />
              {{ villageois.leLieuHabitat.nom }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <hr />
  
  </div>
</template>


<script>
// export default {
//   beforeCreate()  { console.log("Juste avant la création de la vue"); },
//   created()        { console.log("création de la vue"); },
//   beforeMount()    { console.log("Juste avant le montage de la vue"); },
//   mounted()       { console.log("montage de la vue"); },
//   beforeUpdat()  { console.log("Juste avant la MAJ de la vue"); },
//   updated()       { console.log("MAJ de la vue"); },
//   beforedestroy()  { console.log("Juste avant le demontage de la vue"); },
//   destroyed()      { console.log("demontage de la vue"); },

// };

import axios from "axios";
export default {
  data() {
    return {
      liste: [],
      viewList: false,
      viewCard: false,
      viewFiltre_1: false,
      viewFiltre_2:false,
      query: "",
      listeSp:[],
      spSelect:0,
    };
  },
  computed: {
    searchByName() {
      let query = this.query;
      return this.liste.filter(function (villageois) {
        return villageois.nom.includes(query);
      });
    },

    searchBySpec() {
      let sp = this.spSelect;
      return this.liste.filter(function (villageois) {
        return villageois.laSpecialite.id == sp;
      });
    },
  },
  mounted() {
    console.log("la vu est monté");
    axios
      .get("https://jsongaulois.jmfino.fr/listeVillageois.php")
      .then((response) => {
        console.log("response", response.data);
        this.liste = response.data;
      })

      .catch(function (error) {
        console.log("erreur ajax", error);
      }),
      axios
      .get("https://jsongaulois.jmfino.fr/listeSpecialites.php")
      .then((response) => {
        console.log("response", response.data);
        this.listeSp = response.data;
      })

      .catch(function (error) {
        console.log("erreur ajax", error);
      });
  },
  methods: {},
};
</script>

<style>
.center {
  text-align: center;
}
.title {
  font-size: 1.4rem;
  font-weight: 500s;
  margin-bottom: 0.4rem;
  color: #34495e;
}

h4 {
  font-weight: bold;
}

.cardGlobal {
  display: flex;
  flex-flow: row wrap;
  text-align: center;
  justify-content: space-around;
}

.cardGaulois {
  max-width: 170px;
  margin-top: 5px;
}

.image {
  min-height: 200px;
}
</style>