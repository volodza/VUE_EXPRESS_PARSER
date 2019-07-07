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
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Список найденых
        </v-card-title>

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