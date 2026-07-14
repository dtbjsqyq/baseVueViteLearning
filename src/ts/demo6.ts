// src\ts\demo6.ts
import { ref } from "vue";

export interface AlarmLog {
  logId: string;
  timestamp: number | string;
  sensorName: string;
  alarmLevel: "info" | "warning" | "critical";
  message?: string;
}


// 声明响应式数组，并用泛型约束它
export const activeAlarms = ref<AlarmLog[]>([
  {
    logId: "ALARM_001",
    timestamp: Date.now(),
    sensorName: "Sensor 1",
    alarmLevel: "warning",
    message: "Alarm triggered",
  },
  {
    logId: "ALARM_002",
    timestamp: 1783935300000, // 传入数字时间戳，同样符合 number | string 的联合类型
    sensorName: "2 hao Sensor",
    alarmLevel: "critical",
  },
]);


export function filterCriticalAlarms(logs: AlarmLog[]): AlarmLog[] {
return logs.filter((log)=>log.alarmLevel === "critical"); 
}


// const criticalAlarms = filterCriticalAlarms(activeAlarms.value);
// console.log("Critical Alarms:", criticalAlarms);