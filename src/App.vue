<template>
  <div id="app">
    <div
      class="container"
      @click="start"
    >
      <div
        v-for="(item, index) in list"
        :key="item.id"
        class="list-item"
        :class="{'active': index === 4 || index === activeIndex}"
      >
        {{item.name}}
      </div>
    </div>
    <div>
      <h1>奖品列表</h1>
      <p
        v-for="(item, index) in prizeList"
        :key="index"
      >
        {{item}}
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
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
      activeIndex: -1,
      indexArr: [0, 1, 2, 5, 8, 7, 6, 3],
      prizeList: [],
      isAnimation: false
    }
  },
  methods: {
    start(event) {
      if (event.target.innerText === '抽奖' && !this.isAnimation) {
        this.isAnimation = true
        const num = parseInt(Math.random() * 1000000)
        // console.log(num)
        let prize = -1
        if (num <= 2) {
          prize = 8
        } else if (2 < num && num <= 8) {
          prize = 7
        } else if (8 < num && num <= 38) {
          prize = 1
        } else if (38 < num && num <= 68) {
          prize = 2
        } else if (68 < num && num <= 98) {
          prize = 5
        } else if (98 < num && num <= 128) {
          prize = 6
        } else if (128 < num && num <= 600000) {
          prize = 0
        } else if (600000 < num && num <= 1000000) {
          prize = 3
        }
        this.startanimation(prize)
      }
    },
    startanimation(n) {
      let frame = 32 + this.indexArr.indexOf(n)
      const p1 = new Promise(resolve => {
        for (let i = 0; i <= frame; i++) {
          if (i + 3 < frame) {
            setTimeout(() => {
              this.activeIndex = this.indexArr[i % 8]
            }, 50 * i)
          } else {
            setTimeout(() => {
              this.activeIndex = this.indexArr[i % 8]
              if (i === frame) {
                resolve()
              }
            }, i * 50 + (3 + i - frame) ** 2 * 200)
          }
        }
      })
      p1.then(() => {
        setTimeout(() => {
          this.isAnimation = false
          this.activeIndex = -1
          this.prizeList.push(this.list[n].name)
          console.log(this.prizeList)
          alert('恭喜获得' + this.list[n].name)
        }, 100)
      })
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  text-align: center;
}

.container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  width: 25%;
  height: 30%;
  text-align: center;
  background-color: #ff6700;
  border-radius: 5px;
  margin: 30px auto;
}

.list-item {
  width: 30%;
  height: 30%;
  padding: 10% 0;
  line-height: 100%;
  margin: 2% 0;
  background-color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

.active {
  background: #ffe6a6;
  box-shadow: inset 0 0 16px #ffa800;
}
</style>
