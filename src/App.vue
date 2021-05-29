<template>
  <v-app>
    <v-main>
      <div class="map">
        <v-btn
          v-for="item of mapData"
          :key="item.key"
          text
          :color="currentMap === item.key ? 'primary' : ''"
          @click="handleClick(item)"
        >
          {{ item.key }}
        </v-btn>
      </div>
      <div class="result">
        <transition
          mode="out-in"
          :enter-active-class="animateBaseClass + enterClass"
          :leave-active-class="animateBaseClass + leaveClass"
        >
          <p v-show="showResult">{{ result }}</p>
        </transition>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import mapData from '@/mapData'
import 'animate.css/animate.min.css'
import { enter, leave } from './animate'

// 随机获取数组中的某个元素
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default {
  name: 'App',
  data: () => ({
    mapData: Object.freeze(mapData),
    currentMap: '',
    showResult: '',
    result: '',
    animateBaseClass: 'animate__animated animate__faster ',
    enterClass: '',
    leaveClass: ''
  }),
  methods: {
    handleClick({ key, locations }) {
      const setResult = () => {
        // 递归获取结果，防止出现跟上次结果重复的地点
        const result = () => {
          const r = getRandomItem(locations)
          if (r === this.result) {
            result()
          }
          return r
        }

        this.result = result()
        this.currentMap = key
        this.showResult = true
        this.enterClass = getRandomItem(enter)
        this.leaveClass = getRandomItem(leave)
      }

      if (this.result) {
        this.showResult = false

        setTimeout(() => {
         setResult()
        }, 500);
      } else {
        setResult()
      }
    }
  }
};
</script>

<style>
@font-face {
  font-family: 'Coca';
  src: url("~@/assets/Coca.TTF");
}

.theme--dark.v-application {
  font-family: Coca;
}

.theme--dark.v-application,
.theme--dark.v-btn {
  color: #BDBDBD !important;
}

.v-btn.v-size--default {
  font-size: 1rem !important;
}

.v-main__wrap {
  display: flex;
  flex-direction: column;
}

.map {
  display: flex;
  padding-top: 20px;
}
.map .v-btn {
  flex: 1;
}

.result {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.result p {
  font-size: 15vw;
}
</style>
