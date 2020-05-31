const readlineSync = require('readline-sync');

const generateNumber = () => {
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let guess = [];
    while (guess.length < 4) {
        let randomIndex = Math.floor(Math.random() * numbers.length);
        if (!guess.includes(randomIndex)) {
            guess.push(randomIndex)
        }
    }
    return guess
}

const guessNumber = () => {
    const guessed = generateNumber();
    let bulls, cows, attemps = 0;

    console.log('Guess the number');

    while (bulls !== 4) {
        bulls = 0;
        cows = 0;
        let your = readlineSync.question('Number: ').split("").map(Number)

        guessed.forEach((item, i) => {
            if (item == your[i]) {
                ++bulls;
            } else if (your.indexOf(item) !== -1) {
                ++cows;
            }
        })
        ++attemps;
        console.log(`Bulls: ${bulls}; Cows: ${cows}`);
    }
    console.log(`That's the right number! Attempts: ${attemps}`);
}

guessNumber()