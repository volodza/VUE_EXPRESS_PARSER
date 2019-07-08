<template>
  <v-container grid-list-xl fluid>
    <div class="mb-3">
      <h1 class="display-1">Поиск сообществ ВКонтакте</h1>
    </div>

    <v-layout flex-child wrap>
      <v-flex xs12 md8 class="border">
        <v-flex class="white">
          <!-- Textarea -->
          <v-layout row wrap>
            <v-flex xs12>
              <label>Ключевые слова</label>
              <v-textarea
                rows="4"
                solo
                class="border"
                flat
                name="input-7-1"
                label="По одному слову в строке"
                v-model="textarea.key_word"
                hide-details
              ></v-textarea>
            </v-flex>

            <!-- <v-flex xs12 xl6>
          <label>Минус ключевые слова</label>
          <v-textarea
            rows='4'
            solo 
            class="border"
            flat
            name="input-7-1"
            label="По минус одному слову в строке"
            v-model="textarea.minus_key_word"
            hide-details
          ></v-textarea>
            </v-flex>-->
          </v-layout>

          <!-- Checkbox -->
          <v-layout row wrap mx-0 mt-3>
            <v-checkbox
              class="my-0 py-0"
              :label="`Точное вхождение поисковой фразы`"
              v-model="checkboxes.exact_phrase"
            ></v-checkbox>
            <v-checkbox
              class="my-0 py-0"
              :label="`Только официальные сообщества`"
              v-model="checkboxes.only_official"
            ></v-checkbox>
            <v-checkbox
              class="my-0 py-0"
              v-model="checkboxes.with_goods"
              :label="`Только сообщество с товарами`"
            ></v-checkbox>
          </v-layout>

          <v-divider class="mb-3"></v-divider>

          <v-layout wrap>
            <v-flex xs12 md6>
              <label>Типы сообществ</label>
              <v-select
                hide-details
                solo
                class="border"
                flat
                v-model="selects.type.selected"
                label="Выберите тип сообщества"
                item-text="title"
                item-value="value"
                :items="selects.type.items"
              ></v-select>
            </v-flex>

            <v-flex xs12 md6>
              <label>Сортировка</label>
              <v-select
                v-model="selects.sort.selected"
                hide-details
                flat
                solo
                class="border"
                item-text="title"
                item-value="value"
                :items="selects.sort.items"
                label="Выберите тип сортировки"
              ></v-select>
            </v-flex>
          </v-layout>

          <label>Подписчиков</label>
          <v-layout wrap>
            <v-flex xs6 md3 pt-0>
              <v-text-field
                class="border"
                flat
                solo
                label="От"
                v-model="inputs.members.from"
                hide-details
              ></v-text-field>
            </v-flex>

            <v-flex xs6 md3 pt-0>
              <v-text-field
                class="border"
                flat
                solo
                v-model="inputs.members.to"
                label="До"
                hide-details
              ></v-text-field>
            </v-flex>

            <v-flex xs6 md3 pt-0>
              <v-autocomplete
                class="border"
                flat
                v-model="selects.country.selected"
                :loading="selects.country.loading"
                :items="selects.country.items"
                :search-input.sync="selects.country.search"
                hide-no-data
                hide-details
                item-text="title"
                item-value="id"
                label="Страна"
                solo
              ></v-autocomplete>
            </v-flex>

            <v-flex xs6 md3 pt-0>
              <v-autocomplete
                class="border"
                flat
                :disabled="!selects.country.selected"
                v-model="selects.city.selected"
                :loading="selects.city.loading"
                :items="selects.city.items"
                :search-input.sync="selects.city.search"
                hide-no-data
                hide-details
                item-text="title"
                item-value="id"
                label="Город"
                solo
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
              </v-autocomplete>
            </v-flex>
          </v-layout>

          <v-divider class="my-4"></v-divider>

          <label>Название задачи</label>
          <v-layout wrap>
            <v-flex xs12 sm6 md8 pt-0>
              <v-text-field
                class="border"
                v-model="inputs.taskName"
                flat
                solo
                label="Любое название (для себя)"
                hide-details
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 md4 pt-0>
              <v-btn
                class="mt-0"
                style="height:50px;             
            font-size:20px; 
            text-transform:none; 
            background: linear-gradient(160deg,#4f555e,#4f555e,#5c6e68,#7f6b67); 
            color:white"
                block
                flat
                hide-details
                @click="getGroups"
                :loading="!answer"
              >
                <v-icon style="margin-right: 5px">mdi-play</v-icon>
                <label>Начать поиск</label>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-flex>

      <v-flex xs12 md4 pt-0>
        <v-flex style="background:#e7fbed">
          <h1>Описание</h1>
          <p>
            Облачный "Поиск групп" осуществляется по базе Segmento Target,
            способен выдавать до 10 000 результатов (в 10 раз больше чем в API Поиске).
            В базе хранятся группы с количеством участников от 2 пользователей,
            группы с меньшим количеством участников отсутствуют в выдаче.
            База обновляется один раз в 3 дня, это означает что в выдаче могут
            содержаться не самые актуальные результаты. Поиск осуществляется с
            учетом морфологии, однако выдача может несколько отличаться от
            выдачи ВКонтакте, так как алгоритмы текстового поиска не совпадают.
            Инструмент позволяет сохранить контакты групп. Ключевые слова и
            фразы нужно вводить по одному в строке. Если Вам необходима выдача
            точь-в-точь как во ВКонтакте — воспользуйтесь API Поиском групп.
            Выдачу можно отсортировать по количеству постов в день, в неделю,
            чтобы выделить группы, в которых ведётся активность. API Поиск работает корректно,
            не смотря на то что устаревший ВК не поддерживается.
            Если Вы вводите страну либо город — пабликов в выдаче не будет.
            ER=(Лайки+Репосты+Комментарии)/Дни/Участники*100
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
      textarea: { search: null, key_word: "", minus_key_word: "" },
      checkboxes: {
        exact_phrase: true,
        only_official: false,
        with_goods: false
      },
      inputs: {
        members: {
          from: 1,
          to: 1000
        },
        taskName: null
      },
      selects: {
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
        },
        type: {
          items: [
            { title: "Группа", value: "group" },
            { title: "Паблик", value: "page" },
            { title: "Мероприятие", value: "event" },
            { title: "Предстоящее мероприятие", value: "future" }
          ],
          selected: null
        },
        sort: {
          items: [
            {title: "По умолчанию(аналогично результатам поиска в ВК)", value: 0},
            { title: "По скорости роста", value: 1 },
            { title: "По дневной посещаемости", value: 2 },
            { title: "По количеству лайков", value: 3 },
            { title: "По количеству комментариев", value: 4 },
            { title: "По количеству записей в обсуждениях", value: 5 }
          ],
          selected: null
        }
      },
      answer: "тут",
      list: {
        tasks: {
          items: [
            {
              icon: "folder",
              iconClass: "grey lighten-1 white--text",
              title: "Поиск > Сообщества",
              subtitle: "03.02.2019"
            },
            {
              icon: "folder",
              iconClass: "grey lighten-1 white--text",
              title: "Поиск > Родители",
              subtitle: "Jan 17, 2014"
            },
            {
              icon: "folder",
              iconClass: "grey lighten-1 white--text",
              title: "Сбор > Друзья",
              subtitle: "Jan 28, 2014"
            }
          ]
        }
      }
    };
  },
  methods: {
    getGroups() {
      if (!this.textarea.key_word) {
        this.$store.commit("setError", "Введите хотя бы одну ключевую фразу");
        return;
      }
      let obj = {
        q: this.key_phrases,
        type: this.selects.type.selected,
        city_id: this.selects.city.selected,
        country_id: this.selects.country.selected,
        sort: this.selects.sort.selected,
        members_from: +this.inputs.members.from,
        members_to: +this.inputs.members.to,
        exact_phrase: this.checkboxes.exact_phrase,
        verified: this.checkboxes.only_official,
        market: +this.checkboxes.with_goods,
        user_id: this.$store.getters.user.id,
        title: this.inputs.taskName || "Поиск > Сообщества"
      };
      this.answer = "";
      this.$http
        .post("http://Localhost:3000/api/search/groups", obj)
        .then(res => {
          this.$store.commit("setSuccess", res.body);
          this.answer = res.body;
        });
    },
    getCities(v) {
      if (!this.selects.country.selected) return;
      this.selects.city.loading = true;
      this.$http
        .get("Localhost:3000//api/geolocation/cities", {
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
        .get("Localhost:3000//api/geolocation/countries", {
          params: {
            q: v
          }
        })
        .then(res => {
          this.selects.country.items = res.body.items;
          this.selects.country.loading = false;
        });
    }
  },
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
      return this.textarea.key_word.split`\n`;
    }
  }
};
</script>
