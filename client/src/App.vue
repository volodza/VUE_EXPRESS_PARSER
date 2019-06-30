<template>
  <v-app>
    <v-toolbar app class="header" style="height:60px;">
     <v-toolbar-side-icon  @click.stop="drawer = !drawer" class="hidden-lg-and-up"></v-toolbar-side-icon>
     <v-spacer></v-spacer>
    <app-header></app-header>
    
    </v-toolbar>
    
      <v-navigation-drawer
     class="side"  
     style="width:280px;"
     app
     v-model="drawer">
     <app-sidebar></app-sidebar>
     </v-navigation-drawer>

    <v-content class='white'>
       <router-view></router-view>
   </v-content>
  </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppSidebar from '@/components/AppSidebar'

export default {
  data () {
    return {drawer:null}},
  components: {
    AppHeader,
    AppSidebar
    
  }
  
}
</script>
