<template>
  <v-container fluid grid-list-xl>
    <v-layout flex-child wrap>
      <v-flex xs12 md6 d-flex>
        <v-flex class="white" text-xs-center>
          <div class="font-weight-medium mb-0">Период,за который искать дни рождения (обязательно)</div>
          <v-layout class="mt-0">
            <!-- Календарь от -->
            <v-flex xs12 sm6>
              <v-menu
                ref="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="calendar.from"
                lazy
                transition="scale-transition"
                offset-y
                full-width
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="calendar.from"
                    label="Начало периода"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="calendar.from" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu1 = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu1.save(calendar.from)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <!-- Календарь до -->
            <v-flex xs12 sm6>
              <v-menu
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
                    v-model="calendar.to"
                    label="Начало периода"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="calendar.to" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu2 = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu2.save(calendar.to)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>

          <v-divider></v-divider>
          <div class="font-weight-medium mt-3">Возраст</div>
          <v-layout>
            
            <v-flex xs6>
              <v-text-field hide-details single-line placeholder="От" solo v-model="inputs.age.from"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field hide-details single-line solo placeholder="До" v-model="inputs.age.to"></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex xs6 sm6>
              <v-autocomplete
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

            <v-flex xs12 sm6>
              <v-autocomplete
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
              </v-autocomplete>
            </v-flex>

            <v-flex xs12 sm6>
              <v-select
                solo
                label="Пол"
                :items="selects.sex.items"
                v-model="selects.sex.selected"
                item-text="title"
                item-value="id"
              ></v-select>
            </v-flex>
          </v-layout>

          <v-divider class="mb-4"></v-divider>

          <v-text-field solo label="Название задачи"></v-text-field>

          <v-btn color="primary" block @click="getBirthdays">
            <v-icon>mdi-play</v-icon>
          </v-btn>
        </v-flex>
      </v-flex>

      <v-flex xs12 md6 d-flex>
        <v-flex class="white">
          <v-textarea
            name="input-7-1"
            label="Пользователи"
            value="answer"
            hint="По одной ключевой фразе в строку"
            v-model="answer"
          ></v-textarea>

          {{selects.country.selected}}
          {{selects.sex.selected}}
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

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
        country: this.selects.country.selected
      };
      this.answer = "";
      this.$http.post("89.254.230.243:3000/getBirthdays", obj).then(res => {
        this.answer = res.body;
      });
    },
    getCities(v) {
      if (!this.selects.country.selected) return;
      this.selects.city.loading = true;
      this.$http
        .post("http://89.254.230.243:3000/getCities", {
          q: v
        })
        .then(res => {
          this.selects.city.items = res.body.items;
          this.selects.city.loading = false;
        });
    },
    getCountries(v) {
      this.selects.country.loading = true;
      this.$http
        .post("http://89.254.230.243:3000/getCountries", {
          q: v
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
