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
export default {
  data() {
    return {
      list: [
        {
          id: 'dajshdjad',
          name: '66矿石'
        },
        {
          id: 'hgfdjgdsz',
          name: '随机限量徽章'
        },
        {
          id: 'fsdt435tdhd',
          name: '新款T恤'
        },
        {
          id: 'f7685gefs',
          name: 'Bug'
        },
        {
          id: 'df25yr634',
          name: '抽奖'
        },
        {
          id: '32tfthdfs3',
          name: '乐高海洋巨轮'
        },
        {
          id: 'akl78414jf',
          name: '限量桌垫'
        },
        {
          id: 're5ytfyh76f',
          name: 'Yoyo抱枕'
        },
        {
          id: 'gd6363rdyhh',
          name: '未知'
        }
      ],
      prizeList: [],
      oreNums: 200
    }
  },
  components: {
    DrawDisc,
    DrawPrize
  },
  methods: {
    addPrise(item) {
      this.prizeList.push(item)
      if (item.name === '66矿石') {
        this.oreNums += 66
      }
    },
    subOreNums() {
      this.oreNums -= 200
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

  background-color: rgba(26, 83, 238);
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