<template>
  <div class="lucky-draw">
    <div class="lucky-draw__title">
      当前矿石数：{{ oreNums }}
    </div>
    <div class="lucky-draw__main">
      <DrawDisc
        :list="list"
        :ore-nums="oreNums"
        @drawResult="addPrise"
        @drawSuccess="subOreNums"
      />
      <DrawPrize :prizeList="prizeList" />
    </div>
  </div>
</template>

<script>
import DrawDisc from './DrawDisc.vue';
import DrawPrize from './DrawPrize.vue';
import { getDrawList, getOreNums, updataOreNums } from '@/network/api.js';
export default {
  data() {
    return {
      list: [
        // {
        //   id: 'dajshdjad',
        //   name: '66矿石',
        //   url: require('@/assets/kuangshi.png')
        // },
        // {
        //   id: 'hgfdjgdsz',
        //   name: '随机限量徽章',
        //   url: require('@/assets/huizhang.png')
        // },
        // {
        //   id: 'fsdt435tdhd',
        //   name: '新款T恤',
        //   url: require('@/assets/txue.png')
        // },
        // {
        //   id: 'f7685gefs',
        //   name: 'Bug',
        //   url: require('@/assets/bug.png')
        // },
        // {
        //   id: 'df25yr634',
        //   name: '抽奖'
        // },
        // {
        //   id: '32tfthdfs3',
        //   name: '乐高海洋巨轮',
        //   url: require('@/assets/legao.png')
        // },
        // {
        //   id: 'akl78414jf',
        //   name: '限量桌垫',
        //   url: require('@/assets/zuodian.png')
        // },
        // {
        //   id: 're5ytfyh76f',
        //   name: 'Yoyo抱枕',
        //   url: require('@/assets/baozhen.png')
        // },
        // {
        //   id: 'gd6363rdyhh',
        //   name: '游戏机',
        //   url: require('@/assets/youxi.png')
        // }
      ],
      prizeList: [],
      oreNums: 0
    }
  },
  components: {
    DrawDisc,
    DrawPrize
  },
  methods: {
    //获取奖品列表
    async getDrawList() {
      const res = await getDrawList()
      if (res.status === 200) {
        this.list = res.data

        this.list.splice(4, 0, {
          id: 'df25yr634',
          name: '抽奖'
        })
      } else {
        this.$message.error('请求错误')
      }
      // console.log(this.list)
    },
    //获取当前用户的矿石数
    async getOreNums(data) {
      const res = await getOreNums(data)
      // console.log(res)
      if (res.data.code === 200) {
        this.oreNums = res.data.oreNums
      }
    },
    //修改矿石数
    async updataOreNums(data) {
      const res = await updataOreNums(data)
      if (res.data.code === 200) {
        this.oreNums = res.data.oreNums
      }
    },
    addPrise(item) {
      this.prizeList.push(item)
      if (item.name === '88矿石') {
        this.updataOreNums({ userName: this.$bus.$data.userName, methods: '+', num: 88 })  //+号代表增加，-号代表减少
      }
    },
    subOreNums() {
      this.updataOreNums({ userName: this.$bus.$data.userName, methods: '-', num: 200 })
    }
  },
  created() {
    this.getDrawList()

    if (this.$bus.$data.userName) {  //判断用户有没有登录，登陆了就获取矿石数
      this.getOreNums({ userName: this.$bus.$data.userName })
    }
  }
}
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