<template>
  <div class="text-xs-center">
    <!-- <v-dialog
      v-model="dialog"
      width="500"
    >

      <template v-slot:activator="{ on }">
        <v-btn
          color="red lighten-2"
          dark
          v-on="on"
        >
          Click Me
        </v-btn>
      </template> -->

      <v-card>

        <!-- header -->
        <v-card-title
          class="side py-2"
          primary-title
        >
        <v-list-item-content> 
          <v-list-tile-title class="sideText--text ">{ task.title }  </v-list-tile-title>
            <v-list-tile-sub-title style="color:#d0d0d0;">
            <v-icon 
            style="color:#d0d0d0;" 
            size="17" >mdi-calendar</v-icon>
            { task.begin.slice(0,10) }

             <v-icon 
             style="color:#d0d0d0;"
              size="17">
              mdi-account-search-outline
            </v-icon>
            {task.count}
            </v-list-tile-sub-title> 
          </v-list-item-content>
          <v-icon  style="color:#d0d0d0; margin-left: auto;">mdi-close-circle-outline</v-icon>
        </v-card-title>
        <!-- header-end -->

        <!-- sub-header -->
<v-card-title
          class="header py-3"
          primary-title
        >
        <!-- <v-list-item-content>  -->
          <div style=" margin:0 auto; border:1px solid #d7d7d7;">
            
              <v-btn 
                flat 
                  class="mx-2 px-0" style=" background:white; min-width:40px;"
                  >
                Х
              </v-btn> 
              <v-btn flat class="mx-0 px-0" style="background:white; min-width:40px;"
                 >
                У
              </v-btn>
              <v-btn flat style=" background:white; min-width:40px;"
                 class="mx-2 px-0">
                Й
              </v-btn>
             
             
            </div>
            
          <!-- </v-list-item-content> -->
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
          :key="item.name"
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
    inject: ['getArr'],
    data () {
      return {
        page: 1,
        arr:null,
        pages:1
      }
    },
    
    methods:{
      // getArr (page){
      //   // if(!this.taskBegin) return;
      //   this.$http.get(`http://localhost:3000/api/test`,{
      //     params:{
      //       page:this.page,
      //       user_id: this.$store.getters.user.id,
      //       begin: this.taskBegin
      //     }
      //   })
      //     .then(response => {
      //       // console.log(response.body)
      //       this.$store.commit('setResults',response.body.arr);
      //       this.pages = response.body.pages
      //   },(err) => {err});
      // }
    },
    computed:{
      content (){
        return this.$store.getters.results
      },
      taskBegin(){
        return this.$store.getters.taskBegin
      }
    },
    watch: {
      page(){
        this.$store.commit('setResults',null);
        this.getArr(this.page)
      }
    },
    created (){
      setTimeout(this.getArr(this.page),8000)
    }
  }
</script>