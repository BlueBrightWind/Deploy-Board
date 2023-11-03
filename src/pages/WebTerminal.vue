<template>
    <main class="main-content position-relative max-height-vh-100 h-100 my-content">
        <!-- 导航栏 -->
        <NavBar @ToggleNavSideBar="toggleNavSideBar" :Title="Title"></NavBar>
        <!-- 导航栏结束 -->
        <!-- 主页面内容 -->
        <div class="container-fluid mx-auto">
            <div class="col-12 col-xl-10 mx-auto bg-white border-radius-sm box-shadow-console pt-1 mt-4 box-shadow-settings">
                <Terminal></Terminal>
            </div>
        </div>
        <!-- 主页面内容结束 -->
    </main>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import Terminal from "./WebTerminal/WebTerminal.vue"


// 注册组件
export default {
    name: "WebTerminal",
    components: {
        NavBar,
        Terminal
    },
    data() {
        return {
            // 必须项，设置导航栏标题
            Title: {
                tinyTitle: "终端",
                fullTitle: "Web终端"
            },
        };
    },
    methods: {
        // 必须项，切换侧边栏
        toggleNavSideBar() {
            this.$emit("ToggleNavSideBar");
        }
    },
    mounted() {

    },
    beforeDestroy() {

    }
};
</script>

<style scoped>

</style>