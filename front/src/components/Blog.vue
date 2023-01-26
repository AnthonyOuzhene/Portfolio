<template>
    
    <div class="blog">

        <h1>Blog</h1>
        <span class="z-index">Articles</span>

<div class="postList">
    <PostExcerpt
    @click="onPostClick(currentPost.id)"
    v-for="currentPost in postList"
    :key="currentPost.id"
    :postData="currentPost"
    >
    </PostExcerpt>
</div>

       
    </div>
    
</template>

<script>

import PostExcerpt from "../components/PostExcerpt.vue";
import postService from "../services/postService.js";

export default {
    data() {
        return {
            postList: [],
        }
    },
    components: {
        PostExcerpt,
    },
    methods: {
        loadPosts() {
            postService.getAllPosts()
            .then((response) => {
                this.postList = response.data;
                //console.log(response);
            })
            .catch((error) => {
                console.error(error);
            })
        },
    onPostClick(postId) {
        // Au click sur le post, on redirige vers la route du single Post en passant par "postId"
        this.$router.push({
                name: "post",
                params: {
                    postId: postId,
                },
            });
    },
    },
    mounted() {
        this.loadPosts();
        }
}
</script>

<style lang="scss" scoped>

</style>