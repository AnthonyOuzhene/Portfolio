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
                  
                    <img id="btnPopup" class="btnPopup" src="../assets/images/breakfast.png" />
          
                  <h1>Break Fast</h1>
          
                  <h2>Symfony - React</h2>
                </header>
          
                <div class="profile-bio">
                  <p>
                    Site de livraison de petits déjeuners à domicile ou en Click & Collect.
                  </p>
                </div>
              </aside>

            <div id="overlay" class="overlay">
              <div id="popup" class="popup">
              <h2>Break Fast<span id="btnClose" class="btnClose">&times;</span></h2>
              <img>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa illo nemo quos praesentium sed, recusandae atque necessitatibus eius, et ipsam at. Iusto, officiis! Natus assumenda dolor impedit quis magnam praesentium.</p>
            </div>
            </div>


              <aside class="profile-card">
                <header>
                    <img id="btnPopup" class="btnPopup" src="../assets/images/Bricol' Help.png" />
          
                  <h1>Bricol'Help</h1>
          
                  <h2>WordPress - Vue.js</h2>
                </header>
          
                <div class="profile-bio">
                  <p>
                    Site communautaire, d'entraide et de partage sur le bricolage.
                  </p>
                </div>
              </aside>

              <div id="overlay" class="overlay">
              <div id="popup" class="popup">
              <h2>Exemple de popup<span id="btnClose" class="btnClose">&times;</span></h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa illo nemo quos praesentium sed, recusandae atque necessitatibus eius, et ipsam at. Iusto, officiis! Natus assumenda dolor impedit quis magnam praesentium.</p>
            </div>
            </div>

              <aside class="profile-card">
                <header>
                    <img src="../assets/images/Boog'ink.jpg" />
          
                  <h1>Boog'Ink <br> Lady Piercing</h1>
          
                  <h2>Symfony - Vue.js</h2>
                </header>
          
                <div class="profile-bio">
                  <p>Site vitrine moderne d'un salon de tatouage et piercing</p>
                </div>
              </aside>
              <aside class="profile-card">
                <header>
                    <img src="../assets/images/wrestling.jpg" />
          
                  <h1>Soon</h1>
          
                  <h2>Still to come</h2>
                </header>
          
                <div class="profile-bio">
                  <p>
                    Site visant à gérer et développer son propre roster de catch américain
                  </p>
                </div>
              </aside>           
        </section>
    </div>      
</template>

<script>
  

export default {
    
}
</script>

<style lang="scss" scoped>

</style>