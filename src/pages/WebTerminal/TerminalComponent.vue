<template>
    <div>
        <div ref="terminal" class="terminal">
        </div>
    </div>
</template>

<script>
import "xterm/css/xterm.css";
import axios from "axios";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { AttachAddon } from "xterm-addon-attach";
import { CanvasAddon } from "xterm-addon-canvas";

export default {
    name: "WebTerminal",
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            ip: "10.5.234.127",
            port: 3000,
            terminal: null,
            fitAddon: null,
            socketURL: "",
            socket: null,
            pid: null
        };
    },
    methods: {
        initTerminal() {
            this.terminal = new Terminal({
                fontSize: 17,
                cursorStyle: "bar",
                cursorBlink: true,
                fontFamily: 'Monaco, Consolas, "Courier New", monospace'
            });
            let terminalDom = this.$refs.terminal;
            this.terminal.open(terminalDom);
            this.fitAddon = new FitAddon();
            this.terminal.loadAddon(this.fitAddon);
            this.terminal.loadAddon(new CanvasAddon());
            this.fitAddon.fit();
        },
        initSocket() {
            axios
                .post(`http://${this.ip}:${this.port}/create-terminal`, {
                    cols: this.terminal.cols,
                    rows: this.terminal.rows
                })
                .then((res) => {
                    let processId = res.data;
                    console.log("get processId:", processId);
                    this.pid = processId;
                    this.$emit("UpdateTerminalPid", this.id, this.pid);
                    this.socketURL = `ws://${this.ip}:${this.port}/terminals/${this.pid}`;
                    console.log("open webSocket URL:", this.socketURL);
                    this.socket = new WebSocket(this.socketURL);
                    this.terminal.loadAddon(new AttachAddon(this.socket));
                });
        },
        resizeTerminal() {
            if (!this.pid || this.terminal.rows < 3) {
                return;
            }
            axios.post(`http://${this.ip}:${this.port}/terminal-resize`, {
                cols: this.terminal.cols,
                rows: this.terminal.rows,
                pid: this.pid
            });
        }
    },
    mounted() {
        this.initTerminal();
        this.initSocket();
        let resizeTimeout = null;
        new ResizeObserver(() => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.fitAddon.fit();
                this.resizeTerminal();
            }, 50);
        }).observe(this.$refs.terminal);
    },
    beforeDestroy() {
        this.socket.close();
        // this.terminal.dispose();
    }
};
</script>

<style scoped>
.terminal {
    width: 100%;
    height: 100%;
}
.terminal ::-webkit-scrollbar {
    width: 5px;
}
.terminal ::-webkit-scrollbar-thumb {
    background-color: rgb(170, 170, 170);
    border-radius: 5px;
}
.terminal ::-webkit-scrollbar-thumb:hover {
    background-color: rgb(130, 130, 130);
}
.terminal ::-webkit-scrollbar-thumb:active {
    background-color: rgb(110, 110, 110);
}
.terminal ::-webkit-scrollbar-track {
    background-color: white;
}
</style>
