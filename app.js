const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //canvas 의 pixel 에 접근
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

//pixcel modifier크기 지정
canvas.witdh = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

//또 내 경우엔 css 에서 canvas 크기를 지정했더니 에러가 났다...
//html에서 직접 지정해줬더니 에러가 없어짐.

let painting = false;
let filling = false;

function init() {
  ctx.strokeStyle = "#2c2c2c";
  ctx.lineWidth = 2.5;
  //실제 pixcel 배경 하얀색으로 지정. 안하면 이미지저장시 투명배경됨
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function startPainting() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    painting = true;
  }
}

function stopPainting(evnet) {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath(); //path를 만듦 or 갱신함
    ctx.moveTo(x, y); //path의 시작점을 지정한 좌표로 옮김
  } else {
    ctx.lineTo(x, y); //path를 시작점에서 지정한 좌표까지 그림
    ctx.stroke(); //path를 따라 실선을 그림
  }
}

function handleColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function hanbleMode(evnet) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

//우클릭 했을 때 메뉴 안 뜨게 하기
function handleCM(evnet) {
  event.preventDefault();
}

function handleSave() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "My Paint";
  link.click();
}

init();

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("contextmenu", handleCM);
}

//object를 array로 바꿈. 두번째 인자는 요소 각각에 대해 실행하는 함수
Array.from(colors, color => color.addEventListener("click", handleColor));

if (range) {
  range.addEventListener("input", handleRange);
}

if (mode) {
  mode.addEventListener("click", hanbleMode);
}

if (save) {
  save.addEventListener("click", handleSave);
}
