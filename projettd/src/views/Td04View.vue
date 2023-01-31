<template>
  <div class="container">
    <div class="title center">Td04 - Stockage firebase</div>
    <hr />

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