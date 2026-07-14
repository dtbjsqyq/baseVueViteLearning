// src\ts\demo7.ts
import { reactive } from "vue";

export interface PlcConfig {
  ip: string;
  port: number;
  isActive: boolean;
}

export const plcConfig = reactive<PlcConfig>({
    ip: "192.168.1.100",
    port: 502,
    isActive: true
})