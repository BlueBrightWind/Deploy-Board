<template>
    <main class="main-content position-relative max-height-vh-100 h-100">
        <!-- 导航栏 -->
        <NavBar @ToggleNavSideBar="toggleNavSideBar" :Title="Title"></NavBar>
        <!-- 导航栏结束 -->
        <!-- 主页面内容 -->
        <div class="container-fluid mx-auto">
            <div class="col-12 col-xl-11 mx-auto bg-white border-radius-lg box-shadow-console pt-1 mt-4 box-shadow-settings">
                <div class="card-body px-0">
                    <div class="table-responsive p-0">
                        <table class="table align-items-center mb-0 width-100">
                            <thead>
                                <tr>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder col-2 col-md-1">
                                        <a href="javascript:;" :class="TaskSortState.type=='PID'?'text-danger':''" @click="changeTaskSortState('PID')">PID</a>
                                        <span v-show="TaskSortState.type=='PID'&&TaskSortState.state=='down'" class="material-icons text-xxs">keyboard_arrow_down</span>
                                        <span v-show="TaskSortState.type=='PID'&&TaskSortState.state=='up'" class="material-icons text-xxs">keyboard_arrow_up</span>
                                    </th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder col-2 col-md-1">
                                        <a href="javascript:;" :class="TaskSortState.type=='CPU'?'text-danger':''" @click="changeTaskSortState('CPU')">CPU</a>
                                        <span v-show="TaskSortState.type=='CPU'&&TaskSortState.state=='down'" class="material-icons text-xxs">keyboard_arrow_down</span>
                                        <span v-show="TaskSortState.type=='CPU'&&TaskSortState.state=='up'" class="material-icons text-xxs">keyboard_arrow_up</span>
                                    </th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder col-2 col-md-1">
                                        <a href="javascript:;" :class="TaskSortState.type=='Memory'?'text-danger':''" @click="changeTaskSortState('Memory')">内存</a>
                                        <span v-show="TaskSortState.type=='Memory'&&TaskSortState.state=='down'" class="material-icons text-xxs">keyboard_arrow_down</span>
                                        <span v-show="TaskSortState.type=='Memory'&&TaskSortState.state=='up'" class="material-icons text-xxs">keyboard_arrow_up</span>
                                    </th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder col-3 col-md-7">
                                        <a href="javascript:;" :class="TaskSortState.type=='Command'?'text-danger':''" @click="changeTaskSortState('Command')">进程指令</a>
                                        <span v-show="TaskSortState.type=='Command'&&TaskSortState.state=='down'" class="material-icons text-xxs">keyboard_arrow_down</span>
                                        <span v-show="TaskSortState.type=='Command'&&TaskSortState.state=='up'" class="material-icons text-xxs">keyboard_arrow_up</span>
                                    </th>
                                    <th class="text-secondary col-3 col-md-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="task in taskInfo" :key="task.PID">
                                    <td class="align-middle text-center text-sm">
                                        <span class="text-xs mb-0">{{task.PID}}</span>
                                    </td>
                                    <td class="align-middle text-center text-sm" :class="{'task-level-1':(1<=task.CPU&&task.CPU<10),
                                                'task-level-2':(10<=task.CPU&&task.CPU<25),
                                                'task-level-3':(25<=task.CPU&&task.cpu<50),
                                                'task-level-4':(50<=task.CPU)}">
                                        <span class="text-xs mb-0">{{task.CPU}}</span>
                                    </td>
                                    <td class="align-middle text-center text-sm" :class="{'task-level-1':(1<=task.CPU&&task.CPU<10),
                                                'task-level-2':(10<=task.CPU&&task.CPU<25),
                                                'task-level-3':(25<=task.CPU&&task.cpu<50),
                                                'task-level-4':(50<=task.CPU)}">
                                        <span class="text-xs mb-0">{{task.Memory}}</span>
                                    </td>
                                    <td class="align-middle text-sm">
                                        <span class="text-xs mb-0 command">{{task.Command}}</span>
                                        <span class="material-icons text-sm content" @click="copyCommand(task.Command)">content_paste</span>
                                        <span class="text-xs command-full">{{task.Command}}</span>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <a href="javascript:;" class="badge badge-sm rounded-1 bg-gradient-danger text-white" @click="endProcess(task.PID, task.Command)">结束进程</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
        <Transition name="fade-confirm-box">
            <div v-show="EndProcess.show" class="confirm-content">
                <div class="confirm-title">是否结束该进程？</div>
                <div class="confirm-task-info">
                    <div class="task-info">
                        <span class="task-info-title">pid:</span>
                        <span class="task-info-content">{{EndProcess.pid}}</span>
                    </div>
                    <div class="task-info">
                        <span class="task-info-title">指令:</span>
                        <span class="task-info-content">{{EndProcess.command}}</span>
                    </div>
                </div>
                <div class="confirm-board">
                    <a href="javascript:;" class="badge badge-sm text-white" @click="confirmEndProcess">确认</a>
                    <a href="javascript:;" class="badge badge-sm text-white" @click="cancelEndProcess">取消</a>
                </div>

            </div>
        </Transition>
        <div v-show="EndProcess.show" class="confirm-hide-mask" @click="cancelEndProcess"></div>
        <!-- 主页面内容结束 -->
    </main>
</template>

<script>
import axios from "axios";
import NavBar from "../components/NavBar.vue";

// 注册组件
export default {
    name: "TaskManager",
    components: {
        NavBar
    },
    data() {
        return {
            // 必须项，设置导航栏标题
            Title: "进程管理",
            TaskList: [],
            TaskSortState: {
                type: "PID",
                state: "down"
            },
            EndProcess: {
                pid: null,
                command: null,
                show: false
            },
            Timer: null
        };
    },
    computed: {
        taskInfo() {
            let info = this.TaskList;
            if (this.TaskSortState.type == "CPU")
                info.sort((a, b) => {
                    if (this.TaskSortState.state == "up") return a.CPU - b.CPU;
                    else if (this.TaskSortState.state == "down")
                        return b.CPU - a.CPU;
                });
            else if (this.TaskSortState.type == "Memory")
                info.sort((a, b) => {
                    if (this.TaskSortState.state == "up")
                        return a.Memory - b.Memory;
                    else if (this.TaskSortState.state == "down")
                        return b.Memory - a.Memory;
                });
            else if (this.TaskSortState.type == "PID")
                info.sort((a, b) => {
                    if (this.TaskSortState.state == "up") return b.PID - a.PID;
                    else if (this.TaskSortState.state == "down")
                        return a.PID - b.PID;
                });
            else if (this.TaskSortState.type == "Command")
                info.sort((a, b) => {
                    if (this.TaskSortState.state == "down") {
                        if (a.Command < b.Command) {
                            return -1;
                        } else if (a.Command > b.Command) {
                            return 1;
                        } else {
                            return 0;
                        }
                    } else if (this.TaskSortState.state == "up") {
                        if (a.Command < b.Command) {
                            return 1;
                        } else if (a.Command > b.Command) {
                            return -1;
                        } else {
                            return 0;
                        }
                    }
                });
            return info;
        }
    },
    methods: {
        // 必须项，切换侧边栏
        toggleNavSideBar() {
            this.$emit("ToggleNavSideBar");
        },
        getTaskList() {
            axios
                .get("http://192.168.31.221:8000/task-manager")
                .then((response) => {
                    if (response.data.success == false) return;
                    let data = response.data.data;
                    this.TaskList = data;
                });
        },
        changeTaskSortState(type) {
            if (this.TaskSortState.type == type)
                this.TaskSortState.state =
                    this.TaskSortState.state == "down" ? "up" : "down";
            else {
                this.TaskSortState.type = type;
                this.TaskSortState.state = "down";
            }
        },
        copyCommand(cmd) {
            navigator.clipboard.writeText(cmd);
        },
        endProcess(pid, command) {
            this.EndProcess.pid = pid;
            this.EndProcess.command = command;
            this.EndProcess.show = true;
        },
        confirmEndProcess() {
            axios
                .post("http://192.168.31.221:8000/kill-task", {
                    pid: this.EndProcess.pid
                })
                .then((response) => {
                    if (response.data.success == true) {
                        console.log("kill success");
                        this.getTaskList();
                    }
                });
            // this.EndProcess.pid = null;
            // this.EndProcess.command = null;
            this.EndProcess.show = false;
        },
        cancelEndProcess() {
            // this.EndProcess.pid = null;
            // this.EndProcess.command = null;
            this.EndProcess.show = false;
        }
    },
    mounted() {
        this.getTaskList();
        this.Timer = setInterval(() => {
            this.getTaskList();
        }, 1000);
    },
    beforeDestroy() {
        clearInterval(this.Timer);
    }
};
</script>

<style scoped>
.table-responsive {
    overflow: visible;
}
table {
    table-layout: fixed !important;
    width: 100%;
}
table thead tr th {
    color: rgb(51, 72, 102) !important;
}
table thead tr th a:hover {
    color: inherit;
    text-decoration: none;
}
table tbody tr td {
    position: relative;
    color: rgb(51, 72, 102) !important;
}
table tbody .command {
    display: block;
    width: calc(100% - 20px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
table tbody .command-full {
    opacity: 0;
    pointer-events: none;
    position: absolute;
    width: 100%;
    top: 0;
    transform: translateY(-100%);
    white-space: normal;
    overflow-wrap: break-word;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    z-index: 2;
    min-height: 50px;
    padding: 10px;
}
table tbody .content:hover ~ .command-full {
    opacity: 1;
}
table tbody .content {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.5;
    cursor: pointer;
}
table tbody .content:hover {
    opacity: 1;
}

.task-level-1 {
    background-color: rgb(198, 235, 255);
}
.task-level-2 {
    background-color: rgb(130, 212, 255);
}
.task-level-3 {
    background-color: rgb(0, 176, 255);
}
.task-level-4 {
    background-color: rgb(0, 140, 204);
}

.confirm-content {
    width: 50%;
    min-width: 400px;
    max-width: 600px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 30px;
    padding-right: 30px;
    top: 50px;
    left: calc(50% + 125px);
    transform: translate(-50%, 0);
    position: fixed;
    background-color: rgb(250, 250, 250);
    z-index: 2;
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    user-select: none;
}
@media (max-width: 1200px) {
    .confirm-content {
        left: 50%;
    }
}

.confirm-content .confirm-title {
    color: black;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
}
.confirm-content .confirm-task-info {
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
}
.confirm-content .task-info {
    white-space: nowrap;
    margin-bottom: 5px;
}
.confirm-content .task-info-title {
    display: block;
    float: left;
    color: black;
    font-size: 13px;
    margin-right: 10px;
}
.confirm-content .task-info-content {
    display: block;
    color: black;
    font-size: 13px;
    margin-right: 10px;
    white-space: normal;
    overflow-wrap: break-word;
    margin-right: 0;
}
.confirm-content .confirm-board {
    display: flex;
    justify-content: center;
}
.confirm-content a {
    width: 70px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.confirm-content a:first-child {
    margin-right: 100px;
    background-color: rgb(224, 66, 66);
    border-radius: 2px;
    transition-duration: 0.25s;
    font-size: 14px;
}
.confirm-content a:first-child:hover {
    background-color: rgb(240, 100, 100);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
.confirm-content a:last-child {
    background-color: rgb(96, 151, 235);
    border-radius: 2px;
    transition-duration: 0.25s;
    font-size: 14px;
}
.confirm-content a:last-child:hover {
    background-color: rgb(128, 172, 239);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.fade-confirm-box-enter-active,
.fade-confirm-box-leave-active {
    transition-duration: 0.25s;
}
.fade-confirm-box-enter,
.fade-confirm-box-leave-to {
    opacity: 0;
}

.confirm-hide-mask {
    width: 100%;
    height: 100%;
    top: 0;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
}

.box-shadow-settings {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>