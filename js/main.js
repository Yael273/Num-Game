'use strict'

var gBoard
var gNums
var gRange
var size = 4
var gSize = size ** 2
var numToClick = 0;
var stopwch

gNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]

function onInit() {
    numToClick = 0
    resetNums()
    gBoard = createBoard()
    renderBoard(gBoard)
    clearInterval(stopwch);
}

console.table(createBoard())

function createBoard() {

    var board = []
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i][j] = gNums.splice(getRandomInt(0, gNums.length), 1)[0]
        }
    }
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]
            strHTML += `<td class="${currCell} btnboard" onClick="cellClicked(this)">${currCell}</td>`
        }
        strHTML += `</tr>`
    }

    var elBoard = document.querySelector('tbody')
    elBoard.innerHTML = strHTML
}

function cellClicked(clickedNum) {

    var elHeader = document.querySelector('h1')
    var elTimer = document.querySelector('.time')
    // var elNewGame = document.querySelector('button')

    if (parseInt(clickedNum.classList[0]) === (numToClick + 1)) {
        clickedNum.style.backgroundColor = 'darkcyan'
        clickedNum.style.transition = '0.5s'
        elHeader.style.color = 'darkcyan'
        elTimer.style.color = 'darkcyan'
        numToClick++;
        // elNewGame.style.backgroundColor = 'darkcyan'

    }
    if (numToClick === 1) {
        var start = Date.now();
        stopwch = setInterval(function () {
            createTime(Date.now() - start)
        }, 1);
    }
    if (numToClick === gSize) {
        stopwch = clearInterval(stopwch)
    }

}

function createTime(timeInMilliseconds) {
    var time = new Date(timeInMilliseconds)
    var mins = time.getMinutes().toString()
    var secs = time.getSeconds().toString()
    var milliSec = (time.getMilliseconds() / 1).toFixed(0)

    if (mins.length < 2) { mins = '0' + mins; }
    if (secs.length < 2) { secs = '0' + secs; }
    if (milliSec.length < 2) { milliSec = '0' + milliSec; }

    var elTime = document.querySelector('.time')
    elTime.innerHTML = mins + ':' + secs + ':' + milliSec
}


function newGame() {
    var elHeader = document.querySelector('h1')
    var elTime = document.querySelector('.time')
    // var elNewGame = document.querySelector('button')
    // var elLevel = document.querySelector('.btn')
    elTime.innerText = '00:00:00'
    elTime.style.color = 'rgb(131, 198, 170)'
    elHeader.style.color = 'rgb(131, 198, 170)'
    // elNewGame.style.backgroundColor = 'rgb(131, 198, 170)'
    // elLevel.style.backgroundColor = 'rgb(131, 198, 170)'
    clearInterval(stopwch);
    onInit()
}

function setLevel(btnlevel) {
    gSize = parseInt(btnlevel.classList[0])
    size = Math.sqrt(gSize)
    clearInterval(stopwch);
    newGame()
}

function resetNums() {
    gNums = []
    for (var i = 1; i <= gSize; i++) {
        gNums.push(i)
    }
}


function getRandomInt(min, max) {
    var min = Math.ceil(min)
    var max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

