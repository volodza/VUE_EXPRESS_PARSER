<template>
  <v-container fluid grid-list-xl>
    <v-layout flex-child wrap>
      <v-flex xs12 md6 d-flex>
        <v-flex class="white" text-xs-center>
          <v-textarea
            solo
            name="input-7-1"
            label="Сообщества"
            hint="По одной ссылке или id сообщества в строке."
            v-model="textarea.value"
          ></v-textarea>   
          <v-divider></v-divider> 

          <v-select
            class="mt-4"
            solo
            :items="selects.typeOfSubscribers.items"
            item-value="value"
            item-text="title"
            v-model="selects.typeOfSubscribers.selected"
            label="Каких участников собирать?"
            multiple
            chips
            persistent-hint
          ></v-select>
          <div class="font-weight-medium">Пребывают в группах</div>
          <v-layout>
            
            <v-flex xs6>
              <v-text-field single-line placeholder="От" solo v-model="inputs.inSeveralGroups.from" ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field single-line solo placeholder="До" v-model="inputs.inSeveralGroups.to" ></v-text-field>
            </v-flex>
          </v-layout>

          <v-divider class="mb-4"></v-divider>

          <v-text-field solo label="Название задачи"></v-text-field>

          <v-btn color="primary" block @click="getSubscribers">
              <v-icon>mdi-play</v-icon>
          </v-btn>
        </v-flex>
      </v-flex>

      <v-flex xs12 md6 d-flex>
        <v-flex class="white">
          {{selects.typeOfSubscribers.selected}}
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
export default {
  data() {
    return {
      textarea:{
        value:''
      },
      selects:{
        typeOfSubscribers:{
          items:[
            {title:'Участников',value:''},
            {title:'Возможных участников',value:'unsure'},
            {title:'Приглашённых',value:'invited'}
          ],
          selected:null          
        }
      },
      inputs:{
        inSeveralGroups:{
          from:null,
          to:null
        },
        taskName:null
      }
    }
  },
  methods: {
    getSubscribers() {
      if (!this.selects.typeOfSubscribers.selected) return;
      if (!this.textarea.value) {
        this.$store.commit('setError','Введите хотя бы одну ключевую фразу')
        return
      }
      let obj = {
        group_ids:this.sorted,
        filter:this.selects.typeOfSubscribers.selected.join`,`,
        in_several_groups_from: this.inputs.inSeveralGroups.from,
        in_several_groups_to: this.inputs.inSeveralGroups.to
      };
      this.answer = "";
      this.$http.post("http://89.254.230.243:3000/getSubscribers", obj).then(res => {
        this.answer = res.body;
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