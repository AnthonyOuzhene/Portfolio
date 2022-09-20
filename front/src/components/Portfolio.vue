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
                  
                    <img id="btnPopup" class="btnPopup breakfast" src="../assets/images/breakfast.png" />
          
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
                <li class="input">Développement des API REST sous Symfony</li>
                <li class="input">Connexion avec Token JWT</li>
                <li class="input">Connection aux API avec REACT / axios</li>
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
                    <img  id="btnPopup" class="btnPopup boogink" src="../assets/images/Boog'ink.jpg" />
          
                  <h1>Boog'Ink <br> Lady Piercing</h1>
          
                  <h2>Symfony - Vue.js</h2>
                </header>
          
                <div class="profile-bio">
                  <p>Site vitrine moderne d'un salon de tatouage et piercing</p>
                </div>
              </aside>

              <div id="overlay" class="overlay popupboogink">
              <div id="popup" class="popup">
              <h2>Boog'ink<span id="btnClose" class="btnClose">&times;</span></h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa illo nemo quos praesentium sed, recusandae atque necessitatibus eius, et ipsam at. Iusto, officiis! Natus assumenda dolor impedit quis magnam praesentium.</p>
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
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa illo nemo quos praesentium sed, recusandae atque necessitatibus eius, et ipsam at. Iusto, officiis! Natus assumenda dolor impedit quis magnam praesentium.</p>
            </div>
            </div>          
        </section>
    </div>      
</template>

<script>


export default {

 }   

</script>

<style lang="scss" scoped>

</style>