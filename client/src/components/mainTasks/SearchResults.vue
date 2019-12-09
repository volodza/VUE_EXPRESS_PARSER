<template>
<div>
  <div class="overlay" @click="close()"></div>
  <div class="searchResults" >
      <div class="header" ref=drop>

          <div class="headerInfo"> 
            <div>
              {{ title }}  
            </div>
            <div style="color:#d0d0d0; text-align:left;">
              <v-icon 
                style="color:#d0d0d0;" 
                size="17" 
              >
                mdi-calendar
              </v-icon>
              {{ begin.slice(0,10) }}

              <v-icon 
                style="color:#d0d0d0;"
                size="17"
              >
                mdi-account-search-outline
              </v-icon>
              {{count}}

            </div> 
          </div>

          <v-icon 
            class="close"
            @click="close()"
          >
            mdi-close-circle-outline
          </v-icon>
          </div>

        <div class="result">
          <!-- <router-view ></router-view> -->
         <GroupsResults v-if="this.$store.getters.task.type === 'groups'"/>
         <UsersResults v-if="this.$store.getters.task.type === 'users'"/>
         <!-- <NewsResults/> -->
         <!-- <PostsResults/> -->
        </div>

</div>
  </div>
  
</template>



<script>
  import Group from "@/components/instruments/search/Group"
  import GroupsResults from "./SearchResult/GroupsResults";
  import UsersResults from "./SearchResult/UsersResults";

  export default {
    components: {
      GroupsResults,
      UsersResults,
      Group
    },
  
    props:['closeDialog'],

    data () {
      return {
        qwer:'Group'
      }
    },

    computed:{
      content (){
        return this.$store.getters.result
      },
      // pages (){
      //   return this.$store.getters.pages
      // },
      begin (){
        return this.$store.getters.taskBegin || '11:11:11'
      },
      title(){
        return this.$store.getters.title
      },
      count(){
        return this.$store.getters.count
      },
      type (){
        return this.$store.getters.task ? this.$store.getters.task.type : null
      }

    },

    // watch: {
    //   page(){
    //     this.$store.commit('setPage',this.page);
    //   }
    // },

    methods:{
      close (){
        this.closeDialog()
        this.page = 1;
      },
    //   onMouseUp(e){ 
    //   if(e.target){
    //   const up = this.$refs.drop
    //   if (!up.contains(e.target)){
    //     this.closeDialog()
    //     this.page = 1;
    //     }
    // }
    // }
    },

  // mounted() { 
  //   document.addEventListener('mouseup', this.onMouseUp); 
  // }

  }
</script>

<style <style lang="sass" scoped>

  .overlay
    background: rgba(102, 102, 102, 0.2)
    width: 100%
    height: 100%
    position: fixed
    top: 0
    z-index: 1
    left: 0
    cursor: default

  .searchResults
    cursor: default
    z-index: 8
    max-width: 600px
    position: fixed
    top: 5%
    max-height: 95%
    overflow: auto
    right: 0
    left: 0
    margin: auto
    background: #c2c2c2
    .close
      color: #d0d0d0
      margin-left: auto
      &:hover
        color: white 
    .header
      overflow: visible
      background: #303030
      height: 60px
      color: white
      display: flex
      padding: 0 15px
      .headerInfo
        display: flex
        flex-direction: column
        margin-top: 10px
        cursor: text

    .result
      background: white



  /* стили для скрола перенести в апп */
  ::-webkit-scrollbar-button 
    background-image: url('') 
    background-repeat: no-repeat
    width: 6px
    height: 0px 


  ::-webkit-scrollbar-track  
    background-color: #eef1f07e 
  /* box-shadow:0px 0px 3px #000 inset;  */
  

  ::-webkit-scrollbar-thumb  
    background-color: #4f555e 
    background-position: center
    background-repeat: no-repeat


  ::-webkit-resizer
    background-image: url('')
    background-repeat: no-repeat 
    width: 7px 
    height: 0px 


  ::-webkit-scrollbar
    width: 5px 



</style>