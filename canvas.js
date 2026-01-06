// --- DYNAMICKÝ CANVAS ---
const canvas = document.getElementById("playground");
const ctx = canvas.getContext("2d");
let w = window.innerWidth * 0.95;
let block = Math.floor(w / 20); // Mriežka 20x20
canvas.width = block * 20;
canvas.height = block * 20;

// --- OBRAZKY ---
const IMG_PATH = "assets/images/";
const images = {
    apple: new Image(), skin: new Image(),
    hUp: new Image(), hDown: new Image(), hLeft: new Image(), hRight: new Image()
};
images.apple.src = IMG_PATH + "apple.png";
images.skin.src = IMG_PATH + "skin2.png";
images.hUp.src = IMG_PATH + "snakeHeadUp.png";
images.hDown.src = IMG_PATH + "snakeHeadDown.png";
images.hLeft.src = IMG_PATH + "snakeHeadLeft.png";
images.hRight.src = IMG_PATH + "snakeHeadRight.png";

// --- AUDIO ---
const audio = {
    apple: document.getElementById("soundApple"),
    hit: document.getElementById("hitWall"),
    music: document.getElementById("music"),
    choose: document.getElementById("chooseMenu")
};

// --- STAV HRY ---
let snake = [{x: 10, y: 10}, {x: 9, y: 10}];
let food = {x: 5, y: 5};
let velocity = {x: 1, y: 0};
let snakeDirection = "right";
let scoreNumber = 0;
let isPaused = true;
let intervalTime = 150;
let vibrationEnabled = true;
