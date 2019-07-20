<template>
  <div id="appHeader" style="align-items: center;display: flex;">

      <!-- меню с зада4ами -->
    <div v-if="this.$store.getters.user">
      <v-badge 
        overlap 
        v-if="$store.getters.user"
        v-model="$store.getters.tasks.length" 
      >

        <template v-slot:badge>
          <span>{{$store.getters.tasks.length}}</span>
        </template>

        <v-menu 
          :close-on-content-click="false"
          :nudge-width="200"
        >

          <template v-slot:activator="{ on }">
            <v-btn
              color="black"
              flat
              v-on="on"
              style='height:30px;border:1px solid #d7d7d7;text-transform:none'
            >
              Мои задачи
            </v-btn>
          </template>

          <v-card class="flat" style="box-shadow: 0 0 5px 2px;">
            <tasks/>
          </v-card>

        </v-menu>
      </v-badge>
    </div>
     
    <v-menu  offset-y v-if="this.$store.getters.user">
      <template v-slot:activator="{ on }">
        <v-btn
          left
          outline 
          v-on="on"
          style="height:50px;width:70px;border:none"
        >
          <v-avatar
            :tile="false"
            :size="40"
          >
            <img :src="$store.getters.user.photo_50">
          </v-avatar>
          <v-icon >mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-tile
          v-for="(item, index) in menu"
          :key="index"
          @click="item.onClick"
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          <v-icon right>{{item.icon}}</v-icon>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-btn 
      @click="vkAuth"
      flat
      style="background:#4a76a8"
      dark
      v-if="!this.$store.getters.user"
    >
      <v-icon left>mdi-vk</v-icon>Войти
    </v-btn>
      
  </div>

</template>

<script>
import Tasks from './common/Tasks'
export default {
  components:{Tasks},
  data () {
    return {
      menu:[
        {title:'Тариф', onClick:1, icon:'mdi-key'},
        {title:'Настройки', onClick:1, icon:'mdi-settings'},
        {title:'Выйти', onClick:this.userLogout, icon:'mdi-exit-to-app'}
      ],
      counter:'0'
    }
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
