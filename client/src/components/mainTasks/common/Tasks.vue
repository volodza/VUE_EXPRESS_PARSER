<template>
  <!-- <v-layout row> -->
    <!-- <v-flex offset> -->
      <div 
      class="taskList" 
      >

        <!-- <v-progress-circular 
          v-if="this.$store.getters.tasks == []" 
          indeterminate color="primary"
        ></v-progress-circular> -->

 
        <!-- <div v-if="this.$store.getters.tasks.length == 0">
          <span class="text--grey">Список задач пуст.</span>
        </div> -->

        <!-- <v-list two-line subheader v-else style="padding-bottom:0px"> -->

          <ul>
            <li v-if="this.$store.getters.tasks.length == 0">Список задач пуст.</li>
            <li 
              v-for="(task,index) in tasks" 
              :key="index">
               <div class="avatar" >
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
              </div>

              <div
               class="taskInfo">

                <span v-if="task.count<1">
                  {{ task.title }}
                </span>

              <a v-if="task.count" style="color:#6e9ddb;" @click="setTaskBegin(task)">
                  {{ task.title }}
              </a>
              <span v-else>{{ task.title }}</span>
              
                <div style="font-size:12px">
                  <v-icon size="17">mdi-calendar</v-icon>

                  {{ task.begin.slice(0,10) }}
                  <v-icon
                    size="17"
                    v-if="task.count"
                    
                  >mdi-account-search-outline</v-icon>

                  <!-- <v-icon
              size="17"
              v-if="task.count"
              @click="downloadAnswer(task)"
                  >mdi-account-search-outline</v-icon>-->
                  {{task.count}}
                  <!-- <v-icon size='17'>mdi-timer-sand-empty</v-icon> -->
                </div>
               </div>

              <div class="icon">
                <!-- <v-layout> -->
                  <!-- <v-btn icon ripple> -->
                    <v-icon size="17" color="black">mdi-file-document-box-outline</v-icon>
                  <!-- </v-btn> -->
                  <!-- <v-btn icon ripple> -->
                    <v-icon size="17" color="black">mdi-star-outline</v-icon>
                  <!-- </v-btn> -->
                  <!-- <v-btn icon ripple @click="deleteTask(task)"> -->
                    <v-icon 
                    @click="deleteTask(task)"
                    size="17" 
                    color="black">
                    mdi-delete-outline
                    </v-icon>
                  <!-- </v-btn> -->
                <!-- </v-layout> -->
              </div>
              <!-- <v-divider v-if="index + 1 < tasks.length" :key="index"></v-divider> -->
            </li>
            
          </ul>
        <!-- </v-list> -->


      </div>
    <!-- </v-flex> -->

    <!-- <v-dialog v-model="dialog"  style="">
      <SearchResults :closeDialog='closeDialog' />
    </v-dialog> -->

  <!-- </v-layout> -->
</template>

<style lang="sass">
  .taskList
    display: flex
    flex-direction: column
    position: relative
    top: 10px
    transition: 0.2s
    
    // width: 400px
    // flex-wrap: wrap
    ul
      z-index: 8
      padding: 0 5px
      // width: 100%
      position: absolute
      background-color: white
      border: 1px solid #d7d7d7
      cursor: default
      li
        display: flex
        align-items: center
        padding: 4px 0
        border-bottom: 1px dashed #d7d7d7
        last-child: {border-bottom: none}
    
    .avatar
      margin: 0 8px
    .icon
      display: flex
      cursor: pointer
      // margin-left: 20px
      i
        padding: 0 2px
    .taskInfo
      display: flex
      flex-direction: column
      font-size: 14px
      min-width: 180px
          
  @media screen and (max-width: 820px)
    .taskList
      right: 110px
</style>

<script>
import SearchResults from "../SearchResults";
export default {
  components: { SearchResults },
  data() {
    return {
      dialog: false,
      overlay:false
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
      this.$store.commit("setResult", null);
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
      this.$http.get(`http://localhost:3000/api/tasks`, {
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
          params: obj
        })
        .then(res => {
          console.log(res.body);
          this.getTasks();
        });
    },
    setTaskBegin(task) {
      this.$store.commit("setTaskBegin", task.begin);
      this.$store.commit("setTask", task);
      this.$store.commit("setTitle", task.title);
      this.$store.commit("setCount", task.count);
      this.getArr();
      this.dialog = true;
    },
    closeDialog () {
      this.dialog = false;
      this.$store.commit('setPage',1);
      this.$store.commit("setTask", {});
    }

  },


  created() {
    this.getTasks();
    this.getTasks();
    this.interval = setInterval(() => this.getTasks(), 5000);
  }
};
</script>
