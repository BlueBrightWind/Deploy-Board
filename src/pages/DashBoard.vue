<template>
    <main class="main-content position-relative max-height-vh-100 h-100 my-content">
        <!-- 导航栏 -->
        <NavBar @ToggleNavSideBar="toggleNavSideBar" :Title="Title"></NavBar>
        <!-- 导航栏结束 -->
        <!-- 主页面内容 -->
        <div class="container-fluid py-4">
            <!-- 性能监控 -->
            <PerfMonitor :PerfMonitorData="PerfMonitorData"></PerfMonitor>
            <div class="row mt-4">
                <!-- CPU使用率 -->
                <CpuChart :CpuChartData="PerfMonitorChart.CpuChartData"></CpuChart>
                <!-- 内存使用率 -->
                <MemoryChart :MemoryChartData="PerfMonitorChart.MemoryChartData"></MemoryChart>
            </div>
        </div>
        <!-- 主页面内容结束 -->
    </main>
</template>

<script>
import axios from 'axios'
import NavBar from "../components/NavBar.vue";
import PerfMonitor from "./DashBoard/PerfMonitor.vue";
import CpuChart from "./DashBoard/CpuChart.vue";
import MemoryChart from "./DashBoard/MemoryChart.vue";
// 注册组件
export default {
    name: "DashBoard",
    components: {
        NavBar,
        PerfMonitor,
        CpuChart,
        MemoryChart
    },
    data() {
        return {
            // 必须项，设置导航栏标题
            Title: {
                tinyTitle: "面板",
                fullTitle: "性能监测面板"
            },
            PerfMonitorData: {
                cpu: {
                    load: 0,
                    temp: 0
                },
                memory: {
                    used: 0,
                    total: 1
                },
                battery: {
                    level: 0,
                    charging: false
                },
                phone: {
                    wakeLock: false,
                    dozeMode: false
                }
            },
            PerfMonitorChart: {
                CpuChartData: {
                    CpuLoadList: []
                },
                MemoryChartData: {
                    MemoryUsed: [],
                    MemoryTotal: 1
                }
            },
            // 定时器
            Timer: null
        }
    },
    methods: {
        // 必须项，切换侧边栏
        toggleNavSideBar() {
            this.$emit("ToggleNavSideBar");
        },
        // 模拟获取性能监控数据
        simulationGetMonitorData() {
            let cpuLoadAvg = Math.floor(Math.random() * 100);
            let cpuLoadList = [];
            for (let i = 0; i < 6; i++) {
                cpuLoadList.push(Math.floor(Math.random() * 100));
            }
            let cpuTemp = Math.floor(Math.random() * 100);
            let memoryUsed = Math.floor(Math.random() * 8192);
            let memoryTotal = 8192;
            let batteryLevel = Math.floor(Math.random() * 100);
            let batteryCharging = true;
            let wakeLock = true;
            let dozeMode = false;
            this.PerfMonitorData.cpu.load = cpuLoadAvg;
            this.PerfMonitorData.cpu.temp = cpuTemp;
            this.PerfMonitorData.memory.used = memoryUsed;
            this.PerfMonitorData.memory.total = memoryTotal;
            this.PerfMonitorData.battery.level = batteryLevel;
            this.PerfMonitorData.battery.charging = batteryCharging;
            this.PerfMonitorData.phone.wakeLock = wakeLock;
            this.PerfMonitorData.phone.dozeMode = dozeMode;

            if (this.PerfMonitorChart.CpuChartData.CpuLoadList.length == 0) {
                for (let i = 0; i < cpuLoadList.length; i++)
                    this.PerfMonitorChart.CpuChartData.CpuLoadList.push([cpuLoadList[i]]);
            }
            else {
                if (this.PerfMonitorChart.CpuChartData.CpuLoadList[0].length > 40)
                    for (let i = 0; i < cpuLoadList.length; i++)
                        this.PerfMonitorChart.CpuChartData.CpuLoadList[i].shift();
                for (let i = 0; i < cpuLoadList.length; i++)
                    this.PerfMonitorChart.CpuChartData.CpuLoadList[i].push(cpuLoadList[i]);
            }

            if (this.PerfMonitorChart.MemoryChartData.MemoryUsed.length > 40)
                this.PerfMonitorChart.MemoryChartData.MemoryUsed.shift();
            this.PerfMonitorChart.MemoryChartData.MemoryUsed.push(memoryUsed);
            this.PerfMonitorChart.MemoryChartData.MemoryTotal = memoryTotal;

        },
        getMonitorData() {
            const vm = this;
            axios.get('http://192.168.31.221:8000/perf-all')
                .then(function (response) {
                    if (response.data.success == false)
                        return;
                    let data = response.data.data;
                    
                    let cpuLoadAvg = Object.prototype.hasOwnProperty.call(data.cpu, "cpuLoadAvg") ? data.cpu.cpuLoadAvg : 0;
                    let cpuLoadList = Object.prototype.hasOwnProperty.call(data.cpu, "cpuLoadList") ? data.cpu.cpuLoadList : [];
                    let cpuTemp = Object.prototype.hasOwnProperty.call(data.cpu, "cpuTemp") ? data.cpu.cpuTemp : 0;
                    let memoryUsed = Object.prototype.hasOwnProperty.call(data.memory, "memoryUsed") ? data.memory.memoryUsed : 0;
                    let memoryTotal = Object.prototype.hasOwnProperty.call(data.memory, "memoryTotal") ? data.memory.memoryTotal : 1;
                    let batteryLevel = Object.prototype.hasOwnProperty.call(data.battery, "batteryLevel") ? data.battery.batteryLevel : 0;
                    let batteryCharging = Object.prototype.hasOwnProperty.call(data.battery, "batteryCharging") ? data.battery.batteryCharging : false;
                    let wakeLock = Object.prototype.hasOwnProperty.call(data.phone, "wakeLock") ? data.phone.wakeLock : false;
                    let dozeMode = Object.prototype.hasOwnProperty.call(data.phone, "dozeMode") ? data.phone.dozeMode : false;

                    vm.PerfMonitorData.cpu.load = cpuLoadAvg;
                    vm.PerfMonitorData.cpu.temp = cpuTemp;
                    vm.PerfMonitorData.memory.used = memoryUsed;
                    vm.PerfMonitorData.memory.total = memoryTotal;
                    vm.PerfMonitorData.battery.level = batteryLevel;
                    vm.PerfMonitorData.battery.charging = batteryCharging;
                    vm.PerfMonitorData.phone.wakeLock = wakeLock;
                    vm.PerfMonitorData.phone.dozeMode = dozeMode;

                    if (vm.PerfMonitorChart.CpuChartData.CpuLoadList.length == 0) {
                        for (let i = 0; i < cpuLoadList.length; i++)
                            vm.PerfMonitorChart.CpuChartData.CpuLoadList.push([cpuLoadList[i]]);
                    }
                    else {
                        if (vm.PerfMonitorChart.CpuChartData.CpuLoadList[0].length > 40)
                            for (let i = 0; i < cpuLoadList.length; i++)
                                vm.PerfMonitorChart.CpuChartData.CpuLoadList[i].shift();
                        for (let i = 0; i < cpuLoadList.length; i++)
                            vm.PerfMonitorChart.CpuChartData.CpuLoadList[i].push(cpuLoadList[i]);
                    }

                    if (vm.PerfMonitorChart.MemoryChartData.MemoryUsed.length > 40)
                        vm.PerfMonitorChart.MemoryChartData.MemoryUsed.shift();
                    vm.PerfMonitorChart.MemoryChartData.MemoryUsed.push(memoryUsed);
                    vm.PerfMonitorChart.MemoryChartData.MemoryTotal = memoryTotal;
                })
                .catch(function (error) {
                    console.warn("Error: an error occurred while getting monitor data.", error);
                });
        }
    },
    mounted() {
        this.getMonitorData();
        this.Timer = setInterval(() => {
            this.getMonitorData();
        }, 1000);
    },
    beforeDestroy() {
        clearInterval(this.Timer);
    }
};
</script>

<style scoped>
</style>