<template>
  <div  class="btn">
    <span>
      <slot></slot>
    </span>
  </div>

</template>

<style lang="sass" scoped>
  .btn
    min-height: 35px
    cursor: pointer
    border: 1px solid #d7d7d7
    border-radius: 2px
    background: #303030
    display: flex
    justify-content: center
    span
      display: flex
      align-items: center
      color: white
    &:hover
      background: #464646
    -moz-user-select: none
    -khtml-user-select: none
    -webkit-user-select: none
    user-select: none
</style>


