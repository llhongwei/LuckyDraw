<template>
  <div
    class="draw-disc"
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
</template>

<script>
export default {
  data() {
    return {
      activeIndex: -1,
      indexArr: [0, 1, 2, 5, 8, 7, 6, 3],
      isAnimation: false
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    oreNums: {
      type: Number,
      default: 0
    }
  },
  methods: {
    start(event) {
      if (event.target.innerText === '抽奖' && !this.isAnimation) {
        if (this.oreNums >= 200) {
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
          this.$emit('drawSuccess')
          this.startanimation(prize)
        } else {
          this.$alert('当前矿石不足', '友情提示', {
            confirmButtonText: '确定'
          });
        }
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
        this.$alert(`恭喜您抽中${this.list[n].name}`, '', {
          confirmButtonText: '确定',
          callback: () => {
            this.isAnimation = false
            this.activeIndex = -1
            this.$emit('drawResult', this.list[n])
          }
        });
      })
    }
  }
}
</script>

<style scoped>
.draw-disc {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  width: 450px;
  height: 345px;
  text-align: center;
  background-color: #ff6700;
  border-radius: 5px;
}

.list-item {
  width: 130px;
  height: 100px;
  line-height: 100px;
  background-color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

.active {
  background: #ffe6a6;
  box-shadow: inset 0 0 16px #ffa800;
}
</style>