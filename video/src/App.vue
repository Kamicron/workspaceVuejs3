<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="navbar-brand">
        <RouterLink to="/">Vidéo</RouterLink>
      </div>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <div class="nav-link">
              <RouterLink to="/films">Film</RouterLink>
            </div>
          </li>
          <li class="nav-item">
            <div class="nav-link">
              <RouterLink to="/series">Séries</RouterLink>
            </div>
          </li>
          <li class="nav-item">
            <div class="nav-link">
              <RouterLink to="/kids">Kids</RouterLink>
            </div>
          </li>
          <li class="nav-item">
            <div class="nav-link">
              <RouterLink to="/mangas">Mangas</RouterLink>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="pages/monCompte.html">MonCompte</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="pages/mesVideos.html">Mes vidéos</a>
          </li>
        </ul>

        <ul class="navbar-nav ml-auto">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Administration
            </a>
            <div class="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="pages/video/liste.html">Vidéos</a>
              <a class="dropdown-item" href="pages/participant/liste.html"
                >Participants</a
              >
              <a class="dropdown-item" href="pages/categorie/liste.html"
                >Catégories</a
              >
              <a class="dropdown-item" href="pages/format/liste.html"
                >Formats</a
              >
              <a class="dropdown-item" href="pages/client/liste.html"
                >Clients</a
              >
              <a class="dropdown-item" href="pages/abonnement/liste.html"
                >Abonnements</a
              >
              <a class="dropdown-item" href="pages/ville/liste.html">Villes</a>
              <a class="dropdown-item" href="pages/departement/liste.html"
                >Départements</a
              >
              <div class="dropdown-item" href="pages/pays/liste.html">
                <RouterLink to="/pays">Pays</RouterLink>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <nav></nav>
    <RouterView />
  </div>
</template>

<style>
@import "@/assets/style.css";
</style>
