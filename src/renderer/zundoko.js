'use strict';
const {ipcRenderer} = require('electron')

const zun = document.getElementById('zun')
const doko = document.getElementById('doko')
const clear = document.getElementById('clear')
const target = document.getElementById('contents')

zun.addEventListener('click', (e) => {
    target.textContent += 'ズン'
    ipcRenderer.send('zun')
})
doko.addEventListener('click', (e) => {
    target.textContent += 'ドコ'
    ipcRenderer.send('doko')
})
clear.addEventListener('click', (e) => {
    target.textContent = ''
    ipcRenderer.send('clear')
})

ipcRenderer.on('reset', () => {
    target.textContent = ''
})
