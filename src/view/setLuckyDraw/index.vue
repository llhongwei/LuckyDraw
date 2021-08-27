<template>
  <el-card>
    <LuckyItem lname="2322313213" weight="23" img="https://cn.bing.com/rp/eF3rIdIG4fsLyPy7mzgRnjCDKIA.png"/>
  </el-card>
</template>

<script>
import InspireCloud from '@byteinspire/js-sdk'
import LuckyItem from './LuckyItem.vue'
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
  mounted() {

  },
  components: {
    LuckyItem
  }
}
</script>

<style scoped>
.el-card {
  width: 60%;
  margin: 30px auto;
}
</style>