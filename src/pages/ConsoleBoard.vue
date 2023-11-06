<template>
    <main class="main-content position-relative max-height-vh-100 h-100">
        <!-- 导航栏 -->
        <NavBar @ToggleNavSideBar="toggleNavSideBar" :Title="Title"></NavBar>
        <!-- 导航栏结束 -->
        <!-- 主页面内容 -->
        <div class="container-fluid mx-auto">
            <div class="col-10 mx-auto bg-white border-radius-sm box-shadow-console pt-1 mt-4">
                <ul class="list-group">
                    <ConsoleCheckBox v-for="(item, index) in Settings" :key="index" @ConsoleCheck="consoleCheck" :ConsoleCheckBoxInfo="item" :Value="typeof SettingsData[item.name] !== 'undefined' ? SettingsData[item.name] : false"></ConsoleCheckBox>
                </ul>
            </div>
        </div>
        <!-- 主页面内容结束 -->
    </main>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import ConsoleCheckBox from "./ConsoleBoard/ConsoleCheckBox.vue";

// 注册组件
export default {
    name: "ConsoleBoard",
    components: {
        NavBar,
        ConsoleCheckBox
    },
    data() {
        return {
            // 必须项，设置导航栏标题
            Title: "控制台",
            Settings: [
                {
                    title: "唤醒锁定",
                    tips: "开启后可以解决 Linux Deploy 在锁屏状态下卡顿, 推荐开启",
                    name: "WakeLockState"
                },
                {
                    title: "Doze模式",
                    tips: "关闭后可以解决锁屏状态下 Linux Deploy 无法连接网络, 推荐关闭",
                    name: "WakeLockState"
                },
                {
                    title: "Wifi省电模式",
                    tips: "关闭后可以小幅度减少网络延迟, 约10ms, 由于安卓系统限制, 该模式在关闭一段时间后会自动开启, 推荐关闭",
                    name: "WakeLockState"
                }
            ],
            SettingsData: {}
        };
    },
    methods: {
        // 必须项，切换侧边栏
        toggleNavSideBar() {
            this.$emit("ToggleNavSideBar");
        },
        consoleCheck(val) {
            this.SettingsData[val.name] = val.value;
        },
        refreshState() {
            this.SettingsData = {};
        }
    },
    watch: {
        SettingsData: {
            handler(val) {
                console.log(val);
            },
            deep: true
        }
    }

};
</script>

<style scoped>
.box-shadow-console {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>