<template>

    <article class="article">
        <a href="#">
            <img class="fit-picture">

            <div class="title">
                <h1>{{ postData.title.rendered }}</h1>
            </div>

            <div class="category">
                <ul>
                    <li>Tech</li>
                    <li>Work</li>
                    <li>Front</li>
                    <li>Back</li>
                </ul>
            </div>

            <p class="content">
                {{ postData.excerpt}}
            </p>

            <!-- <button class="btn">Voir plus<i class="fa fa-arrow-right"></i></button> -->
        </a>
    </article>


</template>

<script>
import App from '../App.vue'
export default {
  components: { App },
    data(){
        return {

        }
    },

    props: ['postData'],
}
</script>