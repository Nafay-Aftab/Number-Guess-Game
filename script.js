// Generate a random number between 1 and 100
let rand = Math.floor(Math.random() * 100) + 1;
// alert(rand); // Display the random number (for testing purposes)

// Initialize attempt count and select necessary elements from the DOM
let attemptVal = 10;
const checkButton = document.querySelector("#submit");
const message = document.querySelector("#message");
const attempt = document.querySelector("#attempts");
const inputField = document.querySelector("#guess");
const restart = document.querySelector("#restart");
const historyMsg = document.querySelector("#history");
let history = []; // Array to store previous guesses

// Event listener for the "Check" button
checkButton.addEventListener("click", () => {
    // Convert input value to a number
    let inputVal = parseInt(inputField.value);

    // Store the guess in history and update the history display
    history.push(inputVal);
    historyMsg.innerHTML = `Previous Guesses: ${history.join(", ")}`; // Proper formatting

    // Validate input (must be a number between 1 and 100)
    if (isNaN(inputVal) || inputVal < 1 || inputVal > 100) {
        message.innerHTML = "❌ Please enter a valid number between 1 and 100!";
        message.style.color = "#ff6b6b";
        return; // Stop execution if input is invalid
    }

    // Decrease the attempt count and update the display
    attemptVal--;
    attempt.innerHTML = `Attempts Left: ${attemptVal}`;

    // Compare the guess with the random number and display hints
    if (inputVal > rand) {
        message.innerHTML = "📈 Too High!";
        message.style.color = "#f4a261";
    } else if (inputVal < rand) {
        message.innerHTML = "📉 Too Low!";
        message.style.color = "#2a9d8f";
    } else {
        // If the user guesses correctly
        message.innerHTML = `🎉 Congratulations! You guessed the right number: ${rand}`;
        message.style.color = "#4CAF50";

        // Disable further input and show the restart button
        checkButton.disabled = true;
        inputField.disabled = true;
        restart.style.display = "block";
        return; // Stop further execution
    }

    // If the player runs out of attempts, show game over message
    if (attemptVal === 0) {
        message.innerHTML = `😢 Game Over! The correct number was: ${rand}`;
        message.style.color = "red";

        // Disable input and show restart button
        checkButton.disabled = true;
        inputField.disabled = true;
        restart.style.display = "block";
    }
});

// Event listener for the "Restart" button
restart.addEventListener("click", () => {
    // Reset game state
    rand = Math.floor(Math.random() * 100) + 1; // Generate a new random number
    attemptVal = 10; // Reset attempts count
    attempt.innerHTML = `Attempts Left: ${attemptVal}`;
    message.innerHTML = "Start guessing..."; // Reset message
    message.style.color = "black";
    inputField.value = ""; // Clear input field
    checkButton.disabled = false; // Enable the check button
    inputField.disabled = false; // Enable the input field
    restart.style.display = "none"; // Hide restart button

    // Reset history
    history = [];
    historyMsg.innerHTML = "Previous Guesses: None"; // Reset history message
});
