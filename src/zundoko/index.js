'use strict';
const {app, BrowserWindow, ipcMain, dialog, nativeImage} = require('electron')
const _ = require('lodash/core');

class ZundokoList {
    constructor() {
        this.list = []
        this.finish = ['ズン', 'ズン', 'ズン', 'ズン', 'ドコ']
    }

    push(value) {
        this.list.push(value)
    }

    clear() {
        this.list = []
    }

    isFinish() {
        let target = this.list.slice();
        while (target.length >= 5) {
            if (_.isEqual(target, this.finish)) {
                return true
            }
            target.shift()
        }
        return false
    }
}

const zundoko = {
    window: null,
    zundokoList: new ZundokoList(),
    onZun() {
        this.zundokoList.push('ズン')
    },
    onDoko() {
        this.zundokoList.push('ドコ')
        if (this.zundokoList.isFinish())
            this.finish()
    },
    onClear() {
        this.zundokoList.clear()
    },
    finish() {
        let res = dialog.showMessageBox(this.window, {
            type: 'none',
            buttons: [
                'はじめから', 'もういい'
            ],
            defaultId: 0,
            cancelId: 1,
            message: 'キ・ヨ・シ！'
        })
        if (res === 0)
            this.restart()
        else
            app.quit()
    },
    start() {
        let main = this.window = new BrowserWindow({
            width: 1000,
            height: 800,
            title: 'zundoko',
            webPreferences: {
                nodeIntegration: true
            }
        })
        main.loadURL(`file://${process.cwd()}/src/renderer/zundoko.html`)
        this.listen()
    },
    listen() {
        ipcMain.on('zun', () => this.onZun())
        ipcMain.on('doko', () => this.onDoko())
        ipcMain.on('clear', () => this.onClear())
    },
    restart() {
        this.window.webContents.send('reset')
        this.zundokoList = new ZundokoList()
    }
}
module.exports = zundoko;
