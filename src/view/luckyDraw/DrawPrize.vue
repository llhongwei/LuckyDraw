<template>
  <div class="draw-prize innerbox">
    <h3>我的奖品</h3>
    <p
      v-for="(item, index) in prizeList"
      :key="index"
      class="draw-prize-item"
    >
      {{index + 1 + '. ' + item.name}}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    prizeList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.draw-prize {
  width: 400px;
  height: 345px;
  background-color: rgba(255, 247, 232, 0.3);
  color: #fff;
  padding: 0 20px;
  overflow: hidden;
  overflow-y: auto;
}

.draw-prize-item {
  height: 24px;
  line-height: 20px;
  margin: 10px;
  border-radius: 3px;
  padding-left: 10px;
}

/*滚动条样式*/
.innerbox::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.innerbox::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.innerbox::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(255, 247, 232, 0.3);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>