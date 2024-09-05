"use strict";

window.addEventListener("load", main);

let min = 0;
let max = 100;
let currentGuess;
let attempts = 0;
let attemptList = [];

function main() {
    console.log("Spillet startes");
    setupEventListeners();
    newGuess();
}

function setupEventListeners() {
    const tooHighButton = document.getElementById("tooHigh");
    const tooLowButton = document.getElementById("tooLow");
    const correctButton = document.getElementById("correct");

    tooHighButton.addEventListener("click", handleTooHigh);
    tooLowButton.addEventListener("click", handleTooLow);
    correctButton.addEventListener("click", handleCorrect);
}

function handleTooHigh() {
    tooHigh();

}

function handleTooLow() {
    tooLow();
}

function handleCorrect() {
    correct();
}

function handleTooHigh() {
    attempts++;
    const message = `Jeg gættede på ${currentGuess}, det var for højt.`;
    showMessage(message);
    logAttempt(message);
    max = currentGuess -1
    newGuess();
    console.log(max)
}

function handleTooLow() {
    attempts++;
    const message = `Jeg gættede på ${currentGuess}, det var for lavt.`;
    showMessage(message);
    logAttempt(message);
    min = currentGuess +1
    newGuess();
    console.log(min)
}

function handleCorrect() {
    attempts++;
    const message = `Jeg gættede korrekt med ${currentGuess}! Det tog mig ${attempts} forsøg.`;
    showMessage(message);
    logAttempt(message);
    disableButtons();
}

function newGuess() {
    if (min > max) {
        handleLie();
        return;
    }

    currentGuess = Math.floor((min + max) / 2);
    showGuess();
}

function handleLie() {
    const message = `Du lyver! Det er nødt til at være ${currentGuess}.`;
    showMessage(message);
    disableButtons();
}

function showGuess() {
    const guessDisplay = document.getElementById("guessDisplay");
    guessDisplay.textContent = `Jeg gætter nu på ${currentGuess}, er det, det rigtige tal?`;
}

function showMessage(message) {
    const messageElement = document.querySelector(".message");
    messageElement.textContent = message;
}

function logAttempt(message) {
    attemptList.push(message);
    const attemptListElement = document.getElementById("attemptList");
    const attemptNumber = attemptList.length;
    attemptListElement.insertAdjacentHTML(
        "beforeend",
        `<li>${attemptNumber}. Forsøg: ${message}</li>`
    );
}

function disableButtons() {
    document.getElementById("tooHigh").disabled = true;
    document.getElementById("tooLow").disabled = true;
    document.getElementById("correct").disabled = true;
}
