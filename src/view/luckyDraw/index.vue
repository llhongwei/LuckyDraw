<template>
  <div class="lucky-draw">
    <div class="lucky-draw__title">
      当前矿石数：{{ oreNums }}
    </div>
    <div class="lucky-draw__main">
      <DrawDisc :cost-ore="Number(costOre)"
                :list="list"
                :ore-nums="oreNums"
                @drawResult="addPrise"
                @drawSuccess="subOreNums"/>
      <DrawPrize :prizeList="prizeList"/>
    </div>
  </div>
</template>

<script>
import DrawDisc from './DrawDisc.vue';
import DrawPrize from './DrawPrize.vue';
import {configLotteryCost, getDrawList, getOreNums, updateOreNum} from '@/network/api.js';

export default {
  data() {
    return {
      list: [],
      prizeList: [],
      oreNums: 0,
      costOre: 200,
    };
  },
  components: {
    DrawDisc,
    DrawPrize
  },
  methods: {
    //获取奖品列表
    async getDrawList() {
      const res = await getDrawList({mode: 'enableList'});
      if (res.status === 200) {
        this.list = res.data;
      } else {
        this.$message.error('请求错误');
      }
      // console.log(this.list)
    },
    //获取当前用户的矿石数
    async getOreNums(data) {
      const res = await getOreNums(data);
      // console.log(res)
      if (res.data.code === 200) {
        this.oreNums = res.data.oreNums;
      }
    },
    //修改矿石数
    async updateOreNum(data) {
      const res = await updateOreNum(data);
      if (res.status === 200) {
        this.oreNums = res.data.oreNums;
      }
    },
    addPrise(item) {
      this.prizeList.push(item);
      if (String(item.name).lastIndexOf('矿石') !== -1) {
        const addOre = Number(String(item.name).substring(0, String(item.name).lastIndexOf('矿石')));
        this.updateOreNum({userName: this.$bus.$data.userName, methods: '+', num: addOre});  //+号代表增加，-号代表减少
      }
    },
    subOreNums() {
      this.updateOreNum({userName: this.$bus.$data.userName, methods: '-', num: this.costOre});
    }
  },
  async created() {
    const {status, data} = await configLotteryCost();
    if (status === 200) {
      this.costOre = data.costOre;
    }
    await this.getDrawList();
    if (this.$bus.$data.userName) {  //判断用户有没有登录，登陆了就获取矿石数
      this.getOreNums({userName: this.$bus.$data.userName});
    }
  }
};
</script>

<style scoped>
.lucky-draw {
  width: 1000px;
  padding: 30px;
  margin: 30px auto 0;
  border-radius: 5px;

  background-color: rgb(26, 83, 238);
}

.lucky-draw__title {
  padding: 0 0 20px 50px;

  color: #fff;
  font-size: 16px;
  font-weight: 700;
}

.lucky-draw__main {
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;
}
</style>