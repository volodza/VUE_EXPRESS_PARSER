<template>
  <div>
    <h1>Поиск пользователей ВКонтакте</h1>
    <div class="users">
      <div class="content flex">
        <!-- Textarea -->
        <div class="flex">
          <label>Ключевые слова</label>
          <p-textarea label="По одному слову в строке" v-model="textarea.value"></p-textarea>
        </div>

        <div class="flex">
          <p-checkbox :label="`Точное вхождение поисковой фразы`" v-model="checkboxes.exactMatch"></p-checkbox>

          <p-checkbox :label="`Только с фотографией`" v-model="checkboxes.hasPhoto"></p-checkbox>
        </div>

        <div class="layout sel">
          <div class="flex">
            <label>Пол</label>
            <p-select
              label="Выберите пол"
              :items="selects.sex.items"
              v-model="selects.sex.selected"
            ></p-select>
          </div>

          <div class="flex">
            <label>Семейное положение</label>
            <p-select
              label="Выберите семейное положение"
              :items="selects.status.items"
              v-model="selects.status.selected"
            ></p-select>
          </div>
        </div>

        <div class="layout input">
          <div class="flex">
            <label>Возраст</label>
            <p-input label="От" v-model="inputs.age.from"></p-input>
          </div>

          <div class="flex">
            <p-input v-model="inputs.age.to" label="До"></p-input>
          </div>

          <div class="flex">
            <label>Геолокация</label>
            <p-autocomplete
              v-model="selects.country.selected"
              :loading="selects.country.loading"
              :items="selects.country.items"
              :search-input.sync="selects.country.search"
              label="Страна"
            ></p-autocomplete>
          </div>

          <div class="flex">
            <p-autocomplete
              :disabled="!selects.country.selected"
              v-model="selects.city.selected"
              :loading="selects.city.loading"
              :items="selects.city.items"
              :search-input.sync="selects.city.search"
              label="Город"
            >
              <template v-slot:item="{ item }">
                <v-list-tile-avatar
                  color="indigo"
                  class="headline font-weight-light white--text"
                >{{ item.title.charAt(0) }}</v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-text="item.title"></v-list-tile-title>
                  <v-list-tile-sub-title v-text="item.region"></v-list-tile-sub-title>
                </v-list-tile-content>
              </template>
            </p-autocomplete>
          </div>
        </div>

        <!-- <div class="font-weight-medium mt-3">Поиск по</div> -->
        <div class="flex">
          <label>Поиск по</label>
          <p-radio-group :items="radiogroup.items" v-model="radiogroup.selected"></p-radio-group>
        </div>

        <div class="layout goTask">
          <div class="taskName flex">
            <label>Название задачи</label>
            <p-input
              class="border"
              v-model="inputs.taskTitle"
              flat
              solo
              label="Любое название (для себя)"
              hide-details
            ></p-input>
          </div>

          <div class="flex go">
            <p-btn dark @click="getGroups">Начать поиск</p-btn>
          </div>
        </div>
      </div>

      <div class="descriptions flex">
        <h1>Описание</h1>
        <p>
          В поиске пользователей можно искать людей по полу,
          городу, возрасту, тех, у кого день рождения, семейному положению,
          наличию детей, а так же производить поиск их родственников,
          вторых половинок и детей.
          <br />
          <br />1. Введите параметры поиска людей
          <br />
          <br />2. Задайте понятное описание задачи, чтобы не забыть, кто у Вас собирается.
          <br />
          <br />3. Нажмите "Добавить задачу" и перейдите к следующей.
          <br />
          <br />При указании возраста, города, семейного положения выдача может
          отличаться от выдачи ВКонтакте, т.к. в базу попадают только те,
          кто не скрыл возраст, семейное положение, город настройками приватности.
        </p>
      </div>
    </div>
  </div>
</template>


<style lang="sass" scoped>
  .users
    flex-wrap: wrap
    padding: 0 12px
    display: flex
    align-items: flex-start
    .content
      display: flex
      flex-direction: column
      background: white
      flex: 2
      .goTask
        .taskName
          flex-basis: 70% 
        .go
          flex-basis: 30% 
    .descriptions
      background: white
      margin-left: 24px
      flex: 1

  .input
    .flex
      flex-basis: 25% 
    
  .sel
    .flex
      flex-basis: 50%  

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

  @media screen and (max-width: 600px)
    .input
      .flex
        flex-basis: 50% 
    .goTask
      .taskName
        flex-basis: 65% !important
      .go
        flex-basis: 40% !important       

  @media screen and (max-width: 992px)
    .content
      min-width: 100%    
</style>


<script>
export default {
  data() {
    return {
      textarea: {
        value: ""
      },

      radiogroup: {
        items: [
          { title: "Интересам", id: 0 },
          { title: "Должности", id: 1 },
          { title: "Месту работы", id: 2 },
          { title: "Религии", id: 3 },
          { title: "Имени", id: 4 },
          { title: "Фамилии", id: 5 },
          { title: "Имени + Фамилии", id: 6 },
          { title: "Статусу", id: 7 },
          { title: "Имени ребенка", id: 8 }
        ],
        selected: null
      },

      checkboxes: {
        hasPhoto: false,
        exactMatch: false
      },

      inputs: {
        age: {
          from: null,
          to: null
        },
        taskTitle: null
      },

      selects: {
        sex: {
          items: [
            { title: "Любой", value: 0 },
            { title: "Женский", value: 1 },
            { title: "Мужской", value: 2 }
          ],
          selected: null
        },
        status: {
          items: [
            { title: "Не женат / Не замужем", value: 1 },
            { title: "Есть друг / Есть подруга", value: 2 },
            { title: "Помолвлен / Помолвлена", value: 3 },
            { title: "Женат / Замужем", value: 4 },
            { title: "Всё сложно", value: 5 },
            { title: "В активном поиске", value: 6 },
            { title: "Влюблен / Влюблена", value: 7 },
            { title: "В гражданском браке", value: 8 }
          ],
          selected: null
        },
        country: {
          loading: false,
          items: [],
          selected: null,
          search: null
        },
        city: {
          loading: false,
          items: [],
          selected: null,
          search: null
        }
      },
      search: null,
      answer: "1"
    };
  },
  methods: {
    getUsers() {
      //  if (!this.textarea.key_word) {
      //   this.$store.commit("setError", "Введите хотя бы одну ключевую фразу");
      //   return;
      // }
      let obj = {
        q: this.key_phrases,
        searchBy: this.radiogroup.selected,
        exactMatch: this.checkboxes.exactMatch,
        hasPhoto: +this.checkboxes.hasPhoto,
        ageFrom: +this.inputs.age.from,
        ageTo: +this.inputs.age.to,
        status: this.selects.status.selected,
        sex: this.selects.sex.selected,
        city_id: this.selects.city.selected,
        country_id: this.selects.country.selected,
        title: this.inputs.taskTitle || "Поиск > Пользователи",
        user_id: this.$store.getters.user.id
      };
      this.answer = "";
      this.$http.post("/api/search/users", obj).then(res => {
        this.answer = res.body;
      });
    },

    getCities(v) {
      if (!this.selects.country.selected) return;
      this.selects.city.loading = true;
      this.$http
        .get("/api/geolocation/cities", {
          params: {
            q: v,
            country_id: this.selects.country.selected
          }
        })
        .then(res => {
          this.selects.city.items = res.body.items;
          this.selects.city.loading = false;
        });
    },
    getCountries(v) {
      this.selects.country.loading = true;
      this.$http
        .get("/api/geolocation/countries", {
          params: {
            q: v
          }
        })
        .then(res => {
          this.selects.country.items = res.body.items;
          this.selects.country.loading = false;
        });
    }
  }, //конец methods
  watch: {
    "selects.city.search": function(val) {
      val && val !== this.selects.city.selected && this.getCities(val);
    },
    "selects.country.search": function(val) {
      val && val !== this.selects.country.selected && this.getCountries(val);
    }
  },
  computed: {
    key_phrases() {
      return this.textarea.value.split`\n`;
    }
  }
};
</script>
