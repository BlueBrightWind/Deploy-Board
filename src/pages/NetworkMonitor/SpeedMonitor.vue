<template>
    <div id="NetworkChart"></div>
</template>

<script>
import * as echarts from "echarts";

// 注册组件
export default {
    data() {
        return {
            chart: null,
            chartOptions: { xSplitNumber: 10 }
        };
    },
    props: {
        NetworkSpeedList: {
            required: true
        }
    },
    computed: {
        dateMin() {
            if (this.NetworkSpeedList.length) return this.NetworkSpeedList[0].time;
            else return null;
        },
        dateMax() {
            if (this.NetworkSpeedList.length)
                return this.NetworkSpeedList[0].time + 1000 * 60;
            else return null;
        },
        AxisData() {
            let AxisData = [];
            let temp = [];
            for (let i = 0; i < this.NetworkSpeedList.length; i++) {
                temp.push([
                    this.NetworkSpeedList[i].time,
                    this.NetworkSpeedList[i].upload
                ]);
            }
            AxisData.push(temp);
            temp = [];
            for (let i = 0; i < this.NetworkSpeedList.length; i++) {
                temp.push([
                    this.NetworkSpeedList[i].time,
                    this.NetworkSpeedList[i].download
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
                    color: "#fff"
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
                    color: "#fff"
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
                        let units = ["KB/s", "MB/s", "GB/s"];
                        for (let i = 0; i < params.length; i++) {
                            let unitIndex = 0;
                            let value = params[i].data[1];
                             while (
                                value >= 1024 &&
                                unitIndex < units.length - 1
                            ) {
                                value /= 1000;
                                unitIndex++;
                            }
                            tip +=
                                params[i].seriesName +
                                " : " +
                                value.toFixed(2) + " " + 
                                units[unitIndex] +
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
                        // formatter: function (value) {
                        //     let date = new Date(value);
                        //     let year = date.getFullYear();
                        //     let month = date.getMonth() + 1;
                        //     let day = date.getDate();
                        //     let hour = date.getHours();
                        //     let minute = date.getMinutes();
                        //     let second = date.getSeconds();
                        //     let dateResult = [year, month, day]
                        //         .map(function (item) {
                        //             return item < 10 ? "0" + item : item;
                        //         })
                        //         .join("-");
                        //     let timeResult = [hour, minute, second]
                        //         .map(function (item) {
                        //             return item < 10 ? "0" + item : item;
                        //         })
                        //         .join(":");
                        //     return dateResult + "\n" + timeResult;
                        // }
            
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
                    minInterval: 1,
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
    watch: {
        NetworkSpeedList: {
            handler: function () {
                let chartOptions = this.chart.getOption();
                chartOptions.series = this.series;
                chartOptions.xAxis[0].min = this.dateMin;
                chartOptions.xAxis[0].max = this.dateMax;
                this.chart.setOption(chartOptions, true);
            },
            deep: true,
            immediate: false
        }
    }
};
</script>

<style scoped>
</style>