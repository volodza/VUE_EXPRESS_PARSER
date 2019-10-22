<template>
  <v-container grid-list-xl fluid>
    <div class="mb-3">
      <h1 class="display-1">Пользователи ВКонтакте</h1>
    </div>
    {{        {q: this.key_phrases,
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
        user_id: this.$store.getters.user.id} }}
    <v-layout flex-child wrap>
      <v-flex xs12 md8 style="padding-top: 0">
        <v-flex class="white">
          <!-- Textarea -->
          <v-layout row wrap>
            <v-flex xs12>
              <label>Ключевые слова</label>
              <p-textarea
                label="По одному слову в строке"
                v-model="textarea.value"
              ></p-textarea>
            </v-flex>
          </v-layout>

          <v-layout column wrap mx-0>
            <p-checkbox
              :label="`Точное вхождение поисковой фразы`"
              v-model="checkboxes.exactMatch"
            ></p-checkbox>

            <p-checkbox 
              :label="`Только с фотографией`" 
              v-model="checkboxes.hasPhoto"
            ></p-checkbox>
          </v-layout>

          <v-layout wrap>
            <v-flex xs12 sm6>
              <label>Пол</label>
              <p-select
                label="Выберите пол"
                :items="selects.sex.items"
                v-model="selects.sex.selected"
              ></p-select>
            </v-flex>

            <v-flex xs12 sm6>
              <label>Семейное положение</label>
              <p-select
                label="Выберите семейное положение"
                :items="selects.status.items"
                v-model="selects.status.selected"
              ></p-select>
            </v-flex>
          </v-layout>

          
          <v-layout wrap style="display: flex; align-items: flex-end">
            
            <v-flex xs6 sm3 pt-0>
              <label>Возраст</label>
              <p-input
                label="От"
                v-model="inputs.age.from"
              ></p-input>
            </v-flex>

            <v-flex xs6 sm3 pt-0>
              <p-input
                v-model="inputs.age.to"
                label="До"
              ></p-input>
            </v-flex>

            <v-flex xs6 sm3 pt-0>
              <label>Геолокация</label>
              <p-autocomplete
                v-model="selects.country.selected"
                :loading="selects.country.loading"
                :items="selects.country.items"
                :search-input.sync="selects.country.search"
                label="Страна"
              ></p-autocomplete>
            </v-flex>

            <v-flex xs6 sm3 pt-0>
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
            </v-flex>
          </v-layout>

          <!-- <div class="font-weight-medium mt-3">Поиск по</div> -->
          <label>Поиск по</label>
          <p-radio-group 
          :items="radiogroup.items"
          v-model="radiogroup.selected">
            <!-- <v-radio label="Интересам" value="interests"></v-radio>
            <v-radio label="Должности" value="position"></v-radio>
            <v-radio label="Месту работы" value="workplace"></v-radio>
            <v-radio label="Религии" value="religion"></v-radio>
            <v-radio label="Имени" value="name"></v-radio>
            <v-radio label="Фамилии" value="surname"></v-radio>
            <v-radio label="Имени + Фамилии" value="name+surname"></v-radio>
            <v-radio label="Статусу" value="status"></v-radio>
            <v-radio label="Имени ребенка" value="childname"></v-radio> -->
          </p-radio-group>

          <v-divider class="my-4"></v-divider>

          <label>Название задачи</label>
          <v-layout wrap>
            <v-flex xs12 sm6 md8 pt-0>
              <p-input 
                v-model="inputs.taskTitle"
                label="Любое название (для себя)" 
              ></p-input>
            </v-flex>

            <v-flex xs12 sm6 md4 pt-0>
              <p-btn
                dark
                @click="getUsers"
                :loading="!answer"
              >
                <v-icon style="margin-right: 5px; color: white">mdi-play</v-icon>
                <label>Начать поиск</label>
              </p-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-flex>

      <v-flex xs12 md4 pt-0>
        <v-flex style="background:white;font-size:13px">
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
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<style scoped>
.border {
  border: 1px solid #d7d7d7;
}
</style>


<script>
export default {
  data() {
    return {
      textarea: {
        value: ""
      },

      radiogroup: {
        items:[
          {title: 'Интересам', id:0 },
          {title: 'Должности', id:1 },
          {title: 'Месту работы', id:2 },
          {title: 'Религии', id:3 },
          {title: 'Имени', id:4 },
          {title: 'Фамилии', id:5 },
          {title: 'Имени + Фамилии', id:6 },
          {title: 'Статусу', id:7 },
          {title: 'Имени ребенка', id:8 }
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
        taskTitle:null
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
      answer:'1'
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
