<template>
  <div class="draw-disc">
    <div
      v-for="(item, index) in list"
      :key="item.id"
      class="list-item"
      :class="{'active': index === 4 || index === activeIndex, 'choujiang': index === 4}"
      @click="start(index)"
    >
      <img
        :src="item.imgUrl"
        v-if="item.imgUrl"
        class="list-item-img"
       alt="img">
      <span>
        {{ item.name }}
      </span>
      <span
        v-if="index === 4"
        class="tips"
      >
        200矿石/次
      </span>
    </div>
  </div>
</template>

<script>
import { getDrawResult } from '@/network/api.js'
export default {
  data() {
    return {
      activeIndex: -1,
      indexArr: [0, 1, 2, 5, 8, 7, 6, 3],
      isAnimation: false,
      prize: -1
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
    //获取抽奖结果并开始动画
    async getDrawResult() {
      const res = await getDrawResult()
      // console.log(res)
      this.prize = this.list.findIndex(item => {
        return item.id === res.data.idx
      })
      this.$emit('drawSuccess')
      this.startAnimation(this.prize)
    },
    start(index) {
      if (index === 4 && !this.isAnimation) {
        if (!this.$bus.$data.userName) {
          this.$alert(`您还为登录，请去登录！`, '提示', {
            confirmButtonText: '确定',
            callback: () => {
              this.$router.push('/login')
            }
          });
        } else if (this.oreNums >= 200) {
          this.isAnimation = true
          // console.log(num)
          this.getDrawResult()
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
              this.prize = -1
              this.$emit('drawResult', this.list[n])
            }
          });
        }, 200)
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
  font-size: 14px;
  color: #ff9100;
}

.list-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 130px;
  height: 100px;
  /* line-height: 100px; */
  background-color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

.active {
  background: #ffe6a6;
  box-shadow: inset 0 0 16px #ffa800;
}

.choujiang {
  color: #a74b00;
  font-size: 24px;
  font-weight: 700;
}

.list-item-img {
  width: 50px;
  margin: 0 auto;
}

.tips {
  font-size: 14px;
  color: #ff9100;
  font-weight: inherit;
}
</style>