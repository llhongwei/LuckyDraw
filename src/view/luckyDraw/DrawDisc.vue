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
    async start(event) {
      if (event.target.innerText === '抽奖' && !this.isAnimation) {
        if (this.oreNums >= 200) {
          this.isAnimation = true
          // console.log(num)
          let prize = -1
          await this.$axios.get('https://qc6nzx.fn.thelarkcloud.com/lottery')
              .then(function (response) {
                prize = response.data.idx;
              })
          this.$emit('drawSuccess')
          this.startAnimation(prize)
        } else {
          this.$alert('当前矿石不足', '友情提示', {
            confirmButtonText: '确定'
          });
        }
      }
    },
    startAnimation(n) {
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
          this.$alert(`恭喜您抽中${this.list[n].name}`, '', {
            confirmButtonText: '确定',
            callback: () => {
              this.isAnimation = false
              this.activeIndex = -1
              this.$emit('drawResult', this.list[n])
            }
          });
        }, 300)
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