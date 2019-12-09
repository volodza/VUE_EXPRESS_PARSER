<template>
  <div>
    <h1>Поиск сообществ ВКонтакте</h1>
    <div class="group">
      <div class="content flex">
        <!-- Textarea -->
        <div class="flex">
          <label>Ключевые слова</label>
          <p-textarea label="По одному слову в строке" v-model="textarea.key_word"></p-textarea>
        </div>

        <!-- Checkboxes -->
        <div class="flex">
          <p-checkbox :label="`Точное вхождение поисковой фразы`" v-model="checkboxes.exact_phrase"></p-checkbox>
          <p-checkbox :label="`Только официальные сообщества`" v-model="checkboxes.only_official"></p-checkbox>
          <p-checkbox v-model="checkboxes.with_goods" :label="`Только сообщество с товарами`"></p-checkbox>
        </div>

        <div class="layout sel">
          <div class="flex">
            <label>Типы сообществ</label>
            <p-select
              v-model="selects.type.selected"
              :items="selects.type.items"
              label="Выберите тип сообществ"
            ></p-select>
          </div>

          <div class="flex">
            <label>Сортировка</label>
            <p-select
              v-model="selects.sort.selected"
              :items="selects.sort.items"
              label="Выберите тип сортировки"
            ></p-select>
          </div>
        </div>

        <div class="layout input">
          <div class="flex">
            <label>Подписчиков</label>
            <p-input v-model="inputs.members.from" label="От"></p-input>
          </div>

          <div class="flex">
            <p-input v-model="inputs.members.to" label="До"></p-input>
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

        <!-- <v-divider class="my-4"></v-divider> -->

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
          Облачный "Поиск групп" осуществляется по базе Segmento Target,
          способен выдавать до 10 000 результатов (в 10 раз больше чем в API Поиске).
        </p>
        <p>
          В базе хранятся группы с количеством участников от 2 пользователей,
          группы с меньшим количеством участников отсутствуют в выдаче.
        </p>
        <p>
          База обновляется один раз в 3 дня, это означает что в выдаче могут
          содержаться не самые актуальные результаты. Поиск осуществляется с
          учетом морфологии, однако выдача может несколько отличаться от
          выдачи ВКонтакте, так как алгоритмы текстового поиска не совпадают.
        </p>
        <p>
          Инструмент позволяет сохранить контакты групп. Ключевые слова и
          фразы нужно вводить по одному в строке. Если Вам необходима выдача
          точь-в-точь как во ВКонтакте — воспользуйтесь API Поиском групп.
        </p>
        <p>
          Выдачу можно отсортировать по количеству постов в день, в неделю,
          чтобы выделить группы, в которых ведётся активность. API Поиск работает корректно,
          не смотря на то что устаревший ВК не поддерживается.
          Если Вы вводите страну либо город — пабликов в выдаче не будет.
          ER=(Лайки+Репосты+Комментарии)/Дни/Участники*100
        </p>
      </div>
    </div>
  </div>
</template>



<style lang="sass" scoped>
  .group
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
      textarea: { search: null, key_word: "" },
      checkboxes: {
        exact_phrase: false,
        only_official: false,
        with_goods: false
      },
      inputs: {
        members: {
          from: null,
          to: null
        },
        taskTitle: null
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
            {
              title: "По умолчанию(аналогично результатам поиска в ВК)",
              value: 0
            },
            { title: "По скорости роста", value: 1 },
            { title: "По дневной посещаемости", value: 2 },
            { title: "По количеству лайков", value: 3 },
            { title: "По количеству комментариев", value: 4 },
            { title: "По количеству записей в обсуждениях", value: 5 }
          ],
          selected: null
        }
      },
      answer: "тут"
    };
  },
  methods: {
    getGroups() {
      if (!this.textarea.key_word) {
        console.log(54321);
        this.$store.commit("setError", "Введите хотя бы одну ключевую фразу");
        return;
      }
      console.log(222);
      let obj = {
        chosen: false,
        q: this.key_phrases,
        type: this.selects.type.selected || "page",
        city_id: this.selects.city.selected,
        country_id: this.selects.country.selected,
        sort: this.selects.sort.selected || 0,
        members_from: +this.inputs.members.from || 0,
        members_to: +this.inputs.members.to || 99999999,
        exact_phrase: this.checkboxes.exact_phrase,
        verified: this.checkboxes.only_official,
        market: +this.checkboxes.with_goods,
        user_id: this.$store.getters.user.id,
        title: this.inputs.taskTitle || "Поиск > Сообщества"
      };
      this.answer = "";
      this.$http.post("/api/search/groups", obj).then(res => {
        console.log(12345);
        this.$store.commit("setSuccess", res.body);
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
