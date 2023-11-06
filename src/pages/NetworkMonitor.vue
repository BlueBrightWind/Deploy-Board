<template>
    <main class="main-content position-relative max-height-vh-100 h-100 my-content">
        <!-- 导航栏 -->
        <NavBar @ToggleNavSideBar="toggleNavSideBar" :Title="Title"></NavBar>
        <!-- 导航栏结束 -->
        <!-- 主页面内容 -->
        <div class="container-fluid mx-auto">
            <div class="col-12 col-xl-10 mx-auto bg-white border-radius-sm box-shadow-console pt-1 mt-4 box-shadow-settings">
                <NetworkSpeedMonitor class="network-speed-monitor" :NetworkSpeedList="NetworkSpeed"></NetworkSpeedMonitor>
            </div>
        </div>
        <!-- 主页面内容结束 -->
    </main>
</template>

<script>
import axios from "axios";
import NavBar from "../components/NavBar.vue";
import NetworkSpeedMonitor from "./NetworkMonitor/SpeedMonitor.vue";

// 注册组件
export default {
    name: "NetworkMonitor",
    components: {
        NavBar,
        NetworkSpeedMonitor
    },
    data() {
        return {
            // 必须项，设置导航栏标题
            Title: "流量监控",
            NetworkSpeed: [],
            Timer: null
        };
    },
    methods: {
        // 必须项，切换侧边栏
        toggleNavSideBar() {
            this.$emit("ToggleNavSideBar");
        },
        getNetworkSpeed() {
            axios
                .get("http://192.168.31.221:8000/network-speed")
                .then((response) => {
                    if (response.data.success == false) return;
                    let data = response.data.data;
                    if (this.NetworkSpeed.length < 60) {
                        this.NetworkSpeed.push(data);
                    } else {
                        this.NetworkSpeed.shift();
                        this.NetworkSpeed.push(data);
                    }
                });
        }
    },
    mounted() {
        this.getNetworkSpeed();
        this.Timer = setInterval(() => {
            this.getNetworkSpeed();
        }, 1000);
    },
    beforeDestroy() {
        clearInterval(this.Timer);
    }
};
</script>

<style scoped>
.network-speed-monitor{
    width: 100%;
    height: 500px;
}

.box-shadow-settings {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>