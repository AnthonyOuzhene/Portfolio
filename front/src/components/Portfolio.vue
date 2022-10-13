<template>
<div class="my_portfolio">
        <h1>Mes réalisations</h1>
        <span class="z-index">Portfolio</span>

        <p class="introduction">
            Ci-dessous, quelques projets réalisés en méthode AGILE, dans le cadre de ma formation & des projets personnels :
            <br>
           <span class="tbc">To be continued !</span>
        </p>

        <section class="portfolio">

            <aside class="profile-card">
                <header>
                  
                    <img id="btnPopup" class="btnPopup breakfast" src="../assets/images/breakfast.png" >
          
                  <h1>Break Fast</h1>
          
                  <h2>Symfony - React</h2>
                </header>
          
                <div class="profile-bio">
                  <p>
                    Site de livraison de petits déjeuners à domicile ou en Click & Collect.
                  </p>
                </div>
              </aside>

            <div id="overlay" class="overlay popupbreakfast">
              <div id="popup" class="popup">
              <h2>Break Fast<span id="btnClose" class="btnClose breakfast">&times;</span></h2>

              <ul>
                <li class="input">Intégration HTML / CSS</li>
                <li class="input">Site responsive</li>
                <li class="input">Référencement naturel SEO</li>
                <li class="input">Base de données MySQL générée avec les migrations de Symfony</li>
                <li class="input">API REST / ACL / Hierarchie des rôles / Forms</li>
                <li class="input">Connexion avec Token JWT</li>
                <li class="input">Connexion aux API avec REACT / axios</li>
              </ul>

              <div class="screenshot">
                 <figure class="main_site">
                      <img src="../assets/images/bakery_list.png" alt="bakery_list">
                      <figcaption>Liste des boulangeries du site trouvée depuis la connection de l'API de localisation de Google</figcaption>
                      <img src="../assets/images/basket.png" alt="basket">
                  <figcaption>Validation des articles du panier</figcaption>
                  </figure>
                  <div class="bo">
                     <img  src="../assets/images/BO_bakery.png">
                     <figcaption>Présentation du Back office avec le moteur de templating Twig de Symfony</figcaption>
                  </div>
              </div>
            </div>
            </div>


              <aside class="profile-card">
                <header>
                    <img id="btnPopup" class="btnPopup bricolhelp" src="../assets/images/Bricol' Help.png" />
          
                  <h1>Bricol'Help</h1>
          
                  <h2>WordPress - Vue.js</h2>
                </header>
          
                <div class="profile-bio">
                  <p>
                    Site communautaire, d'entraide et de partage sur le bricolage.
                  </p>
                </div>
              </aside>

              <div id="overlay" class="overlay popupbricolhelp">
              <div id="popup" class="popup">
              <h2>Bricol' Help<span id="btnClose" class="btnClose closebricolhelp">&times;</span></h2>

               <ul>
                <li class="input">Integration HTML / CSS / SASS</li>
                <li class="input">Site responsive</li>
                <li class="input">Référencement naturel SEO</li>
                <li class="input">Back-office Wordpress avec plugin sur mesure => CPT, Taxonomies et CAPS</li>
                <li class="input">Interface front travaillée avec Vue.js => système de services pour connexion aux API</li>
                <li class="input">Connexion avec Token JWT</li>
              </ul>

              <div class="screenshot">
                 <figure class="main_site">
                      <img src="../assets/images/home-bricol.png" alt="bricol'help-main-site">
                      <figcaption>Page d'accueil avec différentes catégories de tutoriels. Au clic, les tutoriels de la catégorie apparaissent.</figcaption>
                       <img src="../assets/images/tuto.png" alt="bricol'help-tuto">
                      <figcaption>Exemple de tutoriel. Un système de commentaire est disponible une fois l'utilisateur connecté.</figcaption>
                  </figure>
                  <div class="bo">
                      <img src="../assets/images/BO-bricol.png" alt="backoffice">
                  <figcaption>Admnisitration WordPress avec Custom Post Type, Taxonomies personnalisées et Capabilities assignés aux différents users.</figcaption>
                  </div>
              </div>
            </div>
            </div>

            <aside class="profile-card">
                <header>
                    <img  id="btnPopup" class="btnPopup oflix" src="../assets/images/oflix.png" />
          
                  <h1>O' flix</h1>
          
                  <h2>Symfony</h2>
                </header>
          
                <div class="profile-bio">
                  <a href="http://anthonyouzhene-server.eddi.cloud/symfo-oflix-final-AnthonyOuzhene/public/" target="blank">Visiter le site</a>
                  <p>Plateforme fictive de séries TV et films et de pop-corn</p>
                </div>
              </aside>

              <div id="overlay" class="overlay popupoflix">
              <div id="popup" class="popup">
              <h2>O' flix<span id="btnClose" class="btnClose">&times;</span></h2>
              <a href="http://anthonyouzhene-server.eddi.cloud/symfo-oflix-final-AnthonyOuzhene/public/" target="blank">Visiter le site</a>
                            <ul>
                <li class="input">Projet responsive en full Symfony => moteur de template Twig</li>
                <li class="input">Service pour récupérer API des films</li>
                <li class="input">Fixtures pour alimenter la base de données</li>
                <li class="input">Backoffice templating Twig disponible à la connexion admin</li>
                <li class="input">Access Control List selon les rôles attribués</li>
                <li class="input">Gestion de l'ajout des favoris</li>
              </ul>

              <div class="screenshot">
                 <figure class="main_site">
                      <img src="../assets/images/oflix-details.png" alt="bakery_list">
                      <figcaption>Détails d'une serie TV avec possiblité d'ajout aux favoris.</figcaption>
                      <img src="../assets/images/oflix-fav.png" alt="basket">
                  <figcaption>Onglet "Ma Liste" des ajouts en favoris avec message Flash.</figcaption>
                  </figure>
                  <div class="bo">
                     <img  src="../assets/images/oflix-backoffice.png">
                     <figcaption>Back office fait avec le moteur de templating Twig de Symfony et Bootstrap.</figcaption>
                  </div>
              </div>
            </div>
            </div>

              <aside class="profile-card">
                <header>
                    <img  id="btnPopup" class="btnPopup boogink" src="../assets/images/Boog'ink.jpg" />
          
                  <h1>Boogi'Ink <br> Lady Piercing</h1>
          
                  <h2>Symfony - React</h2>
                </header>
          
                <div class="profile-bio">
                  <a href="http://www.boogiink-tattoo-lady-piercing.com/" target="blank">Visiter le site</a>
                  <p>Site moderne d'un salon de tatouage et de piercing</p>
                </div>
              </aside>

              <div id="overlay" class="overlay popupboogink">
              <div id="popup" class="popup">
              <h2>Boogi'ink - Lady Piercing<span id="btnClose" class="btnClose">&times;</span></h2>
              <a href="#" target="blank">Visiter le site</a>
              <p>Descriptif à venir</p>
            </div>
            </div>

              <aside class="profile-card">
                <header>
                    <img id="btnPopup" class="btnPopup kingsport" src="../assets/images/wrestling.jpg" />
          
                  <h1>Soon</h1>
          
                  <h2>Still to come</h2>
                </header>
          
                <div class="profile-bio">
                  <p>
                    Site visant à gérer et développer son propre roster de catch américain
                  </p>
                </div>
              </aside> 

              <div id="overlay" class="overlay popupkingsport">
              <div id="popup" class="popup">
              <h2>Kings' Sport<span id="btnClose" class="btnClose">&times;</span></h2>
              <p>Infos à venir</p>
            </div>
            </div>          
        </section>
    </div>      
</template>

<script>
import popupService from '../services/popupService.js';

export default {
  data() {
    return {

    }
  },
methods: {
  loadPopup() {
    popupService.init();
  },
mounted() {
  this.loadPopup();
}
}
 }   

</script>

<style lang="scss" scoped>

</style>