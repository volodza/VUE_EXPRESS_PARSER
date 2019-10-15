<template >
  <div class="mainPage">

    <div class="sidebar">
      <sidebar/>
    </div>

    <div class="content">
      <Toolbar />
      <router-view style="background:#EDEEF0; height: 100%"></router-view>
    </div>
    <!-- <v-footer
      color="indigo"
      
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer> -->
  </div>
</template>

<style lang="sass" scoped>
  .mainPage
    display: flex
    height: 100%
    overflow: hidden
    // position: relative
    .sidebar
      background-color: #303030
      color: white
      min-width: 250px
      min-height: 100%
      position: relative
      left: 0
      transition: left .2s
    .content
      width: 100%
      color: black
      position: relative

  @media screen and (max-width: 992px)
    .sidebar
      left: -250px !important
      position: fixed !important
      
</style>

<script>
import Sidebar from '@/components/Sidebar'
import Toolbar from '@/components/Toolbar'
  export default {
    components:{
      Sidebar,
      Toolbar
    },
    // props: {
    //   source: String,
    // },
    // data: () => ({
    //   drawer: null,
    // }),
    created () {
      this.$vuetify.theme.dark = false
    },
  }
</script>

