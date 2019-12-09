<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<style lang="sass">

*
  margin: 0
  padding: 0

#app 
  font-family: "Source Sans Pro", sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  // text-align: center;
  font-size: 13px
  color: #ffffff

#nav 
  padding: 30px
  a 
    font-weight: bold
    color: #2c3e50
    &.router-link-exact-active 
      color: red
</style>


