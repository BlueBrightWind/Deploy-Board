<template>
    <div>
        <ul class="list-group">
            <SettingInputBox v-for="(item, index) in Settings" :key="index" @SettingInput="settingInput" :SettingInputBoxInfo="item" :Value="SettingsData[item.name]">
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
                    title: "开启DozeMode指令",
                    tips: "开启安卓系统 DozeMode 的linux shell命令",
                    name: "DozeModeOpenCmd"
                },
                {
                    title: "关闭DozeMode指令",
                    tips: "关闭安卓系统 DozeMode 的linux shell命令",
                    name: "DozeModeCloseCmd"
                },
                {
                    title: "查询DozeMode指令",
                    tips: "查询安卓系统 DozeMode状态 的linux shell命令",
                    name: "DozeModeStateCmd"
                },
                {
                    title: "开启Wifi节能指令",
                    tips: "开启 Wifi节能 的linux shell命令",
                    name: "WifiPowerSaveOpenCmd"
                },
                {
                    title: "关闭Wifi节能指令",
                    tips: "关闭 Wifi节能 的linux shell命令",
                    name: "WifiPowerSaveCloseCmd"
                },
                {
                    title: "查询Wifi节能指令",
                    tips: "查询 Wifi节能状态 的linux shell命令",
                    name: "WifiPowerSaveStateCmd"
                },
                {
                    title: "开启安卓系统指令",
                    tips: "开启 安卓系统 的linux shell命令",
                    name: "AndroidSystemOpenCmd"
                },
                {
                    title: "关闭安卓系统指令",
                    tips: "关闭 安卓系统 的linux shell命令",
                    name: "AndroidSystemCloseCmd"
                }
            ],
            SettingsData : {}
        };
    },
    methods: {
        settingInput(val) {
            this.SettingsData[val.name] = val.value;
        },
        refreshSettings() {
            axios.post('http://192.168.31.221:8000/get-settings-cmd')
                .then(response => {
                    if (response.data.success)
                        this.SettingsData = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        saveSettings() {
            axios.post('http://192.168.31.221:8000/save-settings-cmd', this.SettingsData)
                .then(response => {
                    if (response.data.success)
                        console.log("保存成功");
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    created() {
        for(let i=0 ; i<this.Settings.length ; i++)
            this.$set(this.SettingsData, this.Settings[i].name, "");
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