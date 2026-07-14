// src\ts\demo8.ts
import { ref } from 'vue'

// 1. 定义发电机强类型契约
export interface Turbine {
  id: string
  name: string
  healthScore: number // $H \in [0, 100]$
  status: 'running' | 'warning' | 'fault'
}

// 2. 声明并导出响应式发电机数组
export const turbines = ref<Turbine[]>([
  { id: 'WTG001', name: '风电一期 1 号风机', healthScore: 95, status: 'running' },
  { id: 'WTG002', name: '风电一期 2 号风机', healthScore: 72, status: 'warning' },
  { id: 'WTG003', name: '风电一期 3 号风机', healthScore: 45, status: 'fault' }
])