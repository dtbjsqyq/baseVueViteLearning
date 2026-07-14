<script setup lang="ts">
import { ref } from 'vue'
// 1. 导入解耦的发电机数组
import { turbines } from '../ts/demo8'

// 2. 派单模拟动作
const dispatchOrder = (turbineId: string) => {
  alert(`🔧 已成功向现场推送工单！正在调配工程师前往检修风机：[${turbineId}]`);
}

// 3. 动态计算卡片类名的方法 (Method)
// 💡 技术攻坚：因为是在 v-for 循环中，无法直接使用单个 Computed（除非传入入参），
// 因此在这里定义一个类型安全、且高响应的转换函数。
const getCardClass = (score: number): string => {
  if (score >= 80) return 'card-green'
  if (score >= 60) return 'card-orange'
  return 'card-red'
}
</script>

<template>
  <section class="phm-container">
    <h2>📊 风电场发电机组实时健康度看板</h2>
    <p class="subtitle">提示：拖动卡片内的滑块，旁边的状态、派单按钮及卡片背景色将进行毫秒级联动刷新！</p>

    <!-- 容器阵列 -->
    <div class="turbine-grid">
      <!-- 🟢 任务 2: 使用 v-for 循环发电机列表，绑定唯一 :key -->
      <!-- 🟢 任务 3: 使用 :class 绑定我们编写的状态计算函数 -->
      <div 
        v-for="item in turbines" 
        :key="item.id" 
        :class="getCardClass(item.healthScore)"
        class="turbine-card"
      >
        <div class="card-header">
          <span class="turbine-name">{{ item.name }}</span>
          <span class="turbine-id">({{ item.id }})</span>
        </div>

        <!-- 实时健康得分 -->
        <div class="score-display">
          当前健康度: <strong>{{ item.healthScore }}</strong>
        </div>

        <!-- 🟢 任务 2: v-model.number 双向绑定滑动条，限制范围 [0, 100] -->
        <div class="control-box">
          <input 
            v-model.number="item.healthScore" 
            type="range" 
            min="0" 
            max="100" 
            class="health-slider"
          />
        </div>

        <!-- 🟢 任务 2: 使用 v-if/v-else-if/v-else 动态判定报警标识及派单按钮 -->
        <div class="alert-zone">
          <span v-if="item.healthScore >= 80" class="badge badge-success">
            🟢 优秀
          </span>
          
          <span v-else-if="item.healthScore >= 60" class="badge badge-warning">
            🟡 亚健康
          </span>
          
          <div v-else class="danger-wrapper">
            <span class="badge badge-danger">🔴 极度危险</span>
            
            <!-- ⚡ 立即派单按钮：利用 v-if 动态控制渲染 -->
            <button 
              type="button" 
              class="dispatch-btn" 
              @click="dispatchOrder(item.id)"
            >
              🛠️ 立即派单
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* PHM 大屏基础样式 */
.phm-container {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.subtitle {
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
}

.turbine-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

/* 设备基础卡片样式 */
.turbine-card {
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.turbine-name {
  font-size: 16px;
}

.turbine-id {
  font-size: 12px;
  color: #8c8c8c;
}

.score-display {
  font-size: 15px;
  margin-bottom: 15px;
}

.control-box {
  margin-bottom: 15px;
}

.health-slider {
  width: 100%;
  cursor: pointer;
}

.alert-zone {
  min-height: 40px;
  display: flex;
  align-items: center;
}

.danger-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

/* 徽章样式 */
.badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.badge-success { background-color: #e6f7ff; color: #1890ff; }
.badge-warning { background-color: #fffbe6; color: #faad14; }
.badge-danger { background-color: #fff1f0; color: #ff4d4f; }

/* 派单按钮样式 */
.dispatch-btn {
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  transition: background-color 0.2s;
}

.dispatch-btn:hover {
  background-color: #d9363e;
}

/* ==================== 🎯 任务 3: 动态卡片背景 CSS 样式 ==================== */

/* 🟢 优秀卡片样式 */
.card-green {
  background-color: #f6ffed;
  border-color: #b7eb8f;
  color: #389e0d;
}

/* 🟡 亚健康卡片样式 */
.card-orange {
  background-color: #fffbe6;
  border-color: #ffe58f;
  color: #d46b08;
}

/* 🔴 故障闪烁卡片样式 */
.card-red {
  background-color: #fff1f0;
  border-color: #ffccc7;
  color: #cf1322;
  animation: pulse-red-border 2s infinite;
}

@keyframes pulse-red-border {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 77, 79, 0.4);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(255, 77, 79, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 77, 79, 0);
  }
}
</style>