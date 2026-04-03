const hugeDictionary = spellingWords.trim().split('\n')
    .map(w => w.trim().toUpperCase())
    .filter(w => w.length >= 4);

let letters = [];
let centerLetter = '';
let validAnswers = [];
let foundWords = [];
let currentGuess = "";
let score = 0;
let maxPossibleScore = 0;

// game generation
function initGame() {
    const pangrams = hugeDictionary.filter(w => new Set(w.split('')).size === 7);

    if (pangrams.length === 0) {
        alert("No words with 7 letters in the dictionary");
        return;
    }

    let isGoodLevelFound = false;

    while (!isGoodLevelFound) {
        const randomPangram = pangrams[Math.floor(Math.random() * pangrams.length)];
        const uniqueLetters = Array.from(new Set(randomPangram.split('')));

        centerLetter = uniqueLetters[Math.floor(Math.random() * uniqueLetters.length)];
        letters = uniqueLetters.filter(l => l !== centerLetter);

        validAnswers = hugeDictionary.filter(word => {
            if (!word.includes(centerLetter)) return false;
            const wordLetters = word.split('');
            return wordLetters.every(letter => uniqueLetters.includes(letter));
        });

        if (validAnswers.length >= 15 && validAnswers.length <= 50) {
            isGoodLevelFound = true;
        }
    }

    maxPossibleScore = 0;
    validAnswers.forEach(word => {
        let wordScore = word.length === 4 ? 1 : word.length;
        if (new Set(word.split('')).size === 7) wordScore += 7;
        maxPossibleScore += wordScore;
    });

    document.getElementById('maxScore').innerText = maxPossibleScore;

    console.log("central letter is: ", centerLetter);
    console.log("all the words: ", validAnswers);

    renderHoneycomb();
    updateProgressBar();
}

// honeycombs rendering
function renderHoneycomb() {
    const container = document.getElementById('honeycomb');
    container.innerHTML = '';

    const centerBtn = document.createElement('div');
    centerBtn.className = 'hex center';
    centerBtn.innerText = centerLetter;
    centerBtn.onclick = () => typeLetter(centerLetter);
    container.appendChild(centerBtn);

    letters.forEach((letter, index) => {
        const btn = document.createElement('div');
        btn.className = `hex pos${index + 1}`;
        btn.innerText = letter;
        btn.onclick = () => typeLetter(letter);
        container.appendChild(btn);
    });
}

function typeLetter(letter) {
    currentGuess += letter;
    updateInputDisplay();
}

function deleteLetter() {
    currentGuess = currentGuess.slice(0, -1);
    updateInputDisplay();
}

function updateInputDisplay() {
    const inputContainer = document.getElementById('displayText');
    inputContainer.innerHTML = '';

    const lettersTyped = currentGuess.split('');

    lettersTyped.forEach(letter => {
        const span = document.createElement('span');
        span.innerText = letter;

        if (letter === centerLetter) {
            span.className = 'center-letter-input';
        } else {
            span.className = 'valid-letter-input';
        }

        inputContainer.appendChild(span);
    });
}

function shuffleLetters() {
    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    renderHoneycomb();
}

function showMessage(msg) {
    const msgBox = document.getElementById("message");
    msgBox.innerText = msg;
    msgBox.classList.add("show");
    setTimeout(() => msgBox.classList.remove("show"), 1500);
}

// checks for input words
function checkWord() {
    const word = currentGuess;

    if (word.length < 4) {
        showMessage("Too short");
        return;
    }
    if (!word.includes(centerLetter)) {
        showMessage("Missing center letter");
        currentGuess = ""; updateInputDisplay();
        return;
    }
    if (foundWords.includes(word)) {
        showMessage("Already found");
        currentGuess = ""; updateInputDisplay();
        return;
    }
    if (!validAnswers.includes(word)) {
        showMessage("Not in word list");
        currentGuess = ""; updateInputDisplay();
        return;
    }

    let wordScore = word.length === 4 ? 1 : word.length;
    const uniqueLettersInWord = new Set(word.split(''));

    if (uniqueLettersInWord.size === 7) {
        wordScore += 7;
        showMessage("Pangram! 🎉");
    } else {
        showMessage("Nice!");
    }

    score += wordScore;
    foundWords.push(word);

    document.getElementById('score').innerText = score;
    document.getElementById('wordCount').innerText = foundWords.length;

    const li = document.createElement('li');
    li.innerText = word;
    document.getElementById('wordList').prepend(li);

    currentGuess = "";
    updateInputDisplay();
    updateProgressBar();
}

function updateProgressBar() {
    const progressBarFill = document.getElementById('progressBar');

    let percentage = 0;
    if (maxPossibleScore > 0) {
        percentage = (score / maxPossibleScore) * 100;
    }

    progressBarFill.style.width = percentage + "%";
}

// keyboard
document.addEventListener('keydown', (e) => {
    const key = e.key.toUpperCase();
    if (key === 'ENTER') checkWord();
    if (key === 'BACKSPACE') deleteLetter();

    const allValidLetters = [...letters, centerLetter];
    if (allValidLetters.includes(key)) typeLetter(key);
});

initGame();