<template>
        <header class="header">
        <nav class="navbar dark-mode" role="navigation">
            <div class="welcome">
                <marquee id="hello">
                    Bonjour ! Bienvenue sur mon portfolio !
                </marquee>
            </div>   
            <ul class="navbar__links">
                <RouterLink to="/">
              <li class="navbar__link first" id="first">                        
                <a href="">Profil</a>
            </li>
                </RouterLink>
                
                <RouterLink to="/competences">
              <li class="navbar__link second" id="second">
                <a href="">Compétences</a>
              </li>
                </RouterLink>

                <RouterLink to="/portfolio">
              <li class="navbar__link third" id="third">
                <a href="#">Portfolio</a>
                </li>
                </RouterLink>

                <RouterLink to="seo">
              <li class="navbar__link four" id="fourth">
                <a href="#">SEO</a>
                </li>
                </RouterLink>

                <RouterLink to="/blog">
              <li class="navbar__link fifth" id="fifth"><a href="#">Blog</a></li>
                </RouterLink>

                <RouterLink to="/contact">
              <li class="navbar__link sixth" id="sixth"><a href="#">Contact</a></li>
                </RouterLink>

            </ul>   
            <button class="burger">
              <span class="bar"></span>  
            </button>   
          </nav>


    <div class="presentation">
        <div class="myself">
            <img class="header_bg_img">
            <h1 class="name">Ouzhene Anthony</h1>

            <h2 class="job">Développeur web Full-stack / Back-end</h2>

            <div class="intro">
                Créations
                <div id="flip">
                    <div>
                        <div>modernes</div>
                    </div>
                    <div>
                        <div>responsives</div>
                    </div>
                    <div>
                        <div>UX friendly</div>
                    </div>
                </div>
                pour le web
            </div>

        </div>
    </div>
</header>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>

</style>