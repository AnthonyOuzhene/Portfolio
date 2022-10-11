<template>

        <article class="single_article">

            <div class="back">
                <RouterLink to="/blog">
                <button class="btn">Retour</button>
                </RouterLink>
            </div>
        
            <div class="title">
                <h1>{{ postData.title.rendered }}</h1>
            </div>

                        <div class="info">
                <ul>
                    <li v-if="postData._embedded['author']" v-html="postData._embedded['author'][0].name"></li>
                    <li>-</li>
                    <li>{{ postData.date }}</li>
                </ul>
            </div>

            <div class="category" v-if="postData._embedded['wp:term']">
                <ul>
                    <li
                        v-for="tag in postData._embedded['wp:term'][0]"
                        :key="tag.id"
                    >
                        {{ tag.name }}
                    </li>

                </ul>
            </div>
            


            <img class="fit-picture"
            :style="{ backgroundImage: 'url(' + getNewsThumbnail() + ')' }"
            alt=""
            >

            <p class="content"
               v-html="postData.content.rendered"
               >
            </p>

            <div class="navigation">
                <button class="btn"><i class="fa fa-arrow-left"></i> Précédent</button>
                <button class="btn">Suivant <i class="fa fa-arrow-right"></i></button>
            </div>

        
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
                },
                _embedded: {},
                content: { rendered: "" },
            }
        }
    },

  methods: {
    getNewsThumbnail() {
      // si on n'a pas de thumbnail
      if (!this.postData.thumbnail) {
        return "https://source.unsplash.com/collection/157&random=100";
      } else {
        return this.postData.thumbnail;
      }
    },
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