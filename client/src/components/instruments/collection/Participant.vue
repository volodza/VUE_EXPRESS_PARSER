<template>
  <div>
    <h1>Поиск участников</h1>
    <div class="participant">
      <div class="content flex ">
        <div class="flex">
          <label>Ключевые слова</label>
          <p-textarea
            label="По одной ссылке или id сообщества в строке"
            v-model="textarea.value"
          ></p-textarea>
        </div>

        <div class="layout">
          <div class="flex col-sm-6 col-xs-12">
          <label>Каких участников собирать?</label>
          <p-select
            multiple
            :items="selects.type.items"
            v-model="selects.type.selected"
          ></p-select> 
          </div> 

          <div class="flex col-sm-3 col-xs-6">
            <label>Пребывают в группах</label>
            <p-input
              v-model="inputs.groups.from"
              label="От"
            ></p-input>
          </div>

          <div class="flex col-sm-3 col-xs-6">
            <p-input
              v-model="inputs.groups.to"
              label="До"
            ></p-input>
          </div>
        </div>

        <div class="flex">
          <p-checkbox 
            :label="`Собрать участников из сообщества, если оно скрыло участников (архив)`" 
            v-model="checkboxes.hidden"
          ></p-checkbox>          
        </div>

        
        <div class="layout">
          <div class="flex col-sm-8 col-xs-12">
            <label>Название задачи</label>
            <p-input
              v-model="inputs.taskTitle"
              label="Любое название (для себя)" >
            </p-input>
          </div>

          <div class="flex">
            <p-btn
              dark
              @click="getUsers"
              :loading="!answer"
            >
              <v-icon style="margin-right: 5px; color: white">mdi-play</v-icon>
              <label>Начать поиск</label>
            </p-btn>
          </div>
        </div>

      </div>

      <div class="descriptions flex  ">
        <h2>Описание</h2>
        <p></p>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
  .participant
    flex-wrap: wrap
    padding: 0 12px
    display: flex
    .content
      display: flex
      flex-direction: column
      background: white
    .descriptions
      background: white
      margin-left: 24px

  .layout
    display: flex
    flex-wrap: wrap
    align-items: flex-end

  .flex
    padding: 12px
    display: flex
    flex-direction: column  

  h1
    font-size: 40px
    padding-left: 12px    
    
</style>

<script>
export default{
  data() {
    return{
      textarea:{
        value: null
      },

      checkboxes: {
        hidden: false
      },

      selects: {
        type: {
          items: [
            { title: "Участников", id: 0 },
            { title: "Возможных участников", id: 1 },
          ],
          selected: {title: "Участников", id: 0}
        }    
      },

      inputs:{
        groups:{
          from:null,
          to:null
        },
        taskTitle:null
      },
      answer:'1'
    }
  },
  methods:{
    getUsers() {
      //  if (!this.textarea.key_word) {
      //   this.$store.commit("setError", "Введите хотя бы одну ключевую фразу");
      //   return;
      // }
      let obj = {
        q: this.key_phrases,
        hidden: this.checkboxes.hidden,
        groupsFrom: +this.inputs.groups.from,
        groupsTo: +this.inputs.groups.to,
        status: this.selects.type.selected,
        title: this.inputs.taskTitle || "Поиск > Участники",
        user_id: this.$store.getters.user.id
      };
      this.answer = "";
      this.$http.post("/api/search/users", obj).then(res => {
        this.answer = res.body;
      });
    },
  },
  computed: {
  key_phrases() {
    return this.textarea.value.split`\n`;
  }
}
}
</script>