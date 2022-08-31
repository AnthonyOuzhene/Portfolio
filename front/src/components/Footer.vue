<template>
    
        <footer>

        <div class="thanks">
            <img src="../assets/images/thanks2.png">
        </div>

        <div class="grid">
            <nav>
                <ul class="navigation">
                    <li>
                    <RouterLink to="/">
                        <a href="#">Accueil</a>
                    </RouterLink>
                        </li>

                    <li>
                    <RouterLink to="/competences">
                        <a href="#">Compétences</a>
                    </RouterLink>
                    </li>

                    <li>
                    <RouterLink to="/portfolio">
                        <a href="#">Portfolio</a>
                    </RouterLink>
                    </li>

                    <li>
                    <RouterLink to="/seo">
                        <a href="#">SEO</a>
                    </RouterLink>
                    </li>

                    <li>
                    <RouterLink to="/blog">
                        <a href="#">Blog</a>
                    </RouterLink>
                    </li>
                    
                    <li>
                    <RouterLink to="/contact">
                        <a href="#">Contact</a>
                    </RouterLink>
                    </li>
                </ul>
            </nav>

            <h1>Restons en contact</h1>

            <ul class="social_media">
                <li><a href="https://github.com/AnthonyOuzhene"><i class="fa-brands fa-github"></i></a></li>
                <li><a href="https://www.linkedin.com/in/anthony-ouzhene/"><i class="fa-brands fa-linkedin"></i></a>
                </li>
                <li><a href=""><i class="fa-brands fa-twitter"></i></a></li>
                <li><a href="mailto:a.ouzhene@gmail.com"><i class="fa-solid fa-envelope"></i></a></li>
            </ul>
        </div>
    </footer>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
//@import "./assets/scss/layout/footer.scss";
</style>