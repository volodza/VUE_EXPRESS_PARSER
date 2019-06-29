<template>
  <v-app>
       <v-toolbar app class="header" style="height:60px;">
     <v-toolbar-side-icon  @click.stop="drawer = !drawer" class="hidden-lg-and-up"></v-toolbar-side-icon>
   
      <v-spacer></v-spacer>

      <!-- меню с зада4ами -->
    <div v-if="this.$store.getters.user">
      <v-badge 
        overlap class="hidden-md-and-up" 
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
              class="hidden-md-and-up"
              color="black"
              dark
              v-on="on"
              outline
              style='height:30px'
            >
              Мои задачи
            </v-btn>
          </template>

          <v-card>
            <tasks></tasks>
          </v-card>

        </v-menu>
      </v-badge>
    </div>

     <!-- <v-menu
        v-if="this.$store.getters.user"
        :close-on-content-click="false"
        :nudge-width="200"
      >
      <template v-slot:activator="{ on }">
        <v-btn
          class="hidden-md-and-up"
          color="black"
          dark
          v-on="on"
          outline
        >
          Мои задачи
        </v-btn>
      </template>

      <v-card>
          <tasks></tasks>
      </v-card>
    </v-menu> -->
     <!-- <v-spacer></v-spacer>  -->
     
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
          
        <!-- <v-avatar
          :tile="false"
          :size="40"
          color="grey lighten-4"
        >
          <img :src="this.$store.getters.user.photo_50">
        </v-avatar> -->


          <!-- <v-btn
          style="height:30px;font:"
          flat
          outline
          v-if="this.$store.getters.user"
       >Тариф "{{this.$store.getters.user.profile_status}}"</v-btn>
          <v-list-tile
              v-if="this.$store.getters.user"
              :key="'item.title'"
              avatar
              @click="1"
            >
              <v-list-tile-avatar>
                <img :src="this.$store.getters.user.photo_50">
                
              </v-list-tile-avatar>

              <v-list-tile-content>

                <v-list-tile-title v-html="this.$store.getters.user.first_name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="'item.subtitle'"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile> -->

     <!-- <v-toolbar-items class="hidden-sm-and-down"> -->
 
        <v-btn class="hidden-sm-and-down" style="border: 1px solid black;"
         :href="'/Tarif'">
        
         <p style="font-size:15px; padding-top:15px; text-transform:none">
          Тариф "нехуйный"</p>
         </v-btn> 

       <v-btn 
        @click="vkAuth"
        flat
        style="background:#4a76a8"
        dark
        
        v-if="!this.$store.getters.user"
       >
         <v-icon left>mdi-vk</v-icon>
         Войти
       </v-btn>
      
   </v-toolbar>

   <!-- <v-content class='white'>
       <router-view></router-view>
   </v-content>

   snackbar-error -->
    <template v-if="error">
      <v-snackbar
        @input="closeError"
        :multi-line="false"
        :timeout="5000"
        color="error"
        :value="true"
      >
        {{error}}
        <v-btn
          dark
          flat
          @click="closeError"
        >
          Закрыть
        </v-btn>
      </v-snackbar>
    </template>

    <!-- snackbar-access -->
    <template v-if="success">
      <v-snackbar
        @input="closeSuccess"
        :multi-line="false"
        :timeout="5000"
        color="success"
        :value="true"
      >
        {{success}}
        <v-btn
          dark
          flat
          @click="closeSuccess"
        >
          Закрыть
        </v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
// import Tasks from './components/instruments/search/Tasks'
export default {
//   components:{Tasks:Tasks},
  data () {
    return {
      menu:[
        {title:'Тариф', onClick:1, icon:'mdi-key'},
        {title:'Настройки', onClick:1, icon:'mdi-settings'},
        {title:'Выйти', onClick:this.userLogout, icon:'mdi-exit-to-app'}
      ],
      drawer:null,
       computed:{
    isUserLoggedIn(){
      return this.$store.getters.isUserLoggedIn
    },
    error(){
      return this.$store.getters.error
    },
    success(){
      return this.$store.getters.success
    },
      methods:{
    
    vkAuth (){
      this.$http.get('http://89.254.230.243:3000/auth/vkontakte')
      .then(response => {
        localStorage.access_token = response.body.access_token
        window.location.href = response.body.vk_url
      },(response) => {});
    },
    userLogout (){
      localStorage.removeItem('access_token')
      this.$store.commit('logout');
      window.location.href = 'http://89.254.230.243:3000/'
    },
    checkUserLogin (){
      if(!localStorage.access_token) return;
      this.$http.post("http://89.254.230.243:3000/checkToken", {
          access_token: localStorage.access_token
        })
        .then(res => {
          // console.log(res.body)
          res.body ? this.$store.commit('setUser',res.body) : console.log('Ошибка')
          console.log(this.$store.getters.user) 
        });
    },
    closeError (){
      this.$store.dispatch('clearError')
    },
    closeSuccess (){
      this.$store.dispatch('clearSuccess')
    }
  },
  created: function (){
      this.checkUserLogin()
    }
}}}}

</script>
