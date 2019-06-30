<template>
    <v-container fluid grid-list-xl>
        <v-layout flex-child wrap>
            <v-flex xs12 md3 d-flex >
                <v-flex class="white" text-xs-center  >
                    
                    <h3>Бесплатный</h3> <br>
                    <p style="text-align:left;">- 24 бесплатных инструмента; <br>
                    - 1 поток для задач;<br>
                    - Telegram чат с экспертами SMM (Андрей);<br>
                    - Сообщество с кейсами и мануалами (Андрей);<br>
                    - Техническая поддержка (Андрей).</p>
                    <v-btn style="font-size:15px; text-transform:none;width:250px;background:#4A76A8; color:white;">
                        <v-icon left>mdi-vk</v-icon>Связаться с Андреем</v-btn>
                    </v-flex>
                </v-flex>

            <v-flex xs12 md3 d-flex >
                <v-flex class="white" text-xs-center  >
                    <h3>Хуйный</h3> <br>
                    <p style="text-align:left;">- 2 потока для задач;<br>
                    - Больше 150 инструментов парсинга;<br>
                    Не доступны: <br>
                    - "Активности - Вступления"<br>
                    - "Сбор - Недавно вступившие"<br>
                    - Кейсы.</p>
                    <v-divider class="mb-4"></v-divider>
                    <v-radio-group v-model="radiogroup.selected" col>
                        <v-radio label="80р. / 2 дня" value="interests"></v-radio>
                        <v-radio label="140р. / 7 дней" value="position"></v-radio>
                        <v-radio label="300р. / 30 дней" value="workplace"></v-radio>
                        <v-radio label="450р. / 90 дней" value="religion"></v-radio>
                        <v-radio label="900р. / 365 дней" value="name"></v-radio>
                    </v-radio-group>
                    <v-btn style="font-size:15px; text-transform:none;width:250px;">
                        Подключить</v-btn>
                </v-flex>
            </v-flex>

             <v-flex xs12 md3 d-flex >
                <v-flex class="white" text-xs-center  >
                    <h3>Нехуйный</h3> <br>
                    <p style="text-align:left;">- 2 потока для задач;<br>
                    - 1 поток для кейсов;<br>
                    - 500 сообществ для отслеживания <br>в "Активности - Вступления";<br>
                    - Доступны все инструменты парсинга.</p>
                    <v-divider class="mb-4"></v-divider>
                    <v-radio-group v-model="radiogroup.select" col style="margin-top:44px;">
                        <v-radio label="120р. / 2 дня" value="interests"></v-radio>
                        <v-radio label="210р. / 7 дней" value="position"></v-radio>
                        <v-radio label="450р. / 30 дней" value="workplace"></v-radio>
                        <v-radio label="675р. / 90 дней" value="religion"></v-radio>
                        <v-radio label="1460р. / 365 дней" value="name"></v-radio>
                    </v-radio-group>
                    <v-btn style="font-size:15px; text-transform:none;width:250px;">
                        Подключить</v-btn>
                </v-flex>
            </v-flex>

            <v-flex xs12 md3 d-flex >
                <v-flex class="white" text-xs-center >                   
                    <p>Бонусный баланс - 0 Б; <br>
                     <v-checkbox   style="margin-left:70px" 
                        
                        height='6px'
                        :label="`Купить за бонусы`"
                        v-model="checkboxes.Bonus"
                    ></v-checkbox>
                   </p>
                   <h3>Действующие лицензии</h3><br>
                    <p>Тариф "Бесплатный"</p>
                    <p style="border: 1px solid black;">Потоков для задач: 1<br>
                    Потоков для кейсов: 0<br>
                    Сообществ на отслеживании: 0<br>
                    Скорость парсинга: x1</p>

                </v-flex>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

export default {
  data () {
    return {

      textarea:{
        value:''
      },

      radiogroup:{
        selected:null,
        select:null
      },
      checkboxes:{
        Bonus:false,
     }
    }
  }
}
      </script>