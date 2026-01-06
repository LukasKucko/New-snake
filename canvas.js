// DYNAMICKÝ CANVAS PODĽA DISPLEJA
const canvas = document.getElementById("playground");
const ctx = canvas.getContext("2d");
let w = window.innerWidth * 0.9;
let block = Math.floor(w / 20); // 20x20 mriežka
canvas.width = block * 20;
canvas.height = block * 20;

// OBRÁZKY (Všetky musia byť v assets/)
const IMG_BASE = "assets/";
const images = {
    apple: new Image(), skin: new Image(),
    hUp: new Image(), hDown: new Image(), hLeft: new Image(), hRight: new Image()
};
images.apple.src = IMG_BASE + "apple.png";
images.skin.src = IMG_BASE + "skin2.png";
images.hUp.src = IMG_BASE + "snakeHeadUp.png";
images.hDown.src = IMG_BASE + "snakeHeadDown.png";
images.hLeft.src = IMG_BASE + "snakeHeadLeft.png";
images.hRight.src = IMG_BASE + "snakeHeadRight.png";

// HERNÉ STAVY
let snake = [{x: 10, y: 10}, {x: 9, y: 10}];
let food = {x: 5, y: 5};
let velocity = {x: 1, y: 0};
let scoreNumber = 0;
let isPaused = true;
let intervalTime = 150;
let snakeDirection = "right";

