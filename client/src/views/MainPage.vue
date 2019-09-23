<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      style="background-color:#303030;color:white"
      app
    >
      <sidebar @close-sidebar="drawer = !drawer" />
    </v-navigation-drawer>

    <v-app-bar
      app
      style="background-color:white;"
      class="elevation-0"
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title> -->
    </v-app-bar>

    <v-content>
        <router-view></router-view>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Sidebar from '@/components/Sidebar'
  export default {
    components:{
      Sidebar
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

