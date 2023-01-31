<template>
  <div class="container">
    <div class="title center">
      Tp 02 - Ajax, propriétés calculée et filtrage
    </div>
    <hr />
    <div class="form-control">
      <select
        v-model="catSelect"
        class="form-select"
        aria-label="Default select example"
      >
        <option v-for="cat in listeCat" :key="cat.id" :value="cat.id">
          {{ cat.lib }}
        </option>
      </select>
    </div>
    <hr />
    <div class="cardFilm">
      <div
        class="card"
        style="width: 18rem"
        v-for="video in searchBycatec"
        :key="video.id"
        v-on:click="select(video), viewDetails = !viewDetails"
      >
        <img :src="video.image" class="card-img-top" :alt="video.nom" />
        <div class="card-body">
          <p class="card-text title_film">
            {{ video.titre }}
          </p>
          <div class="film" v-if="viewDetails">
            <p>année: {{ videoSelect.annee }}</p>
            <p>Durée: {{ videoSelect.duree }} minutes</p>
            <p>Synopsis: {{ videoSelect.synopsis }}</p>
            <h5>Acteurs</h5>
            <ul>
              <li v-for="acteurs in videoSelect.lesActeurs">{{ acteurs.prenom }} {{ acteurs.nom }}</li>
            </ul>
            <h5>Réalisé par</h5>
            <ul>
              <li v-for="realisateurs in videoSelect.lesRealisateurs">{{ realisateurs.prenom }} {{ realisateurs.nom }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import axios from "axios";
export default {
  name: "Tp02View",
  data() {
    return {
      listeVideo: [],
      listeCat: [],
      catSelect: 0,
      viewDetails: false,
      videoSelect: {
        titre: null,
        image: null,
        annee: 0,
        durer: 0,
        synopsis: null,
        lesActeurs: null,
        lesRealisateurs: null
      },
    };
  },
  computed: {
    searchBycatec() {
      if (this.catSelect != 0) {
        let cat = this.catSelect;
        return this.listeVideo.filter(function (video) {
          let trouve = false;
          video.lesCategories.forEach(function (c) {
            if (c.id == cat) {
              trouve = true;
            }
          });
          return trouve;
        });
      } else {
        console.log("catSelect=0");

        return this.listeVideo;
      }
    },
  },
  mounted() {
    console.log("la vu est monté");
    axios
      .get("https://jsonvideo.jmfino.fr/listeVideo.php")
      .then((response) => {
        console.log("response", response.data);
        this.listeVideo = response.data;
      })

      .catch(function (error) {
        console.log("erreur ajax", error);
      }),
      axios
        .get("https://jsonvideo.jmfino.fr/listeCategorie.php")
        .then((response) => {
          console.log("response", response.data);
          this.listeCat = response.data;
        })

        .catch(function (error) {
          console.log("erreur ajax", error);
        });
  },
  methods: {
    select: function(video){
      this.videoSelect=video;
      console.log("Video recupéré", this.videoSelect);
    }
  }
};
</script>

<style>
.card{
  margin: 2px;
}
.cardFilm{
  display: flex;
  flex-wrap: wrap;
}

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

.title_film {
  text-align: center;
  color: black;
}

.film{
  color: black;
}
</style>