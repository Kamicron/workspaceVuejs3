<template>
  <div class="container">
    <div class="card-header">
      <h5>Liste des pays</h5>
    </div>
    <hr />

    <form action="">
      <h6>Nouveau pays</h6>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">Nom</span>
        </div>
        <input type="text" class="form-control" v-model="nom" required />
        <button
          class="btn btn-light"
          type="button"
          @click="createPays()"
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
              <div class="float-left">Liste des pays actuels</div>
              <span class="float-right">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Filtrage</span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    v-model="nom"
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
          <tr v-for="pays in listePaysSynchro" :key="pays.id">
            <td>
              <form>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Nom</span>
                  </div>
                  <input type="text" class="form-control" data="{{pays.id}}" required />
                  <button class="btn btn-light" type="submit" title="Création" @click.prevent="updatePays(pays)">
                    <i class="fa fa-save fa-lg"></i>
                  </button>
                  <button class="btn btn-light" title="Suppression" @click.prevent="deletePays(pays)">
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
  name: "ListeView",
  data() {
    return {
      nom: null,
      listePaysSynchro: [],
    };
  },

  methods: {
    async getPays() {
      const firestore = getFirestore();
      const dbPays = collection(firestore, "pays");
      const query = await getDocs(dbPays);
      query.forEach((doc) => {
        let pays = {
          id: doc.id,
          nom: doc.data().nom,
        };
        this.listePays.push(pays);
      });
    },

    async getPaysSynchro() {
      const firestore = getFirestore();
      const dbPays = collection(firestore, "pays");
      const query = await onSnapshot(dbPays, (snaphost) => {
        this.listePaysSynchro = snaphost.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
    },

    async createPays() {
      const firestore = getFirestore();
      const dbPays = collection(firestore, "pays");
      const docRef = await addDoc(dbPays, {
        nom: this.nom,
      });
      console.log("docuement crée avec l'id: ", docRef.id);
    },

    async updatePays(pays) {
      const firestore = getFirestore();
      const docRef = doc(firestore, "pays", pays.id);
      await updateDoc(docRef, {
        nom: pays.nom
      })
    },
    
    async deletePays(pays) {
      const firestore = getFirestore();
      const docRef = doc(firestore, "pays", pays.id);
      await deleteDoc(docRef)

    },
  },

  mounted() {
    this.getPaysSynchro();
  }
};
</script>

<style>
</style>