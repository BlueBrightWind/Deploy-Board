<template>
    <div class="navbar navbar-main navbar-expand-lg px-0 shadow-none user-select-none" id="navbarBlur" data-scroll="true">
        <div class="container-fluid py-1 px-3">
            <!-- 当前页面指示 -->
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                    <li class="breadcrumb-item text-sm">
                        <span class="opacity-5 text-dark" href="javascript:;">当前页面</span>
                    </li>
                    <li class="breadcrumb-item text-sm text-dark active" aria-current="page">
                        {{Title}}
                    </li>
                </ol>
                <!-- <h6 class="font-weight-bolder mb-0">{{Title.fullTitle}}</h6> -->
            </nav>
            <!-- 当前页面指示结束 -->
            <!-- 侧边栏开关 -->
            <a href="javascript:;" class="d-xl-none" @click="toggleNavSideBar">
                <div class="sidenav-toggler-inner">
                    <i class="sidenav-toggler-line"></i>
                    <i class="sidenav-toggler-line"></i>
                    <i class="sidenav-toggler-line"></i>
                </div>
            </a>
            <!-- 侧边栏开关结束 -->
        </div>
    </div>
</template>

<script>

export default {
    name: "NavBar",
    props:{
        Title:{
            required:true
        }
    },
    methods: {
        toggleNavSideBar() {
            this.$emit("ToggleNavSideBar");
        }
    }
};
</script>



<style scoped>
</style>