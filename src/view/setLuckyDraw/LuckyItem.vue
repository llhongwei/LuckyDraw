<template>
  <div class="lucky-item-container" :id="'luckyItem-'+id">
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
      default: 'https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qc6nzx/c54f6bafe2e5c1c3_1630037785447.png'
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
  border-bottom: #ccc 1px solid;
}

.lucky-item-container > * {
  flex: 1;
  text-align: center;
}

.lucky-item-img img {
  width: 100%;
}
</style>