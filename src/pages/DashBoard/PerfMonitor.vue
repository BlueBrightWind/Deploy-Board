<template>
    <div class="row user-select-none">
        <div class="item">
            <div class="card">
                <div class="card-header p-3">
                    <div class="icon icon-lg icon-shape bg-gradient-secondary shadow-dark text-center border-radius-xl position-absolute">
                        <i class="material-icons opacity-10">computer</i>
                    </div>
                    <div class="text-end pt-1">
                        <span class="text-sm mb-0 text-dark font-weight-bold">处理器负载</span>
                        <h4 v-show="this.cpu.load>=80" class="mt-2 mb-0 text-danger"> {{this.cpu.load}} % </h4>
                        <h4 v-show="this.cpu.load<80" class="mt-2 mb-0 text-success"> {{this.cpu.load}} % </h4>
                    </div>
                </div>
                <hr class="dark horizontal my-0" />
                <div class="card-footer p-3">
                    <p class="mb-0">
                        <span class="text-sm font-weight-bolder">处理器温度：</span>
                        <span v-show="this.cpu.temp>=70" class="text-danger text-sm font-weight-bolder"> {{this.cpu.temp}} ℃ </span>
                        <span v-show="this.cpu.temp<70" class="text-success text-sm font-weight-bolder"> {{this.cpu.temp}} ℃ </span>
                    </p>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="card">
                <div class="card-header p-3">
                    <div class="icon icon-lg icon-shape bg-gradient-warning shadow-primary text-center border-radius-xl position-absolute">
                        <i class="material-icons opacity-10">memory</i>
                    </div>
                    <div class="text-end pt-1">
                        <p class="text-sm mb-0 text-dark font-weight-bold">内存占用</p>
                        <h4 v-show="this.memory.used/this.memory.total >= 0.9" class="mt-2 mb-0 text-danger"> {{(this.memory.used/this.memory.total * 100).toFixed(1)}} % </h4>
                        <h4 v-show="this.memory.used/this.memory.total < 0.9" class="mt-2 mb-0 text-success"> {{(this.memory.used/this.memory.total * 100).toFixed(1)}} % </h4>
                    </div>
                </div>
                <hr class="dark horizontal my-0" />
                <div class="card-footer p-3">
                    <p class="mb-0">
                        <span class="text-sm font-weight-bolder"> 内存信息：</span>
                        <span v-show="this.memory.used/this.memory.total >= 0.9" class="text-danger text-sm font-weight-bolder"> {{this.memory.used}} </span>
                        <span v-show="this.memory.used/this.memory.total < 0.9" class="text-success text-sm font-weight-bolder"> {{this.memory.used}} </span>
                        <span class="text-sm font-weight-bolder"> / {{this.memory.total}}MB</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="card">
                <div class="card-header p-3">
                    <div class="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl position-absolute">
                        <i class="material-icons opacity-10">battery_saver</i>
                    </div>
                    <div class="text-end pt-1">
                        <p class="text-sm mb-0 text-dark font-weight-bold">剩余电量</p>
                        <h4 v-show="this.battery.level<10" class="mt-2 mb-0 text-danger"> {{this.battery.level}} % </h4>
                        <h4 v-show="10<=this.battery.level && this.battery.level<20 " class="mt-2 mb-0 text-warning"> {{this.battery.level}} % </h4>
                        <h4 v-show="this.battery.level>=20" class="mt-2 mb-0 text-success"> {{this.battery.level}} % </h4>
                    </div>
                </div>
                <hr class="dark horizontal my-0" />
                <div class="card-footer p-3">
                    <p class="mb-0">
                        <span class="text-sm font-weight-bolder">充电状态：</span>
                        <span v-show="!this.battery.charging" class="text-danger text-sm font-weight-bolder">未在充电</span>
                        <span v-show="this.battery.charging" class="text-success text-sm font-weight-bolder">正在充电</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="card">
                <div class="card-header p-3">
                    <div class="icon icon-lg icon-shape bg-gradient-info shadow-info text-center border-radius-xl position-absolute">
                        <i class="material-icons opacity-10">app_settings_alt</i>
                    </div>
                    <div class="text-end pt-1">
                        <p class="text-sm mb-0 text-dark font-weight-bold">手机状态</p>
                        <h4 v-show="(this.phone.wakeLock&&!this.phone.dozeMode)" class="mt-2 mb-0 text-success">On</h4>
                        <h4 v-show="!(this.phone.wakeLock&&!this.phone.dozeMode)" class="mt-2 mb-0 text-danger">Off</h4>
                    </div>
                </div>
                <hr class="dark horizontal my-0" />
                <div class="card-footer p-3">
                    <p class="mb-0">
                        <span class="text-sm font-weight-bolder">唤醒锁定：</span>
                        <span v-show="!this.phone.wakeLock" class="text-danger text-sm font-weight-bolder">Off</span>
                        <span v-show="this.phone.wakeLock" class="text-success text-sm font-weight-bolder">On</span>
                        <span>&nbsp;&nbsp;</span>
                        <span class="text-sm font-weight-bolder">Doze模式：</span>
                        <span v-show="!this.phone.dozeMode" class="text-success text-sm font-weight-bolder">Off</span>
                        <span v-show="this.phone.dozeMode" class="text-danger text-sm font-weight-bolder">On</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PerfMonitor",
    data() {
        return {
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
        };
    },
    props: {
        PerfMonitorData: {
            required: true
        }
    },
    methods: {
        //
    },
    watch: {
        PerfMonitorData: {
            handler(val) {
                this.cpu.load = val.cpu.load;
                this.cpu.temp = val.cpu.temp;
                this.memory.used = val.memory.used;
                this.memory.total = val.memory.total;
                this.battery.level = val.battery.level;
                this.battery.charging = val.battery.charging;
                this.phone.wakeLock = val.phone.wakeLock;
                this.phone.dozeMode = val.phone.dozeMode;
            },
            deep: true,
            immediate: false
        }
    }
};
</script>

<style scoped>
.item{
    /* flex: 1 0 25%; */
    min-width: 260px;
    /* margin-bottom: 10px; */
}
.card{
    width: 100%;
    height: 100%;
}
</style>