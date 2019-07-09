<template>
  <v-layout row>
    <v-flex offset>
      <v-layout column text-xs-center>
        <v-progress-circular v-if="this.$store.getters.tasks == null" indeterminate color="primary"></v-progress-circular>
        <div v-if="this.$store.getters.monitored == []">Список сообществ для отслеживания пуст</div>

        <v-list two-line subheader v-else style="padding-bottom:0px">
          <template v-for="(task,index) in tasks" >

            
            <v-layout row :key="task.begin" avatar class="my-1">
               <v-flex align-self-center xs2 >
              <v-avatar size="30">
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

                <v-icon
                  v-else-if="task.status === 'error'"
                  size="35"
                  color="red"
                >mdi-close-circle-outline</v-icon>
                </v-avatar> 
              </v-flex>

              <v-layout text-xs-left column xs1 style="font-size:14px;">
                {{ task.title }}
                <v-flex style="font-size:12px">
                  <v-icon size="17">mdi-calendar</v-icon>

                  {{ task.begin.slice(0,10) }}
                  <v-icon
                    size="17"
                    v-if="task.count"
                    @click="setTaskBegin(task)"
                  >mdi-account-search-outline</v-icon>

                  <!-- <v-icon
              size="17"
              v-if="task.count"
              @click="downloadAnswer(task)"
                  >mdi-account-search-outline</v-icon>-->
                  {{task.count}}
                  <!-- <v-icon size='17'>mdi-timer-sand-empty</v-icon> -->
                </v-flex>
               </v-layout>

              <v-list-tile-action class="pt-2">
                <v-layout>
                  <v-btn icon ripple>
                    <v-icon size="17" color="black">mdi-file-document-box-outline</v-icon>
                  </v-btn>
                  <v-btn icon ripple>
                    <v-icon size="17" color="black">mdi-star-outline</v-icon>
                  </v-btn>
                  <v-btn icon ripple @click="deleteTask(task)">
                    <v-icon size="17" color="black">mdi-delete-outline</v-icon>
                  </v-btn>
                </v-layout>
              </v-list-tile-action>
            
            </v-layout>
            <v-divider v-if="index + 1 < tasks.length" :key="index" ></v-divider>
          </template>
        </v-list>
      </v-layout>
    </v-flex>

    <v-dialog v-model="dialog" width="700" style="">
      <SearchResults :closeDialog='closeDialog' />
    </v-dialog>
  </v-layout>
</template>

<script>
import SearchResults from "../SearchResults";
export default {
  components: { SearchResults },
  data() {
    return {
      dialog: false
    };
  },
  // provide() {
  //   return {
  //     getArr: this.getArr
  //   }
  // },
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
    page() {
      return this.$store.getters.page;
    }
  },
  watch: {
    // dialog(){
    //   if (!this.dialog) this.$store.commit('setResults',null)
    // },
    page() {
      this.$store.commit("setResult", null);
      this.getArr();
    },
    dialog() {
      if (!this.dialog) {
        this.$store.commit("setResult", null);
        this.$store.commit("setPage", 1);
      } else {
        this.$store.commit("setPages", 1);
        this.getArr();
      }
    }
  },
  methods: {
    getArr() {
      // if(!this.taskBegin) return;
      this.$http
        .get(`http://localhost:3000/api/test`, {
          params: {
            page: this.page || 1,
            user_id: this.$store.getters.user.id,
            begin: this.$store.getters.taskBegin
          }
        })
        .then(
          response => {
            // console.log(response.body)
            this.$store.commit("setResult", response.body.arr);
            this.$store.commit("setPages", response.body.pages);
          },
          err => {
            err;
          }
        );
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

      this.$http
        .get(`http://localhost:3000/api/tasks/delete`, {
          params: obj
        })
        .then(res => {
          console.log(res.body);
          this.getTasks();
        });
    },
    setTaskBegin(task) {
      this.$store.commit("setTaskBegin", task.begin);
      this.$store.commit("setTitle", task.title);
      this.$store.commit("setCount", task.count);
      this.getArr();
      this.dialog = true;
    },
    closeDialog () {
      this.dialog = false;
      this.$store.commit('setPage',1);
    }
  },
  created() {
    this.getTasks();
    this.getTasks();
    this.interval = setInterval(() => this.getTasks(), 5000);
  }
};
</script>
