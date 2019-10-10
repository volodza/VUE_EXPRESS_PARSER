<template>
  <div 
    class="taskList">
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
              size="30"
            ></v-progress-circular>
            <v-icon
              v-else-if="task.status === 'complete'"
              size="30"
              color="black"
              >mdi-check-circle-outline
            </v-icon>
            <v-icon
              v-else-if="task.status === 'error'"
              size="30"
              color="red"
              >mdi-close-circle-outline
            </v-icon>
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
          
          <div >
            <v-icon size="15">mdi-calendar</v-icon>

            {{ task.begin.slice(0,10) }}
            <v-icon
              size="15"
              v-if="task.count"
              >mdi-account-search-outline
            </v-icon>
            {{task.count}}
          </div>
        </div>

        <div class="icon">
          <v-icon size="15" >mdi-file-document-box-outline</v-icon>
          <v-icon size="15" >mdi-star-outline</v-icon>
          <v-icon 
          @click="deleteTask(task)"
          size="15">
          mdi-delete-outline
          </v-icon>
        </div>
      </li>
    </ul>
    <!-- <div class="overlay"> -->
    <SearchResults  v-if="dialog" :closeDialog='closeDialog' />
    <!-- </div> -->
  </div>
</template>

<style lang="sass" scoped> 
  .taskList
    display: flex
    flex-direction: column
    position: relative
    top: 10px
    right: 190px
    transition: 0.2s
    z-index: 1
    ul
      padding: 0 
      position: absolute
      background-color: #fcfbf9
      border-left: 1px solid #8d857c
      border-right: 1px solid #8d857c
      cursor: default
      color: black
      li
        display: flex
        align-items: center
        padding: 4px 10px
        border-bottom: 1px dashed #303030
      li:last-child
        border-bottom: 1px solid #8d857c
    
    .avatar
      margin: 0 10px
    .icon
      display: flex
      cursor: pointer
      i
        color: black
        padding: 0 2px
        
    .taskInfo
      display: flex
      flex-direction: column
      font-size: 13px
      min-width: 250px
      i
        color: black

          
  @media screen and (max-width: 820px)
    .taskList
      right: 113px
    .taskInfo
      min-width: 170px !important
</style>

<script>
import SearchResults from "../SearchResults";
export default {
  components: { SearchResults },
  data() {
    return {
      dialog: false,
      overlay: false
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
