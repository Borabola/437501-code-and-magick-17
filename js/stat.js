'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_RADIUS = 5;
var CLOUD_START_X = 100;
var CLOUD_START_Y = 10;
var CLOUD_GAP = 10;
var BAR_WIDTH = 40;
var barHeight = 150;
var CLOUD_START_TEXT_X = 20;
var barOpacity = 1;
var barBlue = 1;
var GAP = 10;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.moveTo(x + CLOUD_RADIUS, y);
  ctx.lineTo(x + CLOUD_WIDTH - CLOUD_RADIUS, y);
  ctx.arcTo(x + CLOUD_WIDTH - CLOUD_RADIUS, y, x + CLOUD_WIDTH, y + CLOUD_HEIGHT - CLOUD_RADIUS, CLOUD_RADIUS);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT - CLOUD_RADIUS);
  ctx.arcTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT - CLOUD_RADIUS, x + CLOUD_WIDTH - CLOUD_RADIUS, y + CLOUD_HEIGHT, CLOUD_RADIUS);
  ctx.lineTo(x + CLOUD_WIDTH - CLOUD_RADIUS, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_RADIUS, y + CLOUD_HEIGHT);
  ctx.arcTo(x + CLOUD_RADIUS, y + CLOUD_HEIGHT, x, y + CLOUD_HEIGHT - CLOUD_RADIUS, CLOUD_RADIUS);
  ctx.lineTo(x, y + CLOUD_HEIGHT - CLOUD_RADIUS);
  ctx.lineTo(x, CLOUD_RADIUS);
  ctx.arcTo(x, CLOUD_RADIUS, x + CLOUD_RADIUS, y, CLOUD_RADIUS);
  ctx.lineTo(x + CLOUD_RADIUS, y);
  ctx.closePath();
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomIntInclusive = function (minOpacity, maxOpacity) {
  minOpacity = Math.ceil(minOpacity);
  maxOpacity = Math.floor(maxOpacity);
  return Math.floor(Math.random() * (maxOpacity - minOpacity + 1)) + minOpacity;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_START_X + CLOUD_GAP, CLOUD_START_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_START_X, CLOUD_START_Y, '#ffffff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_START_X + CLOUD_START_TEXT_X, CLOUD_START_Y + 20);
  ctx.fillText('Список результатов:', CLOUD_START_X + CLOUD_START_TEXT_X, CLOUD_START_Y + 40);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var TEXT_START_X = CLOUD_START_X + CLOUD_START_TEXT_X + (BAR_WIDTH + GAP) * i;
    var TEXT_START_Y = CLOUD_START_Y + CLOUD_HEIGHT - 30;
    var currentBarHeight = (barHeight * times[i]) / maxTime;
    var timeRound = Math.round(times[i]);
    var TIME_START_Y = TEXT_START_Y - currentBarHeight - 30;
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], TEXT_START_X, TEXT_START_Y);

    if (names[i] === 'Вы') {
      var barColor = 'rgba(255, 0, 0, 1)';
    } else {
      barOpacity = getRandomIntInclusive(1, 10) / 10;
      barBlue = getRandomIntInclusive(60, 255);
      barColor = 'rgba(0, 0, ' + barBlue + ', ' + barOpacity + ')';
      /* console.log(barColor);*/
    }

    ctx.fillStyle = barColor;
    ctx.fillRect(TEXT_START_X, TEXT_START_Y - 10, BAR_WIDTH, -currentBarHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(timeRound, TEXT_START_X, TIME_START_Y);
  }
};
