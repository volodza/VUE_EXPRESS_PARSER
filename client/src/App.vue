<template>
  <v-app>

    <!-- Header -->
    <v-toolbar app flat style="border-bottom:1px solid #8CCFB9">
     <v-toolbar-side-icon
      @click.stop="drawer = !drawer" 
      class="hidden-lg-and-up"
     >
     </v-toolbar-side-icon>
     <v-spacer></v-spacer>
     <app-header/>
     
    </v-toolbar>
    
    
    <!-- Sidebar -->
    <v-navigation-drawer
      
     style="width:280px;background: linear-gradient(200deg,#4f555e,#4f555e,#4f555e,#4f555e,#5c6e68,#7f6b67);"
     app
     v-model="drawer"
    >
      <app-sidebar/>
    </v-navigation-drawer>

    <v-content class='white'>
      <router-view/>
   </v-content>

    <!-- snackbar-error -->
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
import AppHeader from '@/components/AppHeader'
import AppSidebar from '@/components/AppSidebar'

export default {
  components: {
    AppHeader,
    AppSidebar 
  },
  data () {
    return {
      drawer:null
    }
  },
  computed:{
    error(){
      return this.$store.getters.error
    },
    success(){
      return this.$store.getters.success
    }
  },
  methods:{
    closeError (){
      this.$store.dispatch('clearError')
    },
    closeSuccess (){
      this.$store.dispatch('clearSuccess')
    }
  }
}
</script>
