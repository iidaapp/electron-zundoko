'use strict';
class Piano {
    constructor() {
        this.scales = {
            'c4': 262.8147724156,
            'd4': 294.99960777158,
            'e4': 331.12586398975,
            'f4': 350.81563248497,
            'g4': 393.77723341803,
            'a4': 442,
            'b4': 496.12822535274,
            'c5': 525.6295448312,
            'd5': 589.99921554316,
            'e5': 662.25172797949
        }
    }

    play(scale, length) {
        if (!this.scales[scale]) {
            throw 'There is no scale...'
        }
        let AudioContext = window.AudioContext
        let ctx = new AudioContext()
        let oscillator = ctx.createOscillator()
        oscillator.frequency.value = this.scales[scale];
        oscillator.connect(ctx.destination);
        oscillator.start()
        setTimeout(() => {
            oscillator.stop()
        }, length)
    }

    rest(length) {
        setTimeout(() => {}, length)
    }
}

const piano = new Piano()
const zundoko = () => {
    Promise.resolve()
        .then(() => piano.play('e4', 400))
        .then(() => piano.play('e4', 400))
        .then(() => piano.play('e4', 400))
        .then(() => piano.play('e4', 400))
}
const kiyoshi = document.getElementById('kiyoshi')
kiyoshi.addEventListener('click', (e) => zundoko())
