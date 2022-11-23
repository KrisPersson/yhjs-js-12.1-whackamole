const allHoles = document.querySelectorAll('main article');
const bodyEl = document.querySelector('body')


const gameState = {
    timeBetweenPopUps: 2000,
    appearanceTime: 800,
    totalTime: 60,
    currentTime: 0,
    currentHole: null,
    molesWhacked: 0,
    playerName: '',
    highscore: [
        {
         name: 'Sven-Dennis',
         points: 20
        },
        {
         name: 'Ada',
         points: 18
        },
        {
         name: 'Gunlög',
         points: 15
        },
        {
         name: 'Zlatan',
         points: 12
        },
        {
         name: 'Ove Molin',
         points: 11
        },
        {
         name: 'Lewis E Carroll',
         points: 10
        }
     ]
}

// Append listener
allHoles.forEach(hole => {
    hole.addEventListener('click', clickHandler)
})

function clickHandler(e) {

    let whackedHole = e.target.getAttribute('data-id');
    if(parseInt(whackedHole) === gameState.currentHole) {
        // Hit!
        // +1 on score
        gameState.molesWhacked++

        // Update whacked moles gui
        document.querySelector('.moleswhacked b').innerHTML = gameState.molesWhacked;

        // add class to show hit
        document.querySelector(`[data-id="${whackedHole}"]`).classList.add('hit');
        setTimeout(() => {
            document.querySelector(`[data-id="${whackedHole}"]`).classList.remove('hit');
        }, gameState.appearanceTime);
    }

}

function startGame() {

    gameState.molesWhacked = 0
    gameState.currentHole = null
    gameState.currentTime = gameState.totalTime
    renderHighscore()

    let gameLoop = setInterval(() => {


        // Empty holes
        allHoles.forEach(hole => hole.classList.remove('mole'));

        // Pick random hole to pop up
        let randomId = Math.floor(Math.random() * allHoles.length);
        
        // register as current Hole
        gameState.currentHole = randomId;

        let el = document.querySelector(`[data-id="${randomId}"]`);
        el.classList.add('mole');

        // Just make the apperance short
        setTimeout(() => {

            allHoles.forEach(hole => hole.classList.remove('mole'));
            gameState.currentHole = null

        }, gameState.appearanceTime)
    }, gameState.timeBetweenPopUps);


    let timer = setInterval(() => {
        // Check if time left
        if(gameState.currentTime >= 0) {

        // Update timer in gui
        document.querySelector('.timeleft b').innerHTML = `${gameState.currentTime}s`;

        // count down current time
        gameState.currentTime--;

    } else {
        // Game over
        clearInterval(timer)
        clearInterval(gameLoop)

    
        alert(`You whacked ${gameState.molesWhacked} moles in ${gameState.totalTime} sec.`)
        submitHighscore(gameState.playerName, gameState.molesWhacked)
        renderHighscore()
        renderGameEndScreen()
        
    }
    }, 1000);


}

function submitHighscore(name, score) {
    let newArr = [...gameState.highscore]

    if (newArr.length < 10) {
        newArr.push({
            name: name,
            points: score
        })
    } else if (score > newArr[newArr.length - 1].points) {
        newArr.pop()
        newArr.push({
            name: name,
            points: score
        })
    }
    gameState.highscore = sortHighscore(newArr)
}

function sortHighscore(arr) {
    let sortedArr = arr.sort((a, b) => {
        return b.points - a.points
    })
    return sortedArr
}

function renderHighscore() {

    let htmlToBeRendered = ``

    for (let i = 0; i < 10; i++) {
        if (i < gameState.highscore.length) {
            htmlToBeRendered += `
            <tr>
                <td>${i + 1}</td>
                <td>${gameState.highscore[i].name}</td>
                <td>${gameState.highscore[i].points}</td>
            </tr>
            `
        } else {
            htmlToBeRendered += `
            <tr>
                <td>${1 + i}</td>
                <td></td>
                <td>0</td>
            </tr>
            `
        }
    }
    document.querySelector('.highscore-board tbody').innerHTML = htmlToBeRendered
}

function renderStartScreen() {
    const startScreenEl = document.createElement('aside')
    startScreenEl.setAttribute('class', 'start-screen')
    startScreenEl.innerHTML = `
        <section class='start-screen__board'>
            <p class="board__text">Enter name and select time-limit</p>
            <input class="name-input" type="text" placeholder="Player name" >
            <input class="time-input" type='number' id=“time” min='5' max='60' value='60' />
            <button class="start-game-btn">Play</button>
        </section>
    `

    bodyEl.appendChild(startScreenEl)

    document.querySelector('.start-game-btn').addEventListener('click', handleClickStart)
}

function renderGameEndScreen() {
    const endScreenEl = document.createElement('aside')
    endScreenEl.setAttribute('class', 'end-screen')
    endScreenEl.innerHTML = `
        <section class='start-screen__board'>
            <button class="play-again-btn">Play again</button>
            <button class="start-screen-btn">Change player</button>
        </section>
    `
    bodyEl.appendChild(endScreenEl)
    document.querySelector('.play-again-btn').addEventListener('click', handleClickStart)
    document.querySelector('.start-screen-btn').addEventListener('click', renderStartScreen)

}

function handleClickStart() {
    const startScreenEl = document.querySelector('.start-screen')
    const endScreenEl = document.querySelector('.end-screen')

    const startScreenInput = document.querySelector('.name-input')
    const numberInput = document.querySelector('.time-input')
          
    if (startScreenInput !== null) {
        gameState.playerName = startScreenInput.value
        gameState.totalTime = Number(numberInput.value)
    }
    
    if (startScreenEl !== null) {
        document.querySelector('.start-game-btn').removeEventListener('click', handleClickStart)
        bodyEl.removeChild(startScreenEl)
    }
    if (endScreenEl !== null) {
        document.querySelector('.play-again-btn').removeEventListener('click', handleClickStart)
        document.querySelector('.start-screen-btn').removeEventListener('click', renderStartScreen)

        bodyEl.removeChild(endScreenEl)
    }

    startGame()
}

renderStartScreen()
