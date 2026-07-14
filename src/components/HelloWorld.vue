<!-- src\components\HelloWorld.vue -->
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import vueLogo from '../assets/vue.svg'

import {
  activeAlarms,
  filterCriticalAlarms,
} from '../ts/demo6'

const criticalAlarms = computed(()=>{
  return filterCriticalAlarms(activeAlarms.value)
})


const count = ref(0)
const status = ref('normal')  // normal / warning / error
const countDecrease = ref(0)

const increment = () => {
  count.value++
  console.log('count.value', count.value)
}


const props = defineProps<{
  msg: string,
  user: string
}>()


// 子传父
// 声明事件
const emit = defineEmits(['alert-parent', 'change-title'])

const handleClick = () => {
  emit('alert-parent', '子组件传递的参数')
}

const handleChangeTitle = () => {
  emit('change-title', '新标题')
}


const doubleCount = computed(() => {
  console.log('加工厂开始开工...')
  return count.value * 2
})


watch(status, (newValue, oldValue) => {
  console.log(`status发生变化,${newValue} 变成 ${oldValue}`)
  if (newValue === 'error') {
    alert('status变成了error')
  }
})

const triggerError = () => {
  status.value = 'error'
}

</script>

<template>
  <section id="center">
    <div class="hero">
      <img :src="heroImg" class="base" width="170" height="179" alt="" />
      <img :src="vueLogo" class="framework" alt="Vue logo" />
      <img :src="viteLogo" class="vite" alt="Vite logo" />
    </div>
    <div>
      <h1>Get started</h1>
      <p>Edit <code>src/App.vue</code> and save to test <code>HMR</code></p>
    </div>
    <button type="button" class="counter" @click="increment">
      总数 是 {{ count }}
    </button>
    <button type="button" class="counter" @click="countDecrease--">
      减少 是 {{ countDecrease }}
    </button>

    <button type="button" class="counter" @click="handleClick">
      传递参数给父组件
    </button>
    <button type="button" class="counter" @click="handleChangeTitle">
      修改父组件标题
    </button>
    <h1>props: {{ props.msg }}</h1>
    <h1>props: {{ props.user }}</h1>

    <h6>加工值: {{ doubleCount }}</h6>
    <h6>加工值: {{ doubleCount }}</h6>


    <p>设备状态: {{ status }}</p>




    <button type="button" class="counter" @click="triggerError">
      触发错误
    </button>

    <h3>全部报警信息</h3>
    <ul>
      <li v-for="log in activeAlarms" :key="log.logId">
        [{{ log.logId }}] {{ log.sensorName }} - {{ log.message || '无报警信息' }} - {{ log.timestamp }}
      </li>
    </ul>


    <h3>过滤后的严重报警</h3>
    <ul>
      <li v-for="log in criticalAlarms" :key="log.logId">
        [{{ log.logId }}] {{ log.sensorName }} - {{ log.message || '无报警信息' }} - {{ log.timestamp }}
      </li>
    </ul>


  </section>

  <div class="ticks"></div>








  <section id="next-steps">
    <div id="docs">
      <svg class="icon" role="presentation" aria-hidden="true">
        <use href="/icons.svg#documentation-icon"></use>
      </svg>
      <h2>Documentation</h2>
      <p>Your questions, answered</p>
      <ul>
        <li>
          <a href="https://vite.dev/" target="_blank">
            <img class="logo" :src="viteLogo" alt="" />
            Explore Vite
          </a>
        </li>
        <li>
          <a href="https://vuejs.org/" target="_blank">
            <img class="button-icon" :src="vueLogo" alt="" />
            Learn more
          </a>
        </li>
      </ul>
    </div>
    <div id="social">
      <svg class="icon" role="presentation" aria-hidden="true">
        <use href="/icons.svg#social-icon"></use>
      </svg>
      <h2>Connect with us</h2>
      <p>Join the Vite community</p>
      <ul>
        <li>
          <a href="https://github.com/vitejs/vite" target="_blank">
            <svg class="button-icon" role="presentation" aria-hidden="true">
              <use href="/icons.svg#github-icon"></use>
            </svg>
            GitHub
          </a>
        </li>
        <li>
          <a href="https://chat.vite.dev/" target="_blank">
            <svg class="button-icon" role="presentation" aria-hidden="true">
              <use href="/icons.svg#discord-icon"></use>
            </svg>
            Discord
          </a>
        </li>
        <li>
          <a href="https://x.com/vite_js" target="_blank">
            <svg class="button-icon" role="presentation" aria-hidden="true">
              <use href="/icons.svg#x-icon"></use>
            </svg>
            X.com
          </a>
        </li>
        <li>
          <a href="https://bsky.app/profile/vite.dev" target="_blank">
            <svg class="button-icon" role="presentation" aria-hidden="true">
              <use href="/icons.svg#bluesky-icon"></use>
            </svg>
            Bluesky
          </a>
        </li>
      </ul>
    </div>
  </section>

  <div class="ticks"></div>
  <section id="spacer"></section>
</template>
