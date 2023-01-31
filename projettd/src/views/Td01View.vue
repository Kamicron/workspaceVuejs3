<template>
  <div>
    <div class="title center">Td 01 : Les directives</div>
    <hr />
    <h4>Syntaxe simple data-binding (Lecture seule)</h4>
    <div>Résultat : {{ msg1 }}</div>
    <hr />
    <h4>V-bind</h4>
    <div v-bind:title="msg2">
      Résultat : passé la souris sur moi pendant quelque secodne pour afficher
      le titre
    </div>
    <hr />
    <h4>V-html</h4>
    <span>pas d'interpretation hmtl : {{ msg3 }}</span>
    <p>utilise V-html : <span v-html="msg3"></span></p>
    <hr />
    <h4>V-on et expression Javascript</h4>
    <button v-on:click="ok = true">Oui</button>
    <button v-on:click="ok = false">Non</button>
    <p>{{ ok ? "Oui" : "Non" }}</p>
    <hr />
    <h4>v-model</h4>
    <input type="text" v-model="saisie" />
    <br />
    <p>Message saisi : {{ saisie }}</p>
    <hr />
    <h4>v-show</h4>
    <button v-on:click="seen = !seen">valeur : {{ seen }}</button>
    <div v-show="seen">Résultat : Vous ne voyez que lorsque seen==true</div>
    <hr />
    <h4>v-if</h4>
    <button v-on:click="seen2 = !seen2">valeur : {{ seen2 }}</button>
    <div v-if="seen2">Résultat : Vous ne voyez que lorsque seen==true</div>
    <hr />
    <h4>v-if / v-else</h4>
    <input type="text" v-model="saisie" />
    <br />
    <p v-if="saisie">message saisi : {{ saisie }}</p>
    <p v-else="saisie"><i>Pas de message</i></p>
    <hr />
    <h4>V-for</h4>
    <ol>
      Liste
      <li v-for="el in liste" v-bind:key="el">{{ el.text }}</li>
    </ol>
    <hr />
    <h4>v-for avec index</h4>
    <ul>
      liste
      <li v-for="(element, index) in liste" v-bind:key="index">
        {{ index + 1 }} - {{ element.text }}
      </li>
    </ul>
    <hr />
    <h4>Methode / fonction</h4>
    <div>
      affiche()
      <p>{{ msg4 }}</p>
      <button v-on:click="affiche">Message affiché</button>
    </div>
    <hr />
    <h4>Methode / fonction</h4>
    <div>
      reverseMessage()
      <p>{{ msg4 }}</p>
      <button v-on:click="reverseMessage">message renversé</button>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      msg1: "Hello VueJS",
      msg2: "Vous avez afficher le message le " + new Date().toLocaleString(),
      msg3: '<span style="color:red">ceci est en rouge</span>',
      msg4: "Coucou c'est nous",
      ok: false,
      saisie: "",
      seen: true,
      seen2: true,
      liste: [
        { text: "Apprendre Javascript" },
        { text: "Apprendre vue" },
        { text: "créer quelque chose" },
      ],
    };
  },

  methods: {
    affiche: function () {
      alert('affichage de '+this.msg4)
    },
    reverseMessage: function () {
      this.msg4 = this.msg4
      .split('')
      .reverse()
      .join('')
    },
  },
};
</script>