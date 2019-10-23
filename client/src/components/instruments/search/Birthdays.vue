<template>
  <div>
    <h1>Дни рождения</h1>

    <div class="birthdays">
      <div class="content flex">
        <label>Период, за который искать дни рождения (обязательно)</label>
        <div class="layout">
          <!-- Календарь от -->
          <div class="flex">
            <v-menu
              min-width="100px"
              ref="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="calendar.from"
              lazy
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  class="border"
                  hide-details
                  flat
                  v-model="calendar.from"
                  clearable
                  solo
                  height="10"
                  v-on="on"
                  prepend-inner-icon="mdi-calendar"
                ></v-text-field>
              </template>
              <p-datepicker2 v-model="calendar.from" no-title scrollable>
                <v-spacer></v-spacer>
                <v-flex xs6 mx-2 text-xs-center>
                  <v-btn flat color="primary" @click="menu1 = false">Закрыть</v-btn>
                </v-flex>
                <v-flex xs6 mx-2 text-xs-center>
                  <v-btn flat color="primary" @click="$refs.menu1.save(calendar.from)">OK</v-btn>
                </v-flex>
              </p-datepicker2>
            </v-menu>
          </div>
          <!-- Календарь до -->
          <div class="flex">
            <v-menu
              min-width="100px"
              ref="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="calendar.to"
              lazy
              transition="scale-transition"
              offset-y
              full-width
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  class="border"
                  hide-details
                  flat
                  v-model="calendar.to"
                  clearable
                  solo
                  height="10"
                  v-on="on"
                  prepend-inner-icon="mdi-calendar"
                ></v-text-field>
              </template>
              <p-datepicker2 v-model="calendar.to" no-title scrollable>
                <v-spacer></v-spacer>
                <v-flex xs6 mx-2 text-xs-center>
                  <v-btn flat color="primary" @click="menu2 = false">Закрыть</v-btn>
                </v-flex>
                <v-flex xs6 mx-2 text-xs-center>
                  <v-btn flat color="primary" @click="$refs.menu2.save(calendar.to)">OK</v-btn>
                </v-flex>
              </p-datepicker2>
            </v-menu>
          </div>
        </div>

        <!-- <v-divider></v-divider> -->

        <div class="layout input">
          <div class="flex">
            <label>Возраст</label>
            <p-input
              label="От" 
              v-model="inputs.age.from"
              ></p-input>
          </div>

          <div class="flex">
            <p-input 
              label="До" 
              v-model="inputs.age.to"
              ></p-input>
          </div>

          <div class="flex sex">
            <label>Пол</label>
            <p-select
              label="Пол"
              :items="selects.sex.items" 
              v-model="selects.sex.selected"
              ></p-select>
          </div>
        </div>

        <div class="layout">
          <div class="flex">
            <p-autocomplete
              v-model="selects.country.selected"
              :loading="selects.country.loading"
              :items="selects.country.items"
              :search-input.sync="selects.country.search"
              label="Страна"
              class="border"
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
              class="border"
            >
              <template v-slot:no-data>
                <v-list-tile>
                  <v-list-tile-title>
                    Search for your favorite
                    <strong>Cryptocurrency</strong>
                  </v-list-tile-title>
                </v-list-tile>
              </template>
              <!-- <template v-slot:selection="{ item, selected }">
        <div class="subheading font-weight-light">{{item.title}}</div>
              </template>-->
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
  .birthdays
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

  .sex
    flex-basis: 50% !important 
    

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
      search: null,
      calendar: {
        from: new Date().toISOString().substr(0, 10),
        to: new Date().toISOString().substr(0, 10)
      },
      inputs: {
        age: {
          from: null,
          to: null
        }
      },
      selects: {
        sex: {
          items: [
            { title: "Любой", id: 0 },
            { title: "Женский", id: 1 },
            { title: "Мужской", id: 2 }
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
      answer: "Ответ тут",
      value: null
    };
  },
  methods: {
    getBirthdays() {
      if (!this.selects.city.selected) return;
      let obj = {
        bdayFrom: this.calendar.from,
        bdayTo: this.calendar.to,
        ageFrom: +this.inputs.age.from,
        ageTo: +this.inputs.age.to,
        sex: this.selects.sex.selected,
        city: this.selects.city.selected,
        country: this.selects.country.selected,
        user_id: this.$store.getters.user.id,
        title: this.inputs.taskTitle || "Поиск > Дни рождения"
      };
      this.answer = "";
      this.$http.post("/api/search/birthdays", obj).then(res => {
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
  // computed:{
  //   cities () {
  //       this.selects.city.ids = {}
  //       this.selects.city.items.forEach(x=>this.selects.city.ids[x.title] = x.id)
  //     return this.selects.city.items.map(x=>x.title + (x.area ? ' | ' + x.area : '') + (x.region?' | ' + x.region:'') )
  //   },
  //   countries () {
  //      this.selects.country.ids = {}
  //       this.selects.country.items.forEach(x=>this.selects.country.ids[x.title] = x.id)
  //     return this.selects.country.items.map(x=>x.title)
  //   }
  // },
  watch: {
    "selects.city.search": function(val) {
      val && val !== this.selects.city.selected && this.getCities(val);
    },
    "selects.country.search": function(val) {
      val && val !== this.selects.country.selected && this.getCountries(val);
    }
  }
};
</script>
