<template>
  <div class="container">
    <div class="card-header">
      <h5>Liste des catégories</h5>
    </div>
    <hr />

    <form action="">
      <h6>Nouvelle catégorie</h6>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">Nom</span>
        </div>
        <input type="text" class="form-control" v-model="nom" required />
        <button
          class="btn btn-light"
          type="button"
          @click="createCat()"
          title="Création"
        >
          <i class="fa fa-save fa-lg"></i>
        </button>
      </div>
    </form>

    <div class="card-body table-responsive">
      <table class="table text-light">
        <thead>
          <tr>
            <th class="col">
              <div class="float-left">Liste des catégories actuels</div>
              <span class="float-right">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Filtrage</span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    v-model="searchTerm"
                    required
                  />
                  <button class="btn btn-light">
                    <i class="fa fa-search fa-lg"></i>
                  </button>
                </div>
              </span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="cat in filteredList" :key="cat.id">
            <td>
              <form>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Nom</span>
                  </div>
                  <input type="text" class="form-control" v-model="cat.nom" v-bin required />
                  <button class="btn btn-light" type="submit" title="Création" @click.prevent="updateCat(cat)">
                    <i class="fa fa-save fa-lg"></i>
                  </button>
                  <button class="btn btn-light" title="Suppression" @click.prevent="deleteCat(cat)">
                    <i class="fa fa-trash fa-lg"></i>
                  </button>
                </div>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";

export default {
  name: "CategotieView",
  data() {
    return {
      nom: null,
      listeCatsSynchro: [],
      searchTerm: '',
    };
  },

  computed: {
    filteredList() {
      return this.listeCatsSynchro.filter(cat => cat.nom.toLowerCase().includes(this.searchTerm.toLowerCase()))
    }
  },

  methods: {
    async getPays() {
      const firestore = getFirestore();
      const dbCat = collection(firestore, "categorie");
      const query = await getDocs(dbCat);
      query.forEach((doc) => {
        let pays = {
          id: doc.id,
          nom: doc.data().nom,
        };
        this.listecat.push(cat);
      });
    },

    async getCatSynchro() {
      const firestore = getFirestore();
      const dbCat = collection(firestore, "categorie");
      const query = await onSnapshot(dbCat, (snaphost) => {
        this.listeCatsSynchro = snaphost.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
    },

    async createCat() {
      const firestore = getFirestore();
      const dbCat = collection(firestore, "categorie");
      const docRef = await addDoc(dbCat, {
        nom: this.nom,
      });
      console.log("docuement crée avec l'id: ", docRef.id);
    },

    async updateCat(cat) {
      const firestore = getFirestore();
      const docRef = doc(firestore, "categorie", cat.id);
      await updateDoc(docRef, {
        nom: cat.nom
      })
    },
    
    async deleteCat(cat) {
      const firestore = getFirestore();
      const docRef = doc(firestore, "categorie", cat.id);
      await deleteDoc(docRef)

    },
  },

  mounted() {
    this.getCatSynchro();
  }
};
</script>

<style>
.table td,
.table th {
  border: none;
}
</style>