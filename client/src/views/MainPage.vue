<template>
  <v-app id="inspire">
    <!-- <div style="display: flex; flex-wrap: wrap"> -->
    <v-navigation-drawer
      v-model="drawer"
      style="background-color:#303030;color:white; "
      app
    >
      <sidebar @close-sidebar="drawer = !drawer" />
    </v-navigation-drawer>

      

    <v-content>
      <Toolbar />
      <router-view style="background:#EDEEF0; height: 100%"></router-view>
    </v-content>
    <!-- <v-footer
      color="indigo"
      
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer> -->
    <!-- </div> -->
  </v-app>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Toolbar from '@/components/Toolbar'
  export default {
    components:{
      Sidebar,
      Toolbar
    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    created () {
      this.$vuetify.theme.dark = false
    },
  }
</script>

