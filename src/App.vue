<template>
  <div id="app">
    <LuckyDraw />
  </div>
</template>

<script>
import LuckyDraw from '@/view/luckyDraw/index.vue';

export default {
  name: 'App',
  components: {
    LuckyDraw
  },
}
</script>

<style>
body {
  width: 100%;
  height: 100%;
}
</style>
