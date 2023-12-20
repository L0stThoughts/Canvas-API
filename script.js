const canvas = document.getElementById("drawing-board");
const toolbar = document.getElementById("toolbar");
const ctx = canvas.getContext("2d");

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let running = true;
let isPainting = false;
let lineWidth = 5;
let startX;
let startY;
let savedImageData;

toolbar.addEventListener("click", (e) => {
  if (e.target.id === "clear") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clearTimeout();

  }
});

toolbar.addEventListener("change", (e) => {
  if (e.target.id === "stroke") {
    ctx.strokeStyle = e.target.value;
  }

  if (e.target.id === "lineWidth") {
    lineWidth = e.target.value;
  }
});

toolbar.addEventListener("click", (e) => {
    if (e.target.id === "save") {
      savedImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
  });
  
  toolbar.addEventListener("click", (e) => {
    if (e.target.id === "restore") {
      if (savedImageData) {
        ctx.putImageData(savedImageData, 0, 0);
      }
    }
  });

const draw = (e) => {
  if (!isPainting) {
    return;
  }

  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";

  ctx.lineTo(e.clientX, e.clientY - canvasOffsetY);
  ctx.stroke();
};

canvas.addEventListener("mousedown", (e) => {
  isPainting = true;
  startX = e.clientX;
  startY = e.clientY;
});

canvas.addEventListener("mouseup", (e) => {
  isPainting = false;
  ctx.stroke();
  ctx.beginPath();
});

canvas.addEventListener("mousemove", draw);

toolbar.addEventListener("click", (e) => {
  if (e.target.id === "tree") {
    drawTree();
    lights();
  }
});

toolbar.addEventListener("click", (e) => {
  if (e.target.id === "lights") {
    lights();
  }
});

toolbar.addEventListener("change", (e) => {
  if (e.target.id === "lightColor") {
    ctx.fillStyle = e.target.value;
  }
});

toolbar.addEventListener("click", (e) => {
  if (e.target.id === "rgbLights") {
    rgbLights();
    setTimeout(rgbLights, x * 1000);
  }
});



function drawTree(){
  ctx.beginPath();
  ctx.fillStyle = "green";
  ctx.moveTo(300,30);
  ctx.lineTo(385,120);
  ctx.lineTo(210,120);
  ctx.lineTo(300,30);
  
  ctx.moveTo(300,90);
  ctx.lineTo(405,200);
  ctx.lineTo(190,200);
  ctx.lineTo(300,90);
  
  ctx.moveTo(300,170);
  ctx.lineTo(415,290);
  ctx.lineTo(180,290);
  ctx.lineTo(300,170);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = "#944b03";
  ctx.rect(285,290,30,70);
  ctx.fill();

  ctx.beginPath();
}

function lights(){
  ctx.beginPath();
  ctx.arc(210, 130, 10, 0, 2 * Math.PI);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(385, 130, 10, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(405, 210, 10, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(190, 210, 10, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(415, 300, 10, 0, 2 * Math.PI);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(180, 300, 10, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
}

function rgbLights(){
  x = 1;
  ctx.fillStyle = getRndColor();
  lights();
}

function getRndColor() {
  var r = 255*Math.random()|0,
      g = 255*Math.random()|0,
      b = 255*Math.random()|0;
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}
