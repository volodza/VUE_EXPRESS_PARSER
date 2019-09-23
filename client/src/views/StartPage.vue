<template>
  <div class="content">
    <Header/>
    <Functions/>
    <Tarifs/>
    <Contacts/>
  </div>
</template>

<script>
import Header from '@/components/StartPage/Header'
import Functions from '@/components/StartPage/Functions'
import Tarifs from '@/components/StartPage/Tarifs'
import Contacts from '@/components/StartPage/Contacts'
export default {
  components:{
    Header,
    Functions,
    Tarifs,
    Contacts
  }
}
</script>

<style scoped lang="sass">
 .content
   text-align: center
</style>