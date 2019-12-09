<template>
  <v-container fluid grid-list-xl>
    <v-layout flex-child wrap>
      <v-flex xs12 md6 d-flex>
        <v-flex class="white" text-xs-center>
          <v-flex xs12>

            <div style="text-align:left; color:gray;" class="font-weight-medium mb-1">
                <strong>Пользователи или сообщества Вконтакте</strong>
            </div>
            <v-textarea
              solo
              name="input-7-4"
              label="По одной ссылке или id пользователя/сообщества в строке."             
            ></v-textarea>
            
            <v-divider class="mb-4"></v-divider>

            <div style="text-align:left; color:gray;" class="font-weight-medium mb-1">
                <strong>Ключевые фразы</strong>
            </div>
            <v-textarea
              rows="3"
              solo
              name="input-7-4"
              label="По одной ключевой фразе в строке"
            ></v-textarea>

            <v-checkbox              
              class="my-0 py-0"
              label= "Точное вхождение ключевых фраз">
            </v-checkbox>
           <v-checkbox 
              class="my-0 py-0"
              label= "Оставить только посты с пометкой <Реклама>">
            </v-checkbox>

          <div style="text-align:left; color:gray;" class="font-weight-medium mb-1">
                <strong>Какие типы постов на стене необходимо получить </strong>
            </div>
           <v-select
            solo
            item-value="value"
            item-text="title"
            label="типы сообществ"
           :items="selects.typePosts.items"
            v-model="selects.typePosts.selected"
            ></v-select>

            <div style="text-align:left; color:gray;" class="font-weight-medium mb-1">
                <strong>Период, за который собирать посты </strong>
            </div>
            <!-- Календарь от -->
            <v-layout class="mt-0">
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
                    label="Конец периода"
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
            

             <v-divider class="mb-4"></v-divider>
            <div style="text-align:left; color:gray;" class="font-weight-medium mb-1">
                <strong>Название задачи </strong>
            </div>
            <v-text-field solo label="Название задачи"></v-text-field>

            <v-btn color="primary" block @click="getBirthdays">
            <v-icon>mdi-play</v-icon>
          </v-btn>

            
          </v-flex>         
        </v-flex>
      </v-flex>

      <v-flex xs12 md6 >
        <v-flex class="white">
          <tasks></tasks>
          <div class="title text-xs-center my-2">Как работает этот скрипт?</div>
          <div>
           битв : {{counter}} <br/>
           всего урона : {{fullDmg}}<br/>
           средний урон за битву : {{fullDmg/counter}}<br/>
           средний 1 скилл : {{oneSFD}} <br/>
           средний 2 скилл : {{twoSFD}} <br/>
           средний 3 скилл : {{freSFD}}
          </div>
          <div>
           <p-btn @click="go()" dark>go</p-btn>
          </div>

          <v-divider></v-divider>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
      data () {
    return {search: null,
    counter:0,
    oneS:[],
    twoS:[],
    freS:[],
    dmg:[],
    // twop:0,

      textarea:{
         users_group:'',
         key_phrases:''
      },

      checkboxes:{
      exact_phrase:false,
      advertising:false
      },

      selects: {
        typePosts: {
          items: [
            { title: "Все посты на стене", id: 0 },
            { title: "Посты владельца стены", id: 1 },
            { title: "Посты не от владельца стены", id: 2 }
          ],
          selected: null
        }},

        calendar: {
        from: new Date().toISOString().substr(0, 10),
        to: new Date().toISOString().substr(0, 10)
      }
    }
   },
   computed:{
     fullDmg(){
       return this.dmg.length>1?this.dmg.reduce((a,b)=>a+b):this.dmg
     },
     oneSFD(){
        return this.oneS.length>1?this.oneS.reduce((a,b)=>a+b)/this.counter:this.oneS
     },
     twoSFD(){
        return this.twoS.length>1?this.twoS.reduce((a,b)=>a+b)/this.counter:this.twoS
     },
     freSFD(){
       return this.freS.length>1?this.freS.reduce((a,b)=>a+b)/this.counter:this.freS
     }
   },
   methods:{
     go(){
       let onS=0
       let twS=0
       let frS=0
 
       for(let i=0;i<8;i++){
         let random = Math.floor(Math.random()*100)
       if(random<=30){onS+=(180+50*1.5);}}

       for(let i=0;i<8;i++){
         let random = Math.floor(Math.random()*100)
       if(random<=40){twS+=(151+50*0.5)*2; }
       }

      //   for(let i=0;i<8;i++){
      //    let random = Math.floor(Math.random()*100)
      //  if(random<=40&&i!=7){frS+=(269+50*2.5)i++;}
      //  }


        this.dmg.push(onS+twS+frS)
        this.oneS.push(onS)
        this.twoS.push(twS)
        this.freS.push(frS)
        this.counter++
      //  this.one>this.two?this.onep++:this.twop++
     }
   }
};
</script>