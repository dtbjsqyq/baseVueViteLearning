<!-- src\App.vue -->
<script setup lang="ts">
import { ref } from 'vue'

import HelloWorld from './components/HelloWorld.vue'
const data = ref(0)
const parentData = ref("a")



const increment = () => {
  data.value++
  console.log('data.value', data.value)
}

// 父组件接收&处理参数
const handleChildAlert = (msg: string) => {
  alert(msg)
  parentData.value = msg
  console.log('父组件接收子组件传递的参数', msg)
}

const title = ref('你好,PHM!')

const changeTitle = (newTitle: string) => {
  title.value = newTitle
}

</script>

<template>
  <h2>文字1</h2>
  <button type="button" class="counter" @click="increment">
    增加 是 {{ data }}
  </button>
  <HelloWorld :msg="title" user="Codex" @alert-parent="handleChildAlert" @change-title="changeTitle" />

  <h3>展示传来的数据 + {{ parentData }}</h3>
</template>
