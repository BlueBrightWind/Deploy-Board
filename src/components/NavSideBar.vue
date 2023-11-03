<template>
    <div class="sidenav navbar navbar-vertical navbar-expand-xs navbar-shadow border-0 fixed-start bg-white" id="sidenav-main">
        <div>
            <div class="sidenav-header">
                <i class="fas fa-times p-3 cursor-pointer text-black opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
                <a class="navbar-brand m-0 text-center" href="javascript:;">
                    <span class="ms-1 font-weight-bold text-black nav-title">LinuxDeploy 面板</span>
                </a>
            </div>
            <hr class="horizontal light mt-0 mb-2" />
            <div class="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
                <ul class="navbar-nav">
                    <!-- 导航侧边栏条目 -->
                    <li class="nav-item">
                        <router-link class="nav-link text-black" active-class="bg-purple text-white" :to="{name: 'dashboard'}">
                            <div class="text-black text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="material-icons opacity-9">dashboard</i>
                            </div>
                            <span class="nav-link-text ms-1">面板</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-black" active-class="bg-purple text-white" :to="{name: 'network-monitor'}">
                            <div class="text-black text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="material-icons opacity-9">network_cell</i>
                            </div>
                            <span class="nav-link-text ms-1">流量监控</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-black" active-class="bg-purple text-white" :to="{name: 'task-manager'}">
                            <div class="text-black text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="material-icons opacity-9">call_to_action</i>
                            </div>
                            <span class="nav-link-text ms-1">任务管理器</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-black" active-class="bg-purple text-white" :to="{name: 'web-terminal'}">
                            <div class="text-black text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="material-icons opacity-9">indeterminate_check_box</i>
                            </div>
                            <span class="nav-link-text ms-1">终端</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-black" active-class="bg-purple text-white" :to="{name: 'console-board'}">
                            <div class="text-black text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="material-icons opacity-9">videogame_asset</i>
                            </div>
                            <span class="nav-link-text ms-1">控制台</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-black" active-class="bg-purple text-white" :to="{name: 'user-settings'}">
                            <div class="text-black text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="material-icons opacity-9">settings</i>
                            </div>
                            <span class="nav-link-text ms-1">设置</span>
                        </router-link>
                    </li>
                    <!-- 导航侧边栏条目结束 -->
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "NavSideBar",
    data() {
        return {
            //
        };
    },
    methods: {
        //
    }
};
</script>
<style scoped>
.navbar-vertical .navbar-nav .nav-link {
    color: black;
    transition-duration: 0ms;
}
.g-sidenav-show .sidenav .nav-link-text {
    transition-duration: 0ms;
}
.navbar-vertical.navbar-expand-xs .navbar-nav .nav-link {
    margin-left: 5px;
    margin-right: 5px;
}
.navbar-shadow {
    box-shadow: 3px 0 10px -5px rgba(0, 0, 0, 0.5) !important;
}
.bg-purple {
    background-color: rgb(94, 114, 228) !important;
}
.nav-title {
    font-size: 20px;
    font-family: "Times New Roman", sans-serif;
    color: rgb(94, 114, 228);
}
</style>
