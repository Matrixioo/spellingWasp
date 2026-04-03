# Spelling Wasp

A fully functional clone of the popular NYT Spelling Bee game, built entirely with Vanilla JavaScript, HTML, and CSS. 

## Features

- **Honeycomb UI:** Flat-topped hexagons created using precise CSS `clip-path` polygon math.
- **Level Generation:** The game algorithm automatically scans a local dictionary to find a valid 7-letter "pangram", randomly assigns a center letter, and filters valid answers.
- **Smart Level Balancing:** The algorithm runs a loop to guarantee that the generated level contains an adequate amount of words to ensure the game is actually fun and playable.
- **Progress Tracking:** Real-time progress bar that dynamically calculates your current score against the absolute maximum possible score for the uniquely generated level.

## How to Play

1. **Build Words:** Create words using the 7 letters provided in the honeycomb.
2. **Center Letter:** Every word *must* include the central yellow letter.
3. **Length:** Words must contain at least 4 letters.
4. **Reuse:** Letters can be used more than once.
5. **Scoring:** - 4-letter words = 1 point.
   - Longer words = 1 point per letter (e.g., 5 letters = 5 points).
   - **Pangram** (using all 7 letters at least once) = +7 bonus points!

## Tech Stack

- **HTML5:** Semantic structure.
- **CSS3:** Custom animations (Toast notifications, blinking cursor), Flexbox/Grid, and complex shapes.
- **JavaScript:** Array manipulation (`filter`, `map`, `every`), `Set` for unique values, and event listeners.