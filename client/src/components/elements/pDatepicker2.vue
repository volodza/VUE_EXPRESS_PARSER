<template>
  <div>
    <!-- {{selectDate}} -->
    <div @click="isActive=!isActive">
    <p-input v-model="pDate" label=''></p-input>
      </div>

    <div class="calendar" v-show="isActive">
      <div v-if="!monthSelected">
      <div class="header">
        <v-icon class="btn_arrow" @click="prevMonth()">
          mdi-chevron-left
        </v-icon>
        <span class="month" @click="monthSelected=!monthSelected">{{month}} {{currentPeriod.year}}</span>
        <v-icon class="btn_arrow" @click="nextMonth()">
          mdi-chevron-right
        </v-icon>
        <!-- <span class="btn next"></span> -->
      </div>

      <div style="color:black" >
        <table class="table">
          <thead>
            <tr>
              <th class="weekday" v-for="weekday in weekdays" :key="weekday">
                <span class="vdpHeadCellContent">{{weekday}}</span>
              </th>
            </tr>
          </thead>
          
          <tbody
              :key="currentPeriod.year + '-' + currentPeriod.month"
          > 
            <tr   v-for="(week, weekIndex) in currentPeriodDates" :key="weekIndex">
              <td
                class="number"
                v-for="item in week"
                :data-id="item.dateKey"
                :key="item.dateKey"
                
                @click="selectDateItem(item)"
              >
                <div 
                :class="{
                'today':item.date.toLocaleString().substr(0, 10)===Today,
                'notBelong':item.date.getMonth()!=currentPeriod.month, 
                'selectDate':item.date.toLocaleString().substr(0, 10)==selectDate}">
                  {{ item.date.getDate() }} 
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>

      <div v-else >
        <div class="header">
        <v-icon class="btn_arrow" @click="currentPeriod.year--">
          mdi-chevron-left
        </v-icon>
        <span class="month" @click="monthSelected=!monthSelected">{{currentPeriod.year}}</span>
        <v-icon class="btn_arrow" @click="currentPeriod.year++">
          mdi-chevron-right
        </v-icon>
      </div>
        <ul class="monthSelected">
          <li v-for="(item, i) in months"
          :key="i"
          :class="{'monthSelect':item==month}"
          @click="monthSelect(item, i)"
          >
            {{item.split(' ').map(x => x.substr(0, 3)).join()}}
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>
<style lang="sass" scoped>
  .calendar
    // height: 260px
    width: 220px
    border: 1px solid #d7d7d7
    border-radius: 2px
    color: white
    z-index: 234
    background: white
    position: absolute

    .header
      // position: relative
      height: 35px
      display: flex
      align-items: center
      justify-content: space-around
      background: #303030
      .btn_arrow
        cursor: pointer
        color: #b8b8b8
        &:hover
          color: white
      .month
        font-size: 15px
        margin: 0 30px 
        color: #b8b8b8
        cursor: pointer
        &:hover
          color: white  

  .weekday
    // padding: 2px 10px 10px
    mergin: 0 auto

  .table
    width: 100%

 
  .number
    border-radius: 3px
    width: 2em
    cursor: pointer
    div
      height: 25px
      display: flex
      align-items: center
      justify-content: center
    &:hover
      background: #eeeeee
    .today
      background: #f1c893 
      border-radius: 3px
    .selectDate
      background: #303030 !important
      border-radius: 3px
      color: white
    .notBelong
      color: #c4c4c4 

  .monthSelected
    background: white
    color: black
    display: flex
    flex-wrap: wrap
    justify-content: center
    // align-items: center
    padding: 0
    .monthSelect
      background: #303030 !important
      border-radius: 3px
      color: white
    li
      padding: 10px 0px
      text-align: center
      flex-basis: 25%
      cursor: pointer
      border-radius: 3px
      &:hover
        background: #eeeeee
</style>

<script>
export default {
  props:{
    label:{
      type:String,
      default:'Выберете дату'
    },
    pDate:{
      type:String
    }
  },
  data(){
    return {
      weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      months:['Январь', 'Февраль', 'Март', 'Апрель','Май', 'Июнь', 
      'Июль', 'Август','Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      currentPeriod: {
        month:new Date().getMonth(),
        year:new Date().getFullYear()
      },
      isActive: false,
      Today: new Date().toLocaleString().substr(0, 10),
      selectDate: null,
      monthSelected: false
    }
  },
  computed:{
    month(){
      return this.months[this.currentPeriod.month]
    },

    currentPeriodDates() {
      const {year, month} = this.currentPeriod;
      const days = [];
      const date = new Date(year, month, 1);
      const today = new Date();
      const offset = this.startWeekOnSunday ? 1 : 0;
      // append prev month dates
      const startDay = date.getDay() || 7;
      if (startDay > (1 - offset)) {
          for (let i = startDay - (2 - offset); i >= 0; i--) {
              const prevDate = new Date(date);
              prevDate.setDate(-i);
              days.push({outOfRange: true, date: prevDate});
          }
      }
      while (date.getMonth() === month) {
          days.push({date: new Date(date)});
          date.setDate(date.getDate() + 1);
      }
      // append next month dates
      const daysLeft = 7 - days.length % 7;
      for (let i = 1; i <= daysLeft; i++) {
          const nextDate = new Date(date);
          nextDate.setDate(i);
          days.push({outOfRange: true, date: nextDate});
      }
      // define day states
      days.forEach(day => {
          // day.disabled = this.isDateDisabled(day.date);
          day.today = areSameDates(day.date, today);
          day.dateKey = [
              day.date.getFullYear(), day.date.getMonth() + 1, day.date.getDate()
          ].join('-');
          day.selected = this.valueDate ? areSameDates(day.date, this.valueDate) : false;
      });
      return chunkArray(days, 7);
    },
  },
  
  methods:{
    // prevMonth(){
    //   return this.month--
    // },
    selectDateItem(item) {
      // if (!item.disabled) {
        this.selectDate = new Date(item.date).toLocaleString().substr(0, 10)
          // const newDate = new Date(item.date);
          // if (this.currentTime) {
          //     newDate.setHours(this.currentTime.hours);
          //     newDate.setMinutes(this.currentTime.minutes);
          //     newDate.setSeconds(this.currentTime.seconds);
          // }
          this.$emit('selectDate', this.selectDate);
          this.isActive=false
          // if (this.hasInputElement && !this.pickTime) {
          //     this.close();
          // }
      // }
  },   
  prevMonth(){
    if(this.currentPeriod.month===0){
      this.currentPeriod.year--
      this.currentPeriod.month=11
    }
    else{
    this.currentPeriod.month--}

  },
  nextMonth(){
    if(this.currentPeriod.month===11){
      this.currentPeriod.year++
      this.currentPeriod.month=0
    }
    else{
    this.currentPeriod.month++}
  },
  monthSelect(item, i){
    this.currentPeriod.month=i
    this.monthSelected=false
  } 
  }
}
function paddNum(num, padsize) {
    return typeof num !== 'undefined'
        ? num.toString().length > padsize
            ? num
            : new Array(padsize - num.toString().length + 1).join('0') + num
        : undefined
    ;
}
function chunkArray(inputArray, chunkSize) {
    const results = [];
    while (inputArray.length) {
        results.push(inputArray.splice(0, chunkSize));
    }
    return results;
}
function areSameDates(date1, date2) {
    return (date1.getDate() === date2.getDate()) &&
        (date1.getMonth() === date2.getMonth()) &&
        (date1.getFullYear() === date2.getFullYear())
    ;
}
</script>