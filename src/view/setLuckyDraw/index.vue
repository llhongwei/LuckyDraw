<template>
  <div>
    <header>配置奖品</header>
    <el-card>
      <div v-for="item in list" :key="item.id">
        <LuckyItem :weight="item.weight" id="item.id" lname="item.name" img="item.img"></LuckyItem>
      </div>
    </el-card>
  </div>
</template>

<script>
import InspireCloud from '@byteinspire/js-sdk'
import LuckyItem from './LuckyItem.vue'
import {getDrawList} from '@/network/api'

const serviceId = 'qc6nzx';   // Service ID
const blob = undefined;
const inspireCloud = new InspireCloud({serviceId});
const formData = new FormData();
formData.append('picture', blob)
inspireCloud.run('uploadFile', formData, {
  headers: {
    'content-type': 'multipart/form-data',
  },
});

export default {
  beforeCreate() {
    this.getDrawList()
  },
  data() {
    return {
      list: []
    }
  },
  components: {
    LuckyItem
  },
  methods: {
    async getDrawList() {
      const list = getDrawList().then(function (response) {
        console.log(response);
      })
      console.log('async')
      console.log(list)
      return list.data;
    }
  }
}
</script>

<style scoped>
header {
  margin: 30px auto 0;
  text-align: center;
}

.el-card {
  width: 60%;
  margin: 5px auto;
}
</style>