<template>
  <v-container fluid grid-list-xl>
    <v-layout flex-child wrap>
      <v-flex xs12 md6 d-flex>
        <v-flex class="white" text-xs-center>

<label >Пользователи ВКонтакте</label>
          <v-textarea
            solo
            name="input-7-1"
            label="По одной ссылке или id пользователя/сообщества в строке"
            value
          ></v-textarea>
             
            <v-divider class="mb-4"></v-divider>
            <div style="text-align:left;" class="font-weight-medium mb-1">
                <strong>Каких друзей собирать</strong>
            </div>
          <v-select
            solo 
            v-model="value" 
            :items="['Друзей','Подписчиков','Интересные страницы']" 
            chips 
            label="" 
            multiple
          >
          </v-select>

            <div style="text-align:left;" class="font-weight-medium mb-1">
                <strong>Общих друзей</strong>
            </div>
          <v-layout row wrap>
           <v-flex xs12 sm6 py-0>
              <v-text-field
                solo
                label="От"
                v-model="min"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 py-0>
              <v-text-field
                solo
                v-model="max"
                label="До (включительно)"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-divider class="mb-4"></v-divider>
            <div style="text-align:left;" class="font-weight-medium mb-1">
                <strong>Название задачи </strong>
            </div>
            <v-text-field solo label="Не обязательно"></v-text-field>

            <v-btn color="primary" block @click="getBirthdays">
            <v-icon>mdi-play</v-icon>
          </v-btn>
        </v-flex>
      </v-flex>

      <v-flex xs12 md6 d-flex >
        <v-flex class="white">
          <v-textarea
            name="input-7-1"
            label="Ключевые фразы"
            value
            hint="По одной ключевой фразе в строку"
            v-model="key_phrases"
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
      user_ids: "",
      answer: "Тут должен быть ответ"
    };
  },
  methods: {
    getFriends() {
      this.answer = "";
      this.$http
        .post("http://89.254.230.243:3000/getFriends", {
          user_ids: this.user_ids.split`\n`
        })
        .then(res => {
          this.answer = res.body;
        });
    }
  }
};
</script>
