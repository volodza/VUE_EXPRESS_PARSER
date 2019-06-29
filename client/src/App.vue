<template>
  <div id="app">
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <router-view/>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppSidebar from '@/components/AppSidebar'

export default {
  components: {
    AppHeader,
    AppSidebar
  }
}
</script>
