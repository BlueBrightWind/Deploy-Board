<template>
    <main class="main-content position-relative max-height-vh-100 h-100 my-content">
        <!-- 导航栏 -->
        <NavBar @ToggleNavSideBar="toggleNavSideBar" :Title="Title"></NavBar>
        <!-- 导航栏结束 -->
        <!-- 主页面内容 -->
        <div class="container-fluid mx-auto">
            <div class="col-12 col-xl-10 mx-auto bg-white border-radius-sm box-shadow-console pb-1 mt-4 box-shadow-settings">
                <div class="terminals">
                    <div class="titles">
                        <div class="add-terminal"><span class="material-icons add-btn" @click="addTerminal">add</span></div>
                        <div v-for="(terminal, index) in Terminals" :key="terminal.id" class="terminal-title" :class="terminal.style" @mousedown="activateTerminal(index)">
                            <span class="title-name">Terminal PID: {{terminal.pid}}</span><span class="material-icons close-btn" @mousedown.stop @click.stop="delTerminal(index)">cancel</span>
                        </div>
                    </div>
                    <div class="boards">
                        <div class="blank">新建终端以进行操作</div>
                        <Terminal v-for="terminal in Terminals" :key="terminal.id" class="terminal-board" :class="terminal.style.active?'active':''" :id="terminal.id" @UpdateTerminalPid="updateTerminalPid"></Terminal>
                    </div>
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
            Title: "终端",
            ActiveTerminal: -1,
            NewTerminalNum: 0,
            Terminals: []
        };
    },
    methods: {
        // 必须项，切换侧边栏
        toggleNavSideBar() {
            this.$emit("ToggleNavSideBar");
        },
        addTerminal() {
            this.Terminals.push({
                id: this.NewTerminalNum,
                pid: -1,
                style: {
                    active: false,
                    "right-split": false
                }
            });
            this.ActiveTerminal = this.Terminals.length - 1;
            this.NewTerminalNum++;
        },
        delTerminal(index) {
            this.Terminals.splice(index, 1);
            if (this.ActiveTerminal >= index) this.ActiveTerminal--;
            if (this.ActiveTerminal < 0 && this.Terminals.length > 0) {
                this.ActiveTerminal = 0;
                this.updateTerminalStyle(0);
            }
        },
        activateTerminal(index) {
            this.ActiveTerminal = index;
        },
        updateTerminalPid(id, pid) {
            this.Terminals.forEach((terminal) => {
                if (terminal.id === id) {
                    terminal.pid = pid;
                    return;
                }
            });
        },
        updateTerminalStyle(val) {
            this.Terminals.forEach((terminal, index) => {
                terminal.style["right-split"] = false;
                if (index === val) terminal.style.active = true;
                else terminal.style.active = false;
                if (
                    index != val - 1 &&
                    index != val &&
                    index != this.Terminals.length - 1
                )
                    terminal.style["right-split"] = true;
            });
        }
    },
    watch: {
        ActiveTerminal(val) {
            if (val < 0) return;
            this.updateTerminalStyle(val);
        }
    },
    mounted() {
        this.addTerminal();
    },
    beforeDestroy() {}
};
</script>

<style scoped>
.terminals {
    padding-top: 2px;
    padding-left: 7px;
    padding-right: 7px;
    width: 100%;
    height: 80vh;
}

.terminals .titles {
    height: 40px;
    /* margin-bottom: 5px; */
    background-color: rgb(255, 255, 255);
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
    color: rgb(25, 25, 25);
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
    user-select: none;
}
.terminals .titles .terminal-title:hover {
    background-color: rgb(243, 243, 243);
}
.terminals .titles .terminal-title.active {
    background-color: rgb(235, 235, 235);
    color: rgb(80, 182, 255);
    box-shadow: 0 0 3px rgb(200, 200, 200);
    border-radius: 4px 4px 0 0;
}
.terminals .titles .terminal-title.right-split::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    height: 20px;
    width: 1px; /* 线的宽度 */
    background-color: rgb(150, 150, 150); /* 线的颜色 */
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
    min-width: 45px;
    width: 45px;
    padding-left: 5px;
    padding-right: 5px;
    height: 100%;
    /* flex-grow: 1; */
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(255, 255, 255);
    cursor: default;
}
.terminals .titles .add-terminal .add-btn {
    user-select: none;
    color: #7b809a;
    line-height: 30px;
    width: 30px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
}
.terminals .titles .add-terminal .add-btn:hover {
    color: rgb(80, 80, 80);
    background-color: rgb(238, 238, 238);
}

.terminals .boards {
    height: calc(100% - 40px);
    position: relative;
}
.terminals .boards .blank {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
}
.terminals .terminal-board {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 1;
}
.terminals .terminal-board.active {
    z-index: 2 !important;
}
</style>

<style scoped>
.box-shadow-settings {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>