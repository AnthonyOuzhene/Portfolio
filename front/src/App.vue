<template>
<div>
<Header/>  
<RouterView/>
<Footer/>
</div>
</template>

<script>

import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";


  export default {
    data() {
      return {
      };
    },
      components: {
        Header,
        Footer,
      }
  };
</script>

<style lang="scss">
@import "./assets/scss/main.scss";
</style>