<template>
    <main class="main-content position-relative max-height-vh-100 h-100">
        <!-- 导航栏 -->
        <NavBar @ToggleNavSideBar="toggleNavSideBar" :Title="Title"></NavBar>
        <!-- 导航栏结束 -->
        <!-- 主页面内容 -->
        <div class="container-fluid mx-auto">
            <div class="col-12 col-xl-11 mx-auto bg-white pt-1 mt-4 border-radius-lg box-shadow-settings">
                <div class="user-settings-tabs">
                    <router-link class="tab" active-class="tab-active" :to="{name: 'system-cmd-settings'}">
                        <span>指令设置</span>
                    </router-link>
                    <router-link class="tab" active-class="tab-active" :to="{name: 'path-settings'}">
                        <span>路径设置</span>
                    </router-link>
                </div>
                <router-view></router-view>
            </div>
        </div>
        <!-- 主页面内容结束 -->
    </main>
</template>

<script>
import NavBar from "../components/NavBar.vue";

// 注册组件
export default {
    name: "UserSettings",
    components: {
        NavBar
    }, 
    data() {
        return {
            // 必须项，设置导航栏标题
            Title: "设置"
        };
    },
    methods: {
        // 必须项，切换侧边栏
        toggleNavSideBar() {
            this.$emit("ToggleNavSideBar");
        },

    },
};
</script>

<style scoped>
.user-settings-tabs {
    display: flex;
    width: 100%;
    margin-bottom: 20px;
}
.tab {
    display: block;
    border-bottom: 2px solid rgba(0, 0, 0, 0);
    margin-left: 20px;
    margin-right: 20px;
    font-family: "Microsoft YaHei", Arial, Helvetica, sans-serif;
    font-weight: 500;
    font-size: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    transition-duration: 0.25s;
}
.tab:hover {
    color: rgb(149, 188, 250);
}
.tab span {
    display: inline-block;
    margin-top: 5px;
    margin-bottom: 5px;
}
.tab-active {
    color: rgba(100, 149, 237, 1) !important;
    border-bottom: 2px solid rgba(100, 149, 237, 1);
}

.box-shadow-settings {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>