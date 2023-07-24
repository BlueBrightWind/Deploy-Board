<template>
    <div class="col-lg-6 col-md-6 mt-4 mb-4">
        <div class="card z-index-2">
            <div class="p-0 position-relative m-3 z-index-2 bg-transparent">
                <div class="bg-dark shadow-primary border-radius-sm py-3 pe-1">
                    <div id="MemoryChart"></div>
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
            MemoryUsed: [],
            MemoryTotal: 1
        }
    },
    props: {
        MemoryChartData: {
            required: true
        }
    },
    computed: {
        MemoryUsedPersent() {
            return this.MemoryUsed.map((item) => {
                return (item / this.MemoryTotal * 100).toFixed(1);
            });
        },
        AxisData() {
            return this.MemoryUsedPersent.map(function (item, index) {
                return [index, item];
            });
        }
    },
    mounted() {
        this.chart = echarts.init(document.getElementById('MemoryChart'))
        this.chart.setOption({
            animation: false,
            title: {
                text: '内存监视器',
                textStyle: {
                    color: 'rgb(255,255,255)',
                    fontSize: 15,
                    fontWeight: 'normal'
                },
                left: 10,
                top: 5
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // 设置背景色为黑色，透明度为0.7
                textStyle: {
                    color: '#fff' // 设置文字颜色为白色
                },
                borderWidth: 0,
                formatter: function (params) {
                    return "内存占用: &nbsp;&nbsp;" + params[0].data[1] + "%";
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
                }
            },
            series: [{
                type: 'line',
                data: this.AxisData,
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.8)',
                    width: 1
                },
                textStyle: {
                    color: '#fff'
                },
                showSymbol: false,
                itemStyle: {
                    color: 'rgba(255, 255, 255, 0.8)',
                },
                areaStyle: {
                    color: 'rgba(255, 255, 255, 0.2)',
                    opacity: 1
                }
            }],
            grid: {
                top: 60,
                left: 60,// 调整这个属性
                right: 20,
                bottom: 10,
            }
        }, true);
        new ResizeObserver(() => {
            this.chart.resize();
        }).observe(document.getElementById('MemoryChart'));
    },
    watch: {
        MemoryChartData: {
            handler: function (val) {
                this.MemoryUsed = val.MemoryUsed;
                this.MemoryTotal = val.MemoryTotal;
            },
            deep: true,
            immediate: false
        },
        MemoryUsed: {
            handler: function () {
                let chartOptions = this.chart.getOption();
                chartOptions.series[0].data = this.AxisData;
                this.chart.setOption(chartOptions, true);
            },
            deep: true,
            immediate: false
        }
    }
}
</script>

<style scoped>
#MemoryChart{
    width: 100%;
    height: 350px;
}
</style>
