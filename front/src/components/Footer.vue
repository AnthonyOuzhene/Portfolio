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
                        Accueil
                    </RouterLink>
                        </li>

                    <li>
                    <RouterLink to="/competences">
                        Compétences
                    </RouterLink>
                    </li>

                    <li>
                    <RouterLink to="/portfolio">
                        Portfolio
                    </RouterLink>
                    </li>

                    <li>
                    <RouterLink to="/seo">
                        SEO
                    </RouterLink>
                    </li>

                    <li>
                    <RouterLink to="/blog">
                        Blog
                    </RouterLink>
                    </li>
                    
                    <li>
                    <RouterLink to="/contact">
                        Contact
                    </RouterLink>
                    </li>
                </ul>
            </nav>

            <h1>Restons en contact</h1>

            <ul class="social_media">
                <li><a href="https://github.com/AnthonyOuzhene" target="blank"><i class="fa-brands fa-github"></i></a></li>
                <li><a href="https://www.linkedin.com/in/anthony-ouzhene/" target="blank"><i class="fa-brands fa-linkedin"></i></a>
                </li>
                <li><a href="https://www.instagram.com/zen_dev_redac/?hl=fr" target="blank"><i class="fa-brands fa-square-instagram"></i></a>
                </li>
                <li><a href="https://twitter.com/AnthonyZen17" target="blank"><i class="fa-brands fa-twitter"></i></a></li>
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