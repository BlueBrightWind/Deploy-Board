<template>
    <div class="g-sidenav-show" :class="NavSideBarShow?'g-sidenav-pinned':''">
        <!-- 侧边栏 -->
        <NavSideBar></NavSideBar>
        <!-- 侧边栏结束 -->
        <!-- 主页面 -->
        <keep-alive>
            <router-view @ToggleNavSideBar="toggleNavSideBar"></router-view>
        </keep-alive>
        <!-- 主页面结束 -->
        <!-- 遮挡层 -->
        <div class="sidenav-mask" :class="NavSideBarShow?'':'sidenav-mask-hide'" @click="toggleNavSideBar"></div>
        <!-- 遮挡层结束 -->
    </div>
</template>

<script>
import NavSideBar from "./components/NavSideBar.vue";

// 注册组件
export default {
    name: "App",
    components: {
        NavSideBar,
    },
    data() {
        return {
            NavSideBarShow: false
        }
    },
    methods: {
        toggleNavSideBar() {
            this.NavSideBarShow = !this.NavSideBarShow;
        }
    }
};
</script>

<style scoped>
/* 遮罩层 */
.sidenav-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 3;
}
.sidenav-mask-hide {
    display: none;
}
/* 主页面左侧外边距 */
.sidenav.fixed-start+.main-content{
    margin-left: 15.625rem;
}
</style>
