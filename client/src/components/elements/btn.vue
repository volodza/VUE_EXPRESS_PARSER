<template>
  <div  class="btn size">
    <slot></slot>
  </div>

</template>

<style lang="sass" scoped>
  .btn
    height: 20px
    width: 50px
    border: 1px solid #EDEEF0
    border-radius: 2px
    display: flex
    justify-content: center
    align-items: center
    color: black
    &:hover
      border: 1px solid #CCCCCC
    -moz-user-select: none
    -khtml-user-select: none
    -webkit-user-select: none
    user-select: none


</style>


