<template>
  <div class="container">
    <div class="title center">Td03 - Firebase</div>
    <hr />
    <h5>Firebase - Se connecté</h5>
    <form @submit.prevent="onCnx()">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button class="btn btn-dark">Email :</button>
        </div>
        <input type="text" class="form-control" v-model="user.email" required />
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button class="btn btn-dark">Mot de passe :</button>
        </div>
        <input
          type="text"
          class="form-control"
          v-model="user.password"
          required
        />
      </div>

      <div class="alert alert-warning text-center mb-3" v-if="message != null">
        {{ message }}
      </div>

      <div>
        <button class="float-left" @click="onDcnx">Deconexion</button>
        <button class="float-right" variant="dark" type="submit">
          Connexion
        </button>
      </div>
    </form>
    <hr class="mb-5" style="clear: both" />

    <div>
      <h5>Liste des pays - Simple liste</h5>
    </div>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th class="col">Id</th>
          <th class="col">nom</th>
          <th class="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pays in listePays" :key="pays.id">
          <td>{{ pays.id }}</td>
          <td>{{ pays.nom }}</td>
          <td>-</td>
        </tr>
      </tbody>
    </table>
    <hr class="mb-5" style="clear: both" />

    <div>
      <h5>Liste des pays - Liste synchronisée</h5>
    </div>

    <form class="mb-3">
      <h6>Nouveau pays</h6>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text btn-dark">Nom</span>
        </div>
        <input type="text" class="form-control" v-model="nom" required />
        <button
          class="btn btn-dark"
          type="button"
          @click="createPays()"
          title="Création"
        >
          <i class="fa fa-lg fa-save"></i>
        </button>
      </div>
    </form>

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th class="col">Id</th>
          <th class="col">nom</th>
          <th class="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pays in listePaysSynchro" :key="pays.id">
          <td>{{ pays.id }}</td>
          <td>
            <input type="text" v-model="pays.nom" />
          </td>
          <td>
            <button class="btn dark" @click.prevent="updatePays(pays)">
              <i class="fa fa-lg fa-edit"></i>
            </button>
            <button class="btn dark" @click.prevent="deletePays(pays)">
              <i class="fa fa-lg fa-save"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";

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
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      message: null,
      listePays: [],
      nom: null,
      listePaysSynchro: [],
    };
  },
  methods: {
    onCnx() {
      signInWithEmailAndPassword(getAuth(), this.user.email, this.user.password)
        .then((response) => {
          console.log("user connecté", response.user);
          this.user = response.user;
          this.message = "user connecté :" + this.user.email;
        })
        .catch((error) => {
          console.log("Erreur de connexion", error);
          this.message = "Erreur d'authentification";
        });
    },

    onDcnx() {
      signOut(getAuth())
        .then((response) => {
          this.user = getAuth().onAuthStateChanged;
          this.user = {
            email: null,
            password: null,
          };
          console.log("l'utilisateur décconecté", this.user);
          this.message = "utilisateur non connecté";
        })
        .catch((error) => {
          console.log("Erreur de déconnexion", error);
        });
    },

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
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        this.user = user;
        this.message = "User déjà connecté : " + this.user.email;
      } else {
        this.message = "User non connecté : ";
      }
    });

    this.getPays();
    this.getPaysSynchro();
  },
};
</script>

<style scoped>
td,
th {
  color: white;
}
</style>