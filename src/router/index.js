import VueRouter from 'vue-router'
import DashBoard from '../pages/DashBoard.vue'
import TaskManager from '../pages/TaskManager.vue'
import ConsoleBoard from "../pages/ConsoleBoard.vue"
import UserSettings from '../pages/UserSettings.vue'
import SystemCmdSettings from '../pages/UserSettings/SystemCmdSettings.vue'
import PathSettings from '../pages/UserSettings/PathSettings.vue'

export default new VueRouter({
    routes: [
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashBoard,
        },
        {
            path: '/console-board',
            name: 'console-board',
            component: ConsoleBoard,
        },
        {
            path: '/task-manager',
            name: 'task-manager',
            component: TaskManager,
        },
        {
            path: '/user-settings',
            name: 'user-settings',
            redirect: '/user-settings/system-cmd-settings',
            component: UserSettings,
            children: [
                {
                    path: 'system-cmd-settings',
                    name: 'system-cmd-settings',
                    component: SystemCmdSettings,
                },
                {
                    path: 'path-settings',
                    name: 'path-settings',
                    component: PathSettings,
                }
            ]
        }
    ]
});