'use strict';
var dialogHandler = window.userDialog.querySelector('.upload');

dialogHandler.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();


    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    window.userDialog.style.top = (window.userDialog.offsetTop - shift.y) + 'px';
    window.userDialog.style.left = (window.userDialog.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    var onClickPreventDefault = function (evt1) {
      evt1.preventDefault();
    };

    if (dragged) {
      dialogHandler.removeEventListener('click', onClickPreventDefault);
    } else {
      dialogHandler.addEventListener('click', onClickPreventDefault);
    }
  };


  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
