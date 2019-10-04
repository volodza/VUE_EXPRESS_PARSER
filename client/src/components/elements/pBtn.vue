<template>
  <div  
  :class="dark ? 'btn dark' : 'btn light'"
  >
    <span>
      <slot></slot>
    </span>
  </div>

</template>

<style lang="sass" scoped>
  .dark
    background: #303030
    color: white
    &:hover
      background: #464646

  .light
    border: 1px solid #d7d7d7
    &:hover
      border: 1px solid #b0b0b0
      transition: 0.3s


  .btn
    height: 35px
    cursor: pointer
    border-radius: 2px
    display: flex
    justify-content: center
    span
      display: flex
      align-items: center
      
    
    -moz-user-select: none
    -khtml-user-select: none
    -webkit-user-select: none
    user-select: none
</style>

<script>
  export default{
    props:{
      dark:{
        type:Boolean
        // default:'light'
      }
    }
  }
</script>
