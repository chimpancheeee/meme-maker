const fontsizeBtn = document.getElementById("font-size");
const saveBtn = document.getElementById("save");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const selectFile = document.getElementById("file");
const textInput = document.getElementById("text-place");
const destroyBtn = document.getElementById("destroy-btn");
const colorBtn = document.getElementById("color-btn")
const modeBtn = document.getElementById("mode-btn")
const lineWidth = document.getElementById("lineWidth-btn");
const eraseBtn = document.getElementById("erase-btn");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); 
const fontStyleOption = document.getElementById("font-style");

canvas.width = 800;
canvas.height = 800;

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

let isPainting = false;
let isFilling = false;
let fontSize;
let fontStyle;

function onMove(event) {
    if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    } else {
    ctx.beginPath();
    }
}
function startPainting() {
    isPainting = true;
}
function endPainting() {
    isPainting = false;
}
function cancelPainting() {
    isPainting = false;
}
function erasePainting() {
    ctx.strokeStyle = "white";
}
function controlWidth(event) {
    ctx.lineWidth = event.target.value;
}
function changeMode() {
    if (isFilling) {
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else {
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}
function changeColor(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}
function fillCanvas() {
    if (isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
function deleteCanvas() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
function onChangeFontSize(event) {
    fontSize = event.target.value;
}
function printText(event) {
    if (textInput !== null) {
    ctx.save();
    const text = textInput.value;
    ctx.font = `${fontSize}px ${fontStyle}`;
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
    }   
}
function selectPhoto(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function() {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        selectFile.value = "";
    }
}
function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}
function onChangeColor(event) {
    const color = event.target.dataset.color;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    colorBtn.value = color;
}
function onChangeFontStyle(event) {
    fontStyle= event.target.value;
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", endPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", fillCanvas);
eraseBtn.addEventListener("click", erasePainting);
lineWidth.addEventListener("click", controlWidth);
modeBtn.addEventListener("click", changeMode);
colorBtn.addEventListener("change", changeColor);
destroyBtn.addEventListener("click", deleteCanvas);
canvas.addEventListener("click", printText);
selectFile.addEventListener("change", selectPhoto);
saveBtn.addEventListener("click", onSaveClick);
colorOptions.forEach((color)=>color.addEventListener("click", onChangeColor));
fontsizeBtn.addEventListener("change", onChangeFontSize);
fontStyleOption.addEventListener("change", onChangeFontStyle);