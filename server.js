const os = require('os')
const pty = require('node-pty')
const express = require('express')
const expressWs = require('express-ws')
const USE_BINARY = os.platform() !== "win32";
const TERMINAL_PORT = 3000

const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const terminals = {}, logs = {}

expressWs(app)

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Content-Type', 'application/json;charset=utf-8')
    next()
})

//定义通信接口
app.post('/create-terminal', (req, res) => {
    const env = Object.assign({}, process.env)
    let cols = parseInt(req.body.cols)
    let rows = parseInt(req.body.rows)
    let term = pty.spawn(process.platform === 'win32' ? 'cmd.exe' : 'bash', [], {
        name: 'xterm-256color',
        cols: cols || 80,
        rows: rows || 24,
        cwd: env.PWD,
        env: env,
        encoding: 'utf8'
    })
    console.log('Created terminal with PID: ' + term.pid)
    terminals[term.pid] = term
    logs[term.pid] = ''
    term.onData((data) => {
        logs[term.pid] += data
    })
    res.send(term.pid.toString())
    res.end()
})

//resize时，发送的接口，调用resize方法
app.post('/terminal-resize', (req, res) => {
    let pid = parseInt(req.body.pid)
    let cols = parseInt(req.body.cols)
    let rows = parseInt(req.body.rows)
    let term = terminals[pid]

    term.resize(cols, rows)
    console.log(`Resized terminal ${pid} to ${cols} cols and ${rows} rows.`)
    res.end()
})

//建立websocket
app.ws('/terminals/:pid', function (ws, req) {
    const term = terminals[parseInt(req.params.pid)]
    console.log('Connected to terminal ' + term.pid)
    ws.send(logs[term.pid])

    const send = USE_BINARY ? bufferUtf8(ws, 5) : buffer(ws, 5);

    term.on('data', function (data) {
        try {
            send(data);
        } catch (ex) {
            // The WebSocket is not open, ignore
        }
    })

    ws.on('message', function (msg) {
        term.write(msg);
    })

    ws.on('close', function () {
        term.kill();
        console.log('Closed terminal ' + term.pid);
        // Clean things up
        delete terminals[term.pid];
        delete logs[term.pid];
    })

})

const host = os.platform() === 'win32' ? '127.0.0.1' : '0.0.0.0';

console.log('App listening to http://127.0.0.1:' + TERMINAL_PORT);
app.listen(TERMINAL_PORT, host);
console.log("wss linsting on " + TERMINAL_PORT)

// string message buffering
function buffer(socket, timeout) {
    let s = ''
    let sender = null
    return (data) => {
        s += data
        if (!sender) {
            sender = setTimeout(() => {
                socket.send(s)
                process.stdout.write(s)
                s = ''
                sender = null
            }, timeout)
        }
    }
}

// binary message buffering
function bufferUtf8(socket, timeout) {
    let buffer = []
    let sender = null
    let length = 0
    return (data) => {
        buffer.push(data)
        length += data.length
        if (!sender) {
            sender = setTimeout(() => {
                socket.send(Buffer.concat(buffer, length))
                buffer = []
                sender = null
                length = 0
            }, timeout)
        }
    }
}
