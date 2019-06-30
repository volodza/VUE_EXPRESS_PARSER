<template>
  <v-container fluid grid-list-xl>
    <v-layout flex-child wrap>
      <v-flex xs12 md6 d-flex>
        <v-flex class="white" text-xs-center>

            <MonitoredPublics style="margin-bottom:20px"></MonitoredPublics>

          <v-textarea
            solo
            name="input-7-1"
            label="Сообщества для отслеживания"
            hint="По одной ссылке или id сообщества в строке."
            v-model="textarea.value"
          ></v-textarea>   
          <v-divider></v-divider> 

          <div class="font-weight-medium">Вступившие в несколько сообществ</div>
          <v-layout>
            
            <v-flex xs6>
              <v-text-field single-line placeholder="От" solo v-model="inputs.inSeveralGroups.from" ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field single-line solo placeholder="До" v-model="inputs.inSeveralGroups.to" ></v-text-field>
            </v-flex>
          </v-layout>

          <v-divider class="mb-4"></v-divider>

          <v-text-field v-model="inputs.taskName" solo label="Название задачи"></v-text-field>

          <v-btn color="primary" block @click="getRecentlyJoin">
              <v-icon>mdi-play</v-icon>
          </v-btn>
        </v-flex>
      </v-flex>

      <v-flex xs12 md6 d-flex>
        <v-flex class="white">
          {{sorted}}
          <v-textarea
            name="input-7-1"
            label="Пользователи"
            value="answer"
            hint="По одной ключевой фразе в строку"
          ></v-textarea>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MonitoredPublics from '@/components/common/MonitoredPublics'
export default {
  components:{MonitoredPublics:MonitoredPublics},
  data() {
    return {
      textarea:{
        value:''
      },
      inputs:{
        inSeveralGroups:{
          from:null,
          to:null
        },
        taskName:''
      }
    }
  },
  methods: {
    getRecentlyJoin() {
      if (!this.textarea.value) {
        this.$store.commit('setError','Введите хотябы одну ссылку на сообщество')
        return
      }
      let obj = {
        group_ids:this.sorted,
        in_several_groups_from: this.inputs.inSeveralGroups.from,
        in_several_groups_to: this.inputs.inSeveralGroups.to,
        taskName:this.inputs.taskName || 'Недавно вступившие',
        user_id:this.$store.getters.user.id
      };
      this.answer = "";
      this.$http.post("http://89.254.230.243:3000/getRecentlyJoin", obj).then(res => {
        this.answer = res.body;
        this.$store.commit('setSuccess',res.body)
      });
    }
  },
  computed:{
    sorted () {
      let arr = this.textarea.value.split`\n`
      return arr.map(x=>{
        return /^\d+$/.test(x) ? +x : x.replace(/.+\/\/|www.|\..+|vk.com\//g,'')
      })
    }
  }
};
</script>