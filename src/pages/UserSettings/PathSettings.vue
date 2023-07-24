<template>
    <div>
        <ul class="list-group">
            <SettingInputBox v-for="(item, index) in Settings" :key="index" @SettingInput="settingInput" :SettingInputBoxInfo="item" :Value="typeof SettingsData[item.name] !== 'undefined' ? SettingsData[item.name] : ''">
            </SettingInputBox>
        </ul>
        <div class="footer">
            <div class="refresh" @click="refreshSettings">
                <span class="material-icons refresh-icon">&nbsp;refresh&nbsp;</span>
                <span class="refresh-text">&nbsp;刷新&nbsp;</span>
            </div>
            <div class="save" @click="saveSettings">
                <span class="material-icons save-icon">&nbsp;save&nbsp;</span>
                <span class="save-text">&nbsp;保存&nbsp;</span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import SettingInputBox from './utils/SettingInputBox.vue';

export default {
    name: "SystemCmdSettings",
    components: {
        SettingInputBox
    },
    data() {
        return {
            Settings: [
                {
                    title: "电池电量路径",
                    tips: "手机电池电量信息文件的绝对路径",
                    name: "BatteryCapacityPath"
                },
                {
                    title: "电池充电状态路径",
                    tips: "手机电池充电状态文件的绝对路径",
                    name: "BatteryChargingStatePath"
                },
                {
                    title: "电池充电控制路径",
                    tips: "手机电池充电控制文件的绝对路径",
                    name: "BatteryChargingControlPath"
                },
                {
                    title: "CPU锁定路径",
                    tips: "CPU唤醒锁定文件的绝对路径",
                    name: "CpuWakeLockPath"
                },
                {
                    title: "CPU温度路径",
                    tips: "CPU温度信息文件的绝对路径",
                    name: "CpuTemperaturePath"
                },
            ],
            SettingsData: {
            }
        };
    },
    methods: {
        settingInput(val) {
            this.SettingsData[val.name] = val.value;
        },
        refreshSettings() {
            axios.post('http://10.5.73.1:8000/get-settings-path')
                .then(response => {
                    if (response.data.success)
                        this.SettingsData = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        saveSettings() {
            axios.post('http://10.5.73.1:8000/save-settings-path', this.SettingsData)
                .then(response => {
                    if (response.data.success)
                        console.log("保存成功");
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    mounted() {
        this.refreshSettings();
    }
};
</script>

<style scoped>
.footer {
    margin: auto;
    text-align: center;
}
.refresh {
    display: inline-block;
    width: 90px;
    height: 30px;
    text-align: center;
    background-color: rgb(250, 172, 66);
    border-radius: 2px;
    box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.5);
    margin-right: 50px;
    margin-top: 20px;
    cursor: pointer;
    transition-duration: 0.25s;
    user-select: none;
}
.refresh:hover {
    opacity: 0.8;
}
.refresh-icon {
    display: block;
    color: white;
    font-size: 20px;
    line-height: 30px;
    height: 100%;
    width: 50%;
    float: left;
    text-align: right;
}
.refresh-text {
    display: block;
    color: white;
    font-size: 13px;
    line-height: 30px;
    height: 100%;
    width: 50%;
    float: right;
    text-align: left;
}
.save {
    display: inline-block;
    width: 90px;
    height: 30px;
    text-align: center;
    background-color: rgb(100, 149, 237);
    border-radius: 2px;
    box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.5);
    margin-top: 20px;
    cursor: pointer;
    transition-duration: 0.25s;
    user-select: none;
}
.save:hover {
    opacity: 0.8;
}
.save-icon {
    display: block;
    color: white;
    font-size: 20px;
    line-height: 30px;
    height: 100%;
    width: 50%;
    float: left;
    text-align: right;
}
.save-text {
    display: block;
    color: white;
    font-size: 13px;
    line-height: 30px;
    height: 100%;
    width: 50%;
    float: right;
    text-align: left;
}
</style>