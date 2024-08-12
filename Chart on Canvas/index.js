const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 500;

const data = {
  January: "12000",
  February: "15000",
  March: "16000",
  April: "15000",
  May: "12570",
  June: "8000",
  July: "16500",
  August: "16700",
  September: "19800",
  October: "16870",
  November: "10050",
  December: "19092",
};

const colors = ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ff9", "#b15928",
];

const padding = 40;
const canvasActualHeight = canvas.height - padding * 2;
const canvasActualWidth = canvas.width - padding * 2;
const barSize = canvasActualWidth / Object.keys(data).length;
const maxValue = Math.max(...Object.values(data));
const gridScale = 2000;

// Drawing grid lines
for (let i = 0; i < maxValue; i += gridScale) {
  var gridY = canvasActualHeight * (1 - i / maxValue) + padding;
  ctx.beginPath();
  ctx.moveTo(0, gridY);
  ctx.lineTo(canvas.width, gridY);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#b9b9b9";
  ctx.stroke();
  ctx.fillStyle = "black";
  ctx.font = "10px Arial";
  ctx.fillText(i, 0, gridY - 2);
}

// Drawing bars and labels
let barIndex = 0;

for (let key in data) {
  let barHeight = Math.round((canvasActualHeight * data[key]) / maxValue);
  ctx.fillStyle = colors[barIndex];
  ctx.fillRect(
    padding + barIndex * barSize,
    canvas.height - barHeight - padding,
    barSize - padding,
    barHeight
  );

  // Writing labels
  ctx.fillStyle = "black";
  ctx.font = "10px Arial";
  ctx.fillText(
    key,
    padding + barIndex * barSize,
    canvas.height - barHeight - padding - 5
  );

  barIndex++;
}

// Drawing vertical line(x-axis)
ctx.beginPath();
ctx.moveTo(30, 0);
ctx.lineTo(30, canvas.height);
ctx.lineWidth = 2;
ctx.strokeStyle = "#b9b9b9";
ctx.stroke();

// Writing labels
ctx.fillStyle = "black";
ctx.font = "15px Arial";
ctx.fillText("Sales Performance", canvasActualWidth / 2, canvas.height - 5);
