<template>
  <div class="lucky-item-container">
    <div class="lucky-item-name">{{ lname }}</div>
    <div class="lucky-item-img"><img :src="img" alt=""></div>
    <div class="lucky-item-weight">{{ weight }}</div>
  </div>
</template>

<script>
export default {
  props: {
    lname: {
      type: String,
      default: 'test'
    },
    img: {
      type: String,
      default: 'https://sf6-ttcdn-tos.pstatp.com/img/user-avatar/c2f7933898a934f712daced90cd31c2a~300x300.image'
    },
    weight: {
      type: Number,
      default: 0.3
    },
    id: {
      type: Number,
      default: 0,
    }
  }
}
</script>

<style scoped>
.lucky-item-container {
  display: flex;
}
.lucky-item-img {
  flex:
}
</style>