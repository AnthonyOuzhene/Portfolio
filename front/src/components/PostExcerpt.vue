<template>

    <article class="article">
        <a href="#">
            <img class="fit-picture"
            :style="{ backgroundImage: 'url(' + getNewsThumbnail() + ')' }"
            alt="">

            <div class="title">
                <h1>{{ postData.title.rendered }}</h1>
            </div>

            <div class="category">
                            <ul>
                    <li
                    v-for="tag in postData._embedded['wp:term'][0]"
                    :key="tag.id">

                    {{tag.name}}

                    </li>
                </ul>
            </div>

            <p class="content">
                {{ postData.excerpt}}
            </p>

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

    methods: {
      getNewsThumbnail() {
      // si on n'a pas de thumbnail
      // console.log(this.postData);
      if (!this.postData.thumbnail) {
        return "https://picsum.photos/400/200";
      } else {
        return this.postData.thumbnail;
      }
    },
    },

}
</script>