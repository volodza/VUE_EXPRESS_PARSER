<template>
  <div style="height:40px;border-bottom:1px solid black">
    <slc :items='[1,2,3]'></slc>
    <!-- <div @click="vkAuth" style="height:38px;width:38px;border-radius:50%;background-color:black;right:10px"></div> -->
    <!-- <v-toolbar-side-icon 
      @click.stop="drawer = !drawer" 
      class="hidden-lg-and-up"
    ></v-toolbar-side-icon>
    <v-spacer></v-spacer>
    <v-layout >
      <v-icon light size="25">mdi-chevron-down</v-icon>
      <div class="avatar">
        <img :src="$store.getters.user.photo_50">
      </div>
    </v-layout> -->
    
  </div>
</template>

<script>
import slc from '@/components/elements/slc'
export default {
  components:{
    slc
  },
  methods: {
    vkAuth (){
      this.$http.get('/auth/vkontakte') 
      .then(response => {
        localStorage.access_key = response.body.access_key
        window.location.href = response.body.vk_url
      },(err) => {
        console.log(err)
        // this.$store.commit("setError", err);
      });
    },

    checkUserLogin (){ 
      if(!localStorage.access_key) return; 
      this.$http.get("/auth/checkToken",{ 
        params: { 
          access_key:localStorage.access_key 
        } 
      }).then(res => { 
        console.log(res.body)
        res.body ? this.$store.commit('setUser',res.body) : console.log('Ошибка') 
        console.log(this.$store.getters.user) 
      },(err) => {
        this.$store.commit("setError", err);
      });
    }
  },

  created: function (){ 
    this.checkUserLogin() 
  }
}
</script>

<style lang="sass" scoped>
  .avatar
    height: 38px
    width: 38px
    border-radius: 50%
    right: 0px
    // position: absolute
    img 
      border-radius: inherit
      display: -webkit-inline-box
      display: -ms-inline-flexbox
      display: inline-flex
      height: inherit
      width: inherit
</style>