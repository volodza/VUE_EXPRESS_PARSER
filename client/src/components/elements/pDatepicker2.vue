<template>
  <div>
    <div @click="isActive=!isActive">
    <p-input label=''></p-input>
      </div>

    <div class="calendar" v-show="isActive">
      <div class="header">
        <v-icon class="btn_arrow" size='24'>
          mdi-chevron-left
        </v-icon>
        <span class="month" >Октябрь</span>
        <v-icon class="btn_arrow" size='24'>
          mdi-chevron-right
        </v-icon>
        <!-- <span class="btn next"></span> -->
      </div>

      <div style="color:black">
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
            <tr  class="vdpRow" v-for="(week, weekIndex) in currentPeriodDates" v-bind:key="weekIndex">
              <td
                :class="[{'notBelong':dfg},'number']"
                v-for="item in week"
                :data-id="item.dateKey"
                :key="item.dateKey"
                @click="selectDateItem(item)"
              >
                <div style="" class="vdpCellContent">
                  {{ item.date.getDate() }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
        color: white
      .month
        font-size: 15px
        margin: 0 30px   

  .weekday
    // padding: 2px 10px 10px
    mergin: 0 auto

  .table
    width: 100%

  .number
    height: 35px
    font-size: 13px
    border-radius: 2px
    // margin: 0 auto
    width: 2em
    height: 2em
    // line-height: 2em
    text-align: center
    cursor: pointer
    // -webkit-transition: background 0.1s, color 0.1s
    // transition: background 0.1s, color 0.1s
    &:hover
      background: #eeeeee

  .notBelong
    color: #c4c4c4 
</style>

<script>
export default {
  data(){
    return {
      weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      months:['Январь', 'Февраль', 'Март', 'Апрель','Май', 'Июнь', 
      'Июль', 'Август','Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      currentPeriod: {
        day:new Date().getDate(),
        month:new Date().getMonth(),
        year:new Date().getFullYear()
      },
      isActive: false,
    }
  },
  computed:{
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
    selectDateItem(item) {
      if (!item.disabled) {
          const newDate = new Date(item.date);
          if (this.currentTime) {
              newDate.setHours(this.currentTime.hours);
              newDate.setMinutes(this.currentTime.minutes);
              newDate.setSeconds(this.currentTime.seconds);
          }
          this.$emit('input', this.formatDateToString(newDate, this.format));
          if (this.hasInputElement && !this.pickTime) {
              this.close();
          }
      }
  },    
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