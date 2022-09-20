<template>
        <div class="contact">

            <h1>contact</h1>
            <span class="z-index">où suis-je ?</span>

  <GMapMap class="map"
      :center="center"
      :zoom="11"
      map-type-id="terrain"
      style="width: 1000px; height: 500px"
  >
      <GMapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
    />
  </GMapMap>

            <!--    <form id="contact_form" action="#" method="POST" enctype="multipart/form-data">
        <div class="row">
          <label class="required" for="name">Nom</label><br />
          <input id="name" class="input" name="name" type="text" value="" size="30" /><br />
          <span id="name_validation" class="error_message"></span>
        </div>
        <div class="row">
          <label class="required" for="email">Email:</label><br />
          <input id="email" class="input" name="email" type="text" value="" size="30" /><br />
          <span id="email_validation" class="error_message"></span>
        </div>
        <div class="row">
          <label class="required" for="message">Message:</label><br />
          <textarea id="message" class="input" name="message" rows="7" cols="30"></textarea><br />
          <span id="message_validation" class="error_message"></span>
        </div>
          
          <input id="submit_button" type="submit" value="Envoyer" />
          
      </form>
      -->

            <h2 class="contact_me"><i class="fa-solid fa-circle-arrow-down" id="left"></i>Contactez-moi<i
                    class="fa-solid fa-circle-arrow-down" id="right"></i>
            </h2>


            <ul class="banner-social-buttons">
                <li><a href="https://github.com/AnthonyOuzhene" target="blank"><i class="fa-brands fa-github"></i>GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/anthony-ouzhene/" target="blank"><i
                            class="fa-brands fa-linkedin"></i>LinkedIn</a>
                </li>
                <li><a href="https://www.instagram.com/zen_dev_redac/?hl=fr" target="blank"><i
                            class="fa-brands fa-square-instagram"></i>Instagram</a></li>
                <li><a href="https://twitter.com/AnthonyZen17" target="blank"><i class="fa-brands fa-twitter"></i>Twitter</a></li>
                <li><a href="mailto:a.ouzhene@gmail.com" target="blank"><i class="fa-solid fa-envelope"></i>Mail</a></li>
            </ul>
        </div>
</template>

<script>


export default {
  data() {
    return {
            center: {lat: 49.683360, lng: 0.201850},
      markers: [
        {
          position: {
            lat: 49.683360, lng: 0.201850
          },
        }
        , // Along list of clusters
      ]
    }
  },
  methods: {

  },
}
  
</script>

<style lang="scss" scoped>

</style>