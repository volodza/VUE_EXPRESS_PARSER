<template>
  <div class="text-xs-center">
      <v-card>

        <!-- header -->
        <v-card-title
          class="side py-2"
          primary-title
        >
          <div> 
            <v-list-tile-title class="sideText--text ">
              {{ title }}  
            </v-list-tile-title>
            <v-list-tile-sub-title style="color:#d0d0d0;">
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
            @click="dialog = false"
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
            
              <v-btn 
                flat 
                class="mx-2 px-0" 
                style=" background:white; min-width:40px;"
              >
                ID
              </v-btn> 

              <v-btn 
                flat 
                class="mx-0 px-0" 
                style="background:white; min-width:40px;"
              >
                <v-icon size="20">mdi-paperclip</v-icon>
              </v-btn>

              <v-btn 
                flat 
                style=" background:white; min-width:40px;"
                class="mx-2 px-0"
              >
                Й
              </v-btn>
             
            </div>  
        </v-card-title>

        <!-- sub-header-end -->
        <v-progress-linear 
          :indeterminate="true"
          v-if="content == null"
        >
        </v-progress-linear>

        <v-pagination
          v-model="page"
          :length="pages"
          :total-visible="9"
        ></v-pagination>

        <v-divider></v-divider>

        <v-layout
          column
          text-xs-center            
          v-for="item in content"
          :key="item.id"
        >
          <v-layout row>

            <v-flex align-self-center xs1>
              <v-avatar
                size="30"
                color="grey lighten-4"
              >
                <v-img :src="item.photo_50"></v-img>
              </v-avatar>       
            </v-flex>

            <v-layout text-xs-left column xs1>
              <a 
                target='_blank' 
                :href="'http://vk.com/public'+item.id"
                style="font-size:12px"
              >
                {{ item.name }}
              </a>

              <v-flex style="font-size:12px">
                <v-icon size='15'>mdi-vk</v-icon>{{ item.id }}
              </v-flex>
            </v-layout>

            <v-flex style="font-size:12px"  xs2 align-self-center>
              <v-icon size='15'>mdi-account-search-outline</v-icon>
              {{ item.members_count }}
            </v-flex>
            
          </v-layout>
          <v-divider></v-divider>
        </v-layout>

        <v-divider></v-divider>

        <v-pagination
          v-if="content!==null"
          v-model="page"
          :length="pages"
          :total-visible="9"
        ></v-pagination>

      </v-card>
    <!-- </v-dialog> -->
  </div>
</template>

<script>
  export default {
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
    }
  }
</script>