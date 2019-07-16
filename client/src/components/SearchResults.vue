<template>
  <div class="text-xs-center header" style="padding-bottom:700px;">
      <v-card class="header" style="overflow : visible;">
        

        <!-- header -->
        <v-card-title
          class="side py-2"
          primary-title
        >
          <div> 
            <v-list-tile-title class="sideText--text ">
              {{ title }}  
            </v-list-tile-title>
            <v-list-tile-sub-title style="color:#d0d0d0; text-align:left;">
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

            </v-list-tile-sub-title> 
          </div>

          <v-icon 
            style="color:#d0d0d0; margin-left: auto;"
            @click="close()"
          >
            mdi-close-circle-outline
          </v-icon>

        </v-card-title>
        <!-- header-end -->

        <!-- sub-header -->
        <v-card-title
          class="header py-3"
          primary-title
        >
          <div style=" margin:0 auto; border:1px solid #d7d7d7;">

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn 
                  v-on="on"
                  flat 
                  class="mx-2 px-0" 
                  style=" background:white; min-width:40px;"
                >
                  ID
                </v-btn> 
              </template>
              <span>Скачать id</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on" 
                  flat 
                  class="mx-0 px-0" 
                  style="background:white; min-width:40px;"
                >
                  <v-icon size="20">mdi-paperclip</v-icon>
                </v-btn>
              </template>
              <span>Скачать ссылки</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn 
                  v-on="on" 
                  flat 
                  style=" background:white; min-width:40px;"
                  class="mx-2 px-0"
                >
                  Й
                </v-btn>
              </template>
              <span>Скачать хуй</span>
            </v-tooltip>
             
          </div>  
        </v-card-title>
          <!-- sub-header-end -->

        <div class="header" style="position: sticky; top: 0; z-index: 1;">

          <v-progress-linear  
            :indeterminate="true"
            v-if="content == null"
          ></v-progress-linear>

          <v-pagination
            v-if="content!==null"
            v-model="page"
            :length="pages"
            :total-visible="9"
          ></v-pagination>

        </div>
        <!-- <v-divider></v-divider> -->

        <v-card class="mx-2 mt-2">
         <GroupsResults/>
         <UsersResults/>
         <NewsResults/>
         <PostsResults/>
        </v-card>

        <v-divider></v-divider>

        <!-- <v-pagination
          v-if="content!==null"
          v-model="page"
          :length="pages"
          :total-visible="9"
        ></v-pagination> -->

      </v-card>
    <!-- </v-dialog> -->
  </div>
</template>

<script>
  import GroupsResults from "./SearchResult/GroupsResults";
  import UsersResults from "./SearchResult/UsersResults";

  export default {
    components: {
      GroupsResults,
      UsersResults
    },
  
    props:['closeDialog'],

    data () {
      return {
        page: 1
      }
    },

    computed:{
      content (){
        return this.$store.getters.result
      },
      pages (){
        return this.$store.getters.pages
      },
      begin (){
        return this.$store.getters.taskBegin || '11:11:11'
      },
      title(){
        return this.$store.getters.title
      },
      count(){
        return this.$store.getters.count
      }
    },

    watch: {
      page(){
        this.$store.commit('setPage',this.page);
      }
    },

    methods:{
      close (){
        this.closeDialog()
        this.page = 1;
      }
    }

  }
</script>