'use strict';

import {Howl}        from 'howler';


const currentlyPlaying = {
    sound: null
};


// this is the first sound that gets played, so we pre-load it
const moveHumanSound = (new Howl({
        urls: ['wood-knock.mp3'],
        sprite: {
            all: [0, 100]
        },
        volume: 0.6       
})).load();

function moveHuman() {
    moveHumanSound.play('all');
}

function moveAI() {
    (new Howl({
        urls: ['chess-piece-on-alabaster.wav'],
        sprite: {
            all: [0, 100]
        },
        volume: 7
    })).play('all');
}
/*
 Only the defeat and victory fanfares are long enough to warrant placing them
 in the 'currentlyPlaying' object.
*/
function defeat() {
    currentlyPlaying.sound = 
        new Howl({
            urls: ['game-over-sad.ogg'],
            sprite: {
                all: [0, 21000]
            },
            volume: 1
        });
    currentlyPlaying.sound.play('all');
}
function victory() {
    currentlyPlaying.sound = 
        new Howl({
            urls: ['victory.wav'],
            sprite: {
                all: [0, 18470]
            },
            volume: 1
        });
    currentlyPlaying.sound.play('all');
}
function newGame() {
    (new Howl({
        urls: ['check-alarm.ogg'],
        sprite: {
            all: [0, 1706]
        },
        volume: 1
    })).play('all');
}
/*
function drop(dropHeight) {

    function heightToVolume(dropHeight) {
        if (dropHeight > 13)
            return 4;
        if (dropHeight > 10)
            return 3.5;
        if (dropHeight > 8)
            return 2.5;
        return 2;
    }
    
    const volume = heightToVolume(dropHeight);
    (new Howl({
        urls: ['drop.mp3'],
        sprite: {
            all: [0, 200]
        },
        volume: volume
    })).play('all');
}

function annihilate(n) {
    (new Howl({
        urls: ['annihilate.mp3'],
        sprite: {
            all: [0, 100+(n-1)*70+(n*n*6)]
        },
        volume: 1+(n*n)/4
    })).play('all');
}

function cashRegister(n) {
    const duration = 300;
    function playSoundOuter (times){
        if (times>0)
            playSound();
        window.setTimeout(()=>{playSoundOuter(times-1);}, duration);
    }
    function playSound (){
        (new Howl({
            urls: ['cash-register.mp3'],
            sprite: {
                all: [100, 500]
            },
            volume: 0.3+n/4
        })).play('all');
    }
    playSoundOuter(n);
}

function swoosh() {
    (new Howl({
        urls: ['swoosh.mp3'],
        sprite: {
            all: [0, 150]
        },
        volume: 1
    })).play('all');
}

function swooshAndThud(dropN) {
    if (dropN>=4) {
        this.swoosh();
        window.setTimeout( ()=> {
            drop(dropN);
        }, 300);
    } else
        drop(dropN);
}
*/
const rv = {
    currentlyPlaying: currentlyPlaying,
    moveHuman: moveHuman,
    moveAI: moveAI,
    defeat: defeat,
    victory:victory,
    newGame:newGame
};

exports.sounds = rv;
