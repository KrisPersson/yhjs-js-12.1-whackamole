const timeBetweenPopUps = 2000;
const appearanceTime = 800;
let currentHole = null;
let molesWhacked = 0;
// Append listener
allHoles.forEach(hole => {
    hole.addEventListener('click', clickHandler)
})

function clickHandler(e) {

    let whackedHole = e.target.getAttribute('data-id');
    if(parseInt(whackedHole) === currentHole) {
        // Hit!
        // +1 on score
        molesWhacked++

        // Update whacked moles gui
        document.querySelector('.moleswhacked b').innerHTML = molesWhacked;

        // add class to show hit
        document.querySelector(`[data-id="${whackedHole}"]`).classList.add('hit');
        setTimeout(() => {
            document.querySelector(`[data-id="${whackedHole}"]`).classList.remove('hit');
        }, appearanceTime);
    }

}



function startGame() {

    let currentTime = 60;
    let hits = 0;
    const allHoles = document.querySelectorAll('main article');
    

    let gameLoop = setInterval(() => {


        // Empty holes
        allHoles.forEach(hole => hole.classList.remove('mole'));

        // Pick random hole to pop up
        let randomId = Math.floor(Math.random() * allHoles.length);
        
        // register as current Hole
        currentHole = randomId;

        let el = document.querySelector(`[data-id="${randomId}"]`);
        el.classList.add('mole');

        // Just make the apperance short
        setTimeout(() => {

            allHoles.forEach(hole => hole.classList.remove('mole'));
            currentHole = null

        }, appearanceTime)
    }, timeBetweenPopUps);


    let timer = setInterval(() => {
        // Check if time left
        if(currentTime >= 0) {

        // Update timer in gui
        document.querySelector('.timeleft b').innerHTML = `${currentTime}s`;

        // count down current time
        currentTime--;

    } else {
        // Game over
        clearInterval(timer)
        clearInterval(gameLoop)

        alert(`You whacked ${molesWhacked} moles in 60 sec.`)
    }
    }, 1000);


}

startGame()

