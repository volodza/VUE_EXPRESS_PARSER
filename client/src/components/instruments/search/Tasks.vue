<template>
    <div style="height:250px;overflow:auto;border:1px solid #e0e0e0;">
            <v-progress-circular
              v-if="!this.$store.getters.tasks"
              indeterminate
              color="primary"
            ></v-progress-circular>

        <v-list two-line subheader v-else style="padding-bottom:20px">

          <v-list-tile
            v-for="task in tasks"
            :key="task.begin"
            avatar
            style="height:50px;padding:0 0 0 0"
          >
            <v-list-tile-avatar style="min-width:0px;" >
            <v-progress-circular
              v-if="task.status === 'loading'"
              indeterminate
              color="primary"
              size="28"
            ></v-progress-circular>
            <v-icon
              v-else-if="task.status === 'complete'"
              size='35'
              color="green"
            >
            mdi-check-circle-outline
            </v-icon>

            <v-icon
              v-else-if="task.status === 'error'"
              size='35'
              color="red"
            >
            mdi-close-circle-outline
            </v-icon>
              
            </v-list-tile-avatar>

            <v-list-tile-content style="font-size:14px;height:40px">
              <v-list-tile-title>{{ task.title }}</v-list-tile-title>
              <v-list-tile-sub-title>
                <v-icon size='17'>mdi-calendar</v-icon>
                {{ task.begin.slice(0,10) }}
                <v-icon 
                  size='17'
                  v-if="task.count"
                  @click="downloadAnswer(task)"
                >
                  mdi-account-search-outline
                </v-icon>
                {{task.count}}
                
                <!-- <v-icon size='17'>mdi-timer-sand-empty</v-icon> -->

                </v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action >
              <v-layout >
               <v-btn icon ripple>
                <v-icon size="20" color="black">mdi-file-document-box-outline</v-icon>
              </v-btn>
              <v-btn icon ripple>
                <v-icon size="20" color="black">mdi-star-outline</v-icon>
              </v-btn>  
               <!-- <v-btn icon ripple>
                <v-icon size="20" color="black">mdi-reload</v-icon>
              </v-btn>  -->
              <v-btn 
                icon 
                ripple
                @click="deleteTask(task)"
              >
                <v-icon size="20" color="black">mdi-delete-outline</v-icon>
              </v-btn>                             

              </v-layout>
            
            </v-list-tile-action>
            
          </v-list-tile>
    

        </v-list>

    </div>
</template>

<script>
export default {
  computed:{
    tasks (){
      return this.$store.getters.tasks
    }
  },
  methods:{
    downloadAnswer(task){
      const obj = {
        user_id:this.$store.getters.user.id,
        begin:task.begin
      }
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
      fetch('http://89.254.230.243:3000/downloadAnswer', {
        method: 'POST',
        responseType: 'arraybuffer',
        body:JSON.stringify(obj),
        headers:{
          'content-type': 'application/json'
          }
      })
      .then(res => res.text())
      .then(base64String => {
          const anchorTag = document.createElement('a');
          // console.log(base64String)
          anchorTag.href = encodeURI(base64String);
          anchorTag.download = obj.user_id + ".txt"; 
          anchorTag.click();
      });
    },
    getTasks (){
      this.$http.post('http://89.254.230.243:3000/getTasks',{
        user_id:this.$store.getters.user.id
      })
       .then(res =>{
         if(!res)return
          this.$store.commit('setTasks',res.body)
       })
      
    },
    deleteTask (task) {
      const obj = {
        user_id:this.$store.getters.user.id,
        begin:task.begin
      };

      this.$http.post('http://89.254.230.243:3000/deleteTask',obj)
       .then(res =>{
         console.log(res.body)
         this.getTasks()
       })
    }
  },
  created (){
    this.interval = setInterval(() => this.getTasks(), 5000);
  }
}
</script>

