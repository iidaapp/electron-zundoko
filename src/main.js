'use strict';

const app = require('electron').app
const zundoko = require('./zundoko')

app.on('ready', () => zundoko.start())
