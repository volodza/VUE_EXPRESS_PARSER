<template>
    <div>
        <MainApp v-if="this.$store.getters.user" /> 
        <HomePage v-else /> 
    </div>
</template>

<style>
#app {
  font-family: "Source Sans Pro", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 17px;
  
}

</style>

<script>
import MainApp from "@/MainApp";
import HomePage from "@/HomePage";

export default {
    components: {
      MainApp,
      HomePage
    },

     computed:{
    isUserLoggedIn(){
      return this.$store.getters.isUserLoggedIn
    }
  },
     methods:{
    vkAuth (){
      this.$http.get('/auth/vkontakte') 
      .then(response => {
        localStorage.access_key = response.body.access_key
        window.location.href = response.body.vk_url
      },(err) => {
        this.$store.commit("setError", err);
      });
    },
    userLogout (){
      localStorage.removeItem('access_key')
      this.$store.commit('logout');
      window.location.href = '/'
    },
    toTarif (){
      this.$router.push('/tarif')
    },
  
    checkUserLogin (){ 
      if(!localStorage.access_key) return; 
      this.$http.get("/auth/checkToken",{ 
        params: { 
          access_key:localStorage.access_key 
        } 
      }).then(res => { 
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