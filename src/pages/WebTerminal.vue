<template>
    <main class="main-content position-relative max-height-vh-100 h-100 my-content">
        <!-- 导航栏 -->
        <NavBar @ToggleNavSideBar="toggleNavSideBar" :Title="Title"></NavBar>
        <!-- 导航栏结束 -->
        <!-- 主页面内容 -->
        <div class="container-fluid mx-auto">
            <div class="col-12 col-xl-10 mx-auto bg-white border-radius-sm box-shadow-console pt-1 mt-4 box-shadow-settings">
                <div class="terminals">
                    <div class="titles">
                        <div class="terminal-title right-split"><span class="title-name">终端 1</span><span class="material-icons close-btn">cancel</span></div>
                        <div class="terminal-title "><span class="title-name">终端 2</span><span class="material-icons close-btn">cancel</span></div>
                        <div class="terminal-title active"><span class="title-name">终端 3</span><span class="material-icons close-btn">cancel</span></div>
                        <div class="add-terminal"><span class="material-icons add-btn">add</span></div>
                    </div>
                    <Terminal class="terminal-board"></Terminal>
                </div>
            </div>
        </div>
        <!-- 主页面内容结束 -->
    </main>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import Terminal from "./WebTerminal/TerminalComponent.vue";

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
            }
        };
    },
    methods: {
        // 必须项，切换侧边栏
        toggleNavSideBar() {
            this.$emit("ToggleNavSideBar");
        }
    },
    mounted() {},
    beforeDestroy() {}
};
</script>

<style scoped>
.terminals {
    padding-top: 2px;
    padding-left: 7px;
    padding-right: 7px;
}

.terminals .titles {
    height: 40px;
    margin-bottom: 5px;
    background-color: rgb(240, 240, 240);
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
}
.terminals .titles::-webkit-scrollbar {
    height: 5px;
}
.terminals .titles::-webkit-scrollbar-thumb {
    background-color: rgb(170, 170, 170);
    border-radius: 6px;
}
.terminals .titles::-webkit-scrollbar-thumb:hover {
    background-color: rgb(130, 130, 130);
}
.terminals .titles::-webkit-scrollbar-thumb:active {
    background-color: rgb(110, 110, 110);
}
.terminals .titles::-webkit-scrollbar-track {
    background-color: white;
}

.terminals .titles .terminal-title {
    max-width: 200px;
    min-width: 150px;
    height: 100%;
    padding-left: 10px;
    padding-right: 10px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    cursor: default;
    position: relative;
}
.terminals .titles .terminal-title:hover {
    background-color: rgb(245,245,245);
}
.terminals .titles .terminal-title.active {
    background-color: rgb(255, 255, 255);
    color: rgb(105, 192, 255);
}
.terminals .titles .terminal-title.right-split::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    height: 20px;
    width: 1px; /* 线的宽度 */
    background-color: rgb(114, 114, 114); /* 线的颜色 */
}

.terminals .titles .terminal-title .title-name {
    font-size: 14px;
    flex-grow: 1;
}
.terminals .titles .terminal-title .close-btn {
    display: block;
    opacity: 0.3;
    font-size: 15px;
    user-select: none;
    text-align: right;
    width: 15px;
    color: #7b809a;
}
.terminals .titles .terminal-title .close-btn:hover {
    opacity: 0.8;
}

.terminals .titles .add-terminal {
    min-width: 25px;
    padding-left: 5px;
    height: 100%;
    flex-grow: 1;
    display: flex;
    align-items: center;
    background-color: #fff;
    cursor: default;
}
.terminals .titles .add-terminal .add-btn {
    user-select: none;
    color: #7b809a;
}
.terminals .titles .add-terminal .add-btn:hover {
    color: rgb(80, 80, 80);
}

.terminals .terminal-board {
    height: 600px;
}
</style>