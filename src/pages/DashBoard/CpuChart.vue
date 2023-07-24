<template>
    <div class="col-lg-6 col-md-6 mt-4 mb-4">
        <div class="card z-index-2">
            <div class="p-0 position-relative m-3 z-index-2 bg-transparent">
                <div class="bg-dark shadow-dark border-radius-sm py-3 pe-1">
                    <div id="CpuChart"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    data() {
        return {
            chart: null,
            CpuLoadList: [],
            colorList: ['#009688', '#8ac34a', '#5cdbd3', '#b37feb', '#ff85c0', '#2196f3', '#4eaf50', '#ff5722']
        }
    },
    props: {
        CpuChartData: {
            required: true
        }
    },
    computed: {
        AxisData() {
            let AxisData = [];
            for (let i = 0; i < this.CpuLoadList.length; i++) {
                let temp = [];
                for (let j = 0; j < this.CpuLoadList[i].length; j++) {
                    temp.push([j, this.CpuLoadList[i][j]]);
                }
                AxisData.push(temp);
            }
            return AxisData;
        },
        legendData() {
            let legendData = [];
            for (let i = 0; i < this.AxisData.length; i++) {
                legendData.push('CPU' + i.toString());
            }
            return legendData;
        },
        series() {
            let seriesData = [];
            for (let i = 0; i < this.AxisData.length; i++) {
                seriesData.push({
                    name: 'CPU' + i.toString(),
                    type: 'line',
                    data: this.AxisData[i],
                    lineStyle: {
                        color: this.colorList[i],
                        width: 1
                    },
                    textStyle: {
                        color: '#fff'
                    },
                    symbol: 'circle',
                    showSymbol: false,
                    symbolSize: 1,
                    itemStyle: {
                        color: this.colorList[i]
                    }
                });
            }
            return seriesData;
        }
    },
    mounted() {
        this.chart = echarts.init(document.getElementById('CpuChart'))
        this.chart.setOption({
            animation: false,
            title: {
                text: 'CPU监视器',
                textStyle: {
                    color: 'rgb(255,255,255)',
                    fontSize: 15,
                    fontWeight: 'normal'
                },
                left: 10,
                top: 5
            },
            legend: {
                data: this.legendData,
                textStyle: {
                    color: '#fff'
                },
                left: 100
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // 设置背景色为黑色，透明度为0.7
                textStyle: {
                    color: '#fff' // 设置文字颜色为白色
                },
                borderWidth: 0,
                formatter: function (params) {
                    let tip = "";
                    for (let i = 0; i < params.length; i++) {
                        tip += "CPU" + i.toString() + " 负载: &nbsp;&nbsp;" + params[i].data[1] + "%" + "<br/>";
                    }
                    return tip
                }
            },
            xAxis: {
                type: 'value',
                min: 0,
                max: 40,
                interval: 4,
                axisLabel: {
                    color: '#fff',
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true
                }
            },
            yAxis: {
                type: 'value',
                min: 0,
                max: 100,
                interval: 20,
                axisLabel: {
                    formatter: '{value} %',
                    color: '#fff',
                    margin: 7
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true
                }
            },
            series: this.seriesData,
            grid: {
                top: 60,
                left: 60,
                right: 20,
                bottom: 10,
            }
        }, true);
        new ResizeObserver(() => {
            this.chart.resize();
        }).observe(document.getElementById('CpuChart'));
    },
    watch: {
        CpuChartData: {
            handler: function (val) {
                this.CpuLoadList = val.CpuLoadList;
            },
            deep: true,
            immediate: false
        },
        CpuLoadList: {
            handler: function () {
                let chartOptions = this.chart.getOption();
                chartOptions.series = this.series;
                chartOptions.legend[0].data = this.legendData;
                this.chart.setOption(chartOptions, true);
            },
            deep: true,
            immediate: false
        }
    }
}
</script>

<style scoped>
#CpuChart{
    width: 100%;
    height: 350px;
}
</style>
