<template>
  <div>
    <div class="title center">Tp 01 : Saisie de films dans un tableau</div>
    <hr />

    <h2>Saisie</h2>
    <form @submit.prevent="saisie" class="container">
      <p>
        Titre: <input v-model="titre" type="text" placeholder="Titre du film" />
      </p>
      <p>
        Année:
        <input v-model="annee" type="text" placeholder="Année du film" />
      </p>
      <p>
        Pays:
        <select v-model="pays">
          <option v-for="el in listePays" v-bind:key="el">{{ el }}</option>
        </select>
      </p>
      <p>
        Genre:
        <select v-model="genre">
          <option v-for="el in listeGenre" v-bind:key="el">{{ el }}</option>
        </select>
      </p>
      <button>Valider</button>
    </form>

    <hr />
    <ol>
      <h2>Liste des films saisis:</h2>
      <ol>
        <li v-for="el in liste" v-bind:key="el">id: {{ el.id }} - Titre: {{ el.titre }} - Année: {{ el.annee }} - Pays: {{ el.pays }} - genre: {{ el.genre }}</li>
      </ol>
    </ol>
    <hr />
  </div>
</template>


<script>
export default {
  data() {
    return {
      liste: [],
      id: 0,
      titre: "",
      annee: 0,
      pays: "",
      genre: "",
      listePays: ["Allemagne", "Australie", "France", "US"],
      listeGenre: [
        "Dramatique",
        "Comédie",
        "Fantastique",
        "Guerre",
        "Science-fiction",
      ],
    };
  },

  methods: {
    saisie: function () {
      let film = {
        id: 0,
        titre: "",
        annee: 0,
        pays: "",
        genre: "",
      };
      this.id++;
      film.id = this.id;
      film.titre = this.titre;
      film.annee = this.annee;
      film.pays = this.pays;
      film.genre = this.genre;

      this.liste.push(film);
    },
  },
};
</script>