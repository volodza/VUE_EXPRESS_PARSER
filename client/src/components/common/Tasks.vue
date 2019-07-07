<template>
<v-layout row>
  <v-flex offset>
    <v-card>
  <!-- <div style="overflow:auto;border:1px solid #e0e0e0;"> -->
    <v-progress-circular v-if="this.$store.getters.tasks == null" indeterminate color="primary"></v-progress-circular>
    {{this.$store.getters.taskBegin}}
    {{this.$store.getters.results}}
    <div v-if="this.$store.getters.monitored == []">Список сообществ для отслеживания пуст</div>

    <v-list two-line subheader v-else style="padding-bottom:20px">
      <template v-for="(task,index) in tasks">
      <v-list-tile
        
        :key="index"
        avatar
        style="height:50px;padding:0 0 0 0"
      >
        <v-list-tile-avatar style="min-width:0px;">
          <v-progress-circular
            v-if="task.status === 'loading'"
            indeterminate
            color="primary"
            size="28"
          ></v-progress-circular>
          <v-icon
            v-else-if="task.status === 'complete'"
            size="35"
            color="green"
          >mdi-check-circle-outline</v-icon>

          <v-icon v-else-if="task.status === 'error'" size="35" color="red">mdi-close-circle-outline</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content style="font-size:14px;height:40px">
          <v-list-tile-title>{{ task.title }}</v-list-tile-title>
          <v-list-tile-sub-title>

            <v-icon size="17">mdi-calendar</v-icon>
            {{ task.begin.slice(0,10) }}


            <v-icon
              size="17"
              v-if="task.count"
              @click="setTaskBegin(task.begin)"
            >
              mdi-account-search-outline
            </v-icon>



            <!-- <v-icon
              size="17"
              v-if="task.count"
              @click="downloadAnswer(task)"
            >mdi-account-search-outline</v-icon> -->

            {{task.count}}
            <!-- <v-icon size='17'>mdi-timer-sand-empty</v-icon> -->
          </v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-layout>
            <v-btn icon ripple>
              <v-icon size="20" color="black">mdi-file-document-box-outline</v-icon>
            </v-btn>
            <v-btn icon ripple>
              <v-icon size="20" color="black">mdi-star-outline</v-icon>
            </v-btn>
            <!-- <v-btn icon ripple>
                <v-icon size="20" color="black">mdi-reload</v-icon>
            </v-btn>-->
            <v-btn icon ripple @click="deleteTask(task)">
              <v-icon size="20" color="black">mdi-delete-outline</v-icon>
            </v-btn> 
          </v-layout>
        </v-list-tile-action> 
      </v-list-tile>
      <v-divider v-if="index + 1 < tasks.length" :key="index" class="mt-3"></v-divider>
      </template>
    </v-list> 
  </v-card>
  </v-flex>

  <v-dialog
    v-model="dialog"
    width="500"
  >
    <SearchResults/>
  </v-dialog>



  <!-- </div> -->
</v-layout> 
</template>

<script>
import SearchResults from '../SearchResults'
export default {
  components:{SearchResults},
  data () {
    return {
      dialog:false
    }
  },
  provide() {
    return {
      getArr: this.getArr
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    }
  },
  watch:{
    dialog(){
      if (!this.dialog) this.$store.commit('setResults',null)
    }
  },
  methods: {
      getArr (page){
        // if(!this.taskBegin) return;
        this.$http.get(`http://localhost:3000/api/test`,{
          params:{
            page:this.page,
            user_id: this.$store.getters.user.id,
            begin: this.taskBegin
          }
        })
          .then(response => {
            // console.log(response.body)
            this.$store.commit('setResults',response.body.arr);
            this.pages = response.body.pages
        },(err) => {err});
      },

    downloadAnswer(task) {
      const obj = {
        user_id: this.$store.getters.user.id,
        begin: task.begin
      };
      // this.$http.post('http://localhost:3000/downloadAnswer',obj,{
      //   responseType: 'arraybuffer',
      //   headers:{
      //     'content-type': 'application/json'
      //     }
      // })
      // .then(res => console.log(res))
      // .then(base64String => {
      //     const anchorTag = document.createElement('a');
      //     console.log(base64String)
      //     anchorTag.href = base64String;
      //     anchorTag.download = obj.user_id + ".txt";
      //     anchorTag.click();
      // });
      fetch(`http://${this.$store.getters.ip}downloadAnswer`, {
        method: "POST",
        responseType: "arraybuffer",
        body: JSON.stringify(obj),
        headers: {
          "content-type": "application/json"
        }
      })
        .then(res => res.text())
        .then(base64String => {
          const anchorTag = document.createElement("a");
          // console.log(base64String)
          anchorTag.href = encodeURI(base64String);
          anchorTag.download = obj.user_id + ".txt";
          anchorTag.click();
        });
    },
    getTasks() {
      if (!this.$store.getters.user.id) return;
      this.$http
        .get(`http://localhost:3000/api/tasks`, {
          params: {
            user_id: this.$store.getters.user.id
          }
        })
        .then(res => {
          if (!res) return;
          this.$store.commit("setTasks", res.body);
        });
    },
    deleteTask(task) {
      const obj = {
        user_id: this.$store.getters.user.id,
        begin: task.begin
      };

      this.$http.get(`http://localhost:3000/api/tasks/delete`, {
        params:obj
      }).then(res => {
        console.log(res.body);
        this.getTasks();
      });
    },
    setTaskBegin (begin){
      this.$store.commit('setTaskBegin',begin)
      this.dialog = true
    }
  },
  created() {
    this.interval = setInterval(() => this.getTasks(), 5000);
  }
};
</script>
