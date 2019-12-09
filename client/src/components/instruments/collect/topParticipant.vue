<template>
  <div>
    <h1>Поиск топ участников</h1>
    <div class="participant">
      <div class="content flex col-md-8 col-xs-12">
        <div class="flex">
          <label>Ключевые слова</label>
          <p-textarea
            label="По одной ссылке или id сообщества в строке"
            v-model="textarea.value"
          ></p-textarea>
        </div>

        <div class="layout ">
          <!-- <div class="flex col-sm-6 col-xs-12"> -->
          <!-- <label>Каких участников собирать?</label> -->
          <!-- <div style=""> -->
            <div class="flex q">
            <label>Топ каких участников собирать?</label>
            <div class="layout input">
            <div class="flex">
            <p-input
              v-model="inputs.party.from"
              label="От"
            ></p-input>
          </div>

          <div class="flex ">
            <p-input
              v-model="inputs.party.to"
              label="До"
            ></p-input>
          </div>
          </div> 
</div>

<div class="flex q">
  <label>Пребывают в группах</label>
<div class="layout input">
          <div class="flex">
            
            <p-input
              v-model="inputs.groups.from"
              label="От"
            ></p-input>
          </div>

          <div class="flex">
            <p-input
              v-model="inputs.groups.to"
              label="До"
            ></p-input>
          </div>
        </div>
     </div>
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

      <div class="descriptions flex  col-xs-12">
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
    align-items: flex-start
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

  .q
    padding: 0 !important 
    flex-basis: 50%
    label
      padding-left: 12px

  .input
    .flex
      padding-top: 0 !important 
    
  @media screen and (max-width: 600px)
    .q
      flex-basis: 100%
</style>

<script>
export default{
  data() {
    return{
      textarea:{
        value: null
      },

      inputs:{
        groups:{
          from:null,
          to:null
        },
        party:{
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
        groupsFrom: +this.inputs.groups.from,
        groupsTo: +this.inputs.groups.to,
        partyFrom: +this.inputs.party.from,
        partyFrom: +this.inputs.party.from,
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