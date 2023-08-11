<template>
    <main class="main-content position-relative max-height-vh-100 h-100 my-content">
        <!-- 导航栏 -->
        <NavBar @ToggleNavSideBar="toggleNavSideBar" :Title="Title"></NavBar>
        <!-- 导航栏结束 -->
        <!-- 主页面内容 -->
        <div class="container-fluid mx-auto">
            <div class="col-12 col-xl-10 mx-auto bg-white border-radius-sm box-shadow-console pt-1 mt-4 box-shadow-settings">
                <div id="NetworkChart"></div>
            </div>
        </div>
        <!-- 主页面内容结束 -->
    </main>
</template>

<script>
// import axios from 'axios'
import NavBar from "../components/NavBar.vue";
import * as echarts from "echarts";

// 注册组件
export default {
    name: "NetworkMonitor",
    components: {
        NavBar
    },
    data() {
        return {
            // 必须项，设置导航栏标题
            Title: {
                tinyTitle: "流量",
                fullTitle: "流量监控"
            },
            chart: null,
            chartOptions: { xSplitNumber: 10 },
            NetworkSpeed: [
                { upload: 1, download: 740, time: 1691743043000 },
                { upload: 10, download: 784, time: 1691743044000 },
                { upload: 104, download: 960, time: 1691743045000 },
                { upload: 54, download: 1022, time: 1691743046000 },
                { upload: 650, download: 1125, time: 1691743047000 },
                { upload: 758, download: 6125, time: 1691743077000 }
            ]
        };
    },
    methods: {
        // 必须项，切换侧边栏
        toggleNavSideBar() {
            this.$emit("ToggleNavSideBar");
        }
    },
    computed: {
        dateMin() {
            if (this.NetworkSpeed.length) return this.NetworkSpeed[0].time;
            else return null;
        },
        dateMax() {
            if (this.NetworkSpeed.length)
                return this.NetworkSpeed[0].time + 1000 * 60;
            else return null;
        },
        dateNum() {
            return this.NetworkSpeed.length;
        },
        AxisData() {
            let AxisData = [];
            let temp = [];
            for (let i = 0; i < this.NetworkSpeed.length; i++) {
                temp.push([
                    this.NetworkSpeed[i].time,
                    this.NetworkSpeed[i].upload
                ]);
            }
            AxisData.push(temp);
            temp = [];
            for (let i = 0; i < this.NetworkSpeed.length; i++) {
                temp.push([
                    this.NetworkSpeed[i].time,
                    this.NetworkSpeed[i].download
                ]);
            }
            AxisData.push(temp);
            return AxisData;
        },
        series() {
            let seriesData = [];
            seriesData.push({
                name: "上传",
                type: "line",
                data: this.AxisData[0],
                lineStyle: {
                    color: "rgb(30, 144, 255)",
                    width: 4
                },
                textStyle: {
                    color: "#bfa"
                },
                symbol: "circle",
                showSymbol: false,
                symbolSize: 10,
                itemStyle: {
                    color: "rgb(30, 144, 255)"
                }
            });
            seriesData.push({
                name: "下载",
                type: "line",
                data: this.AxisData[1],
                lineStyle: {
                    color: "rgb(244, 67, 54)",
                    width: 4
                },
                textStyle: {
                    color: "#bfa"
                },
                symbol: "circle",
                showSymbol: false,
                symbolSize: 10,
                itemStyle: {
                    color: "rgb(244, 67, 54)"
                }
            });
            return seriesData;
        }
    },
    watch: {
        NetworkSpeed: {
            handler: function () {
                let chartOptions = this.chart.getOption();
                console.log(chartOptions);
                chartOptions.series = this.series;
                chartOptions.xAxis[0].min = this.dateMin;
                chartOptions.xAxis[0].max = this.dateMax;
                this.chart.setOption(chartOptions, true);
            },
            deep: true,
            immediate: false
        }
    },
    mounted() {
        this.chart = echarts.init(document.getElementById("NetworkChart"));
        this.chart.setOption(
            {
                animation: false,
                legend: {
                    data: ["上传", "下载"],
                    textStyle: {
                        color: "rgb(0,0,0)"
                    },
                    right: 40,
                    top: 10
                },
                tooltip: {
                    trigger: "axis",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    textStyle: {
                        color: "rgb(255,255,255)"
                    },
                    borderWidth: 0,
                    formatter: function (params) {
                        let tip = "";
                        for (let i = 0; i < params.length; i++) {
                            tip +=
                                params[i].seriesName +
                                " : " +
                                params[i].data[1] +
                                "KB/s" +
                                "<br/>";
                        }
                        return tip;
                    }
                },
                xAxis: {
                    type: "time",
                    axisLabel: {
                        color: "rgb(0,0,0)",
                        show: true,
                        /* 切换行坐标为 yy-mm-dd hh:mm:ss */
                        /*
                        formatter: function (value) {
                            let date = new Date(value);
                            let year = date.getFullYear();
                            let month = date.getMonth() + 1;
                            let day = date.getDate();
                            let hour = date.getHours();
                            let minute = date.getMinutes();
                            let second = date.getSeconds();
                            let dateResult = [year, month, day]
                                .map(function (item) {
                                    return item < 10 ? "0" + item : item;
                                })
                                .join("-");
                            let timeResult = [hour, minute, second]
                                .map(function (item) {
                                    return item < 10 ? "0" + item : item;
                                })
                                .join(":");
                            return dateResult + "\n" + timeResult;
                        }
                        */
                        /* 切换行坐标为 hh:mm:ss */
                        formatter: function (value) {
                            let date = new Date(value);
                            let hour = date.getHours();
                            let minute = date.getMinutes();
                            let second = date.getSeconds();
                            let timeResult = [hour, minute, second]
                                .map(function (item) {
                                    return item < 10 ? "0" + item : item;
                                })
                                .join(":");
                            return timeResult;
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    min: this.dateMin,
                    max: this.dateMax,
                    splitNumber: this.chartOptions.xSplitNumber
                },
                yAxis: {
                    type: "value",
                    min: 0,
                    splitNumber: 5,
                    axisLabel: {
                        formatter: function (value) {
                            // 根据数值大小自动调整单位
                            let units = ["KB/s", "MB/s", "GB/s"];
                            var unitIndex = 0;
                            while (
                                value >= 1024 &&
                                unitIndex < units.length - 1
                            ) {
                                value /= 1000;
                                unitIndex++;
                            }
                            return value.toFixed(2) + units[unitIndex];
                        },
                        color: "rgb(0,0,0)",
                        margin: 10
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true
                    }
                },
                series: this.series,
                grid: {
                    top: 60,
                    left: 100,
                    right: 20,
                    bottom: 40
                }
            },
            true
        );
        new ResizeObserver((element) => {
            if (
                element[0].contentRect.width < 750 &&
                this.chartOptions.xSplitNumber != 5
            ) {
                let options = this.chart.getOption();
                this.chartOptions.xSplitNumber = 5;
                options.xAxis[0].splitNumber = this.chartOptions.xSplitNumber;
                this.chart.setOption(options, true);
            } else if (
                element[0].contentRect.width >= 750 &&
                this.chartOptions.xSplitNumber != 10
            ) {
                let options = this.chart.getOption();
                this.chartOptions.xSplitNumber = 10;
                options.xAxis[0].splitNumber = this.chartOptions.xSplitNumber;
                this.chart.setOption(options, true);
            }
            this.chart.resize();
        }).observe(document.getElementById("NetworkChart"));
    },
    beforeDestroy() {}
};
</script>

<style scoped>
#NetworkChart {
    width: 100%;
    height: 500px;
}
</style>