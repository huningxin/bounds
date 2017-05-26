var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var bounds = [65, 25, 0, 125, 45, 0, 120, 110, 0, 45, 125, 0, 35, 65, 0];

function drawBounds(ctx, bounds) {
  ctx.beginPath();
  ctx.moveTo(bounds[0], bounds[1]);
  for (let i = 3; i < bounds.length; i = i + 3) {
    ctx.lineTo(bounds[i], bounds[i+1]);
  }
  ctx.closePath();
  ctx.stroke();
}

drawBounds(context, bounds);
