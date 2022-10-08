<template>

        <article class="article">

            <div class="back">
                <button>Retour</button>
            </div>
        
            <div class="title">
                <h1>{{ postData.title.rendered }}</h1>
            </div>

            <img class="fit-picture">

            <div class="category">
                <ul>
                    <li>Tech</li>
                    <li>Work</li>
                    <li>Front</li>
                    <li>Back</li>
                </ul>
            </div>

            <div class="info">
                <ul>
                    <li>Auteur</li>
                    <li>Date</li>
                </ul>
            </div>

            <p class="content">
                Bla bla
            </p>

            <button class="btn">Précédent<i class="fa fa-arrow-left"></i></button>
            <button class="btn">Suivant<i class="fa fa-arrow-right"></i></button>

        
    </article>

</template>

<script>

import postService from "../services/postService.js";

export default {
    data() {
        return {
            postData: {
                title: {
                    rendered: "",
                }
            }
        }
    },

    mounted() {
        postService.getSinglePost(this.$route.params.postId)
        .then((response) => {
            console.log(response);
            this.postData = response.data;
        });
    }
}
</script>