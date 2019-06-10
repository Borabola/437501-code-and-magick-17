'use strict';
var userDialog = document.querySelector('.setup');
var HERO_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var HERO_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var HERO_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)']
var HERO_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var heros = [];


/* if (userDialog) {
  userDialog.classList.remove('hidden');
} */

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var createHero = function () {
  for (var i = 0; i < 5; i++) {

    var rand = function (array) {
      var randIndex = Math.floor(Math.random() * array.length);
      return array[randIndex];
    };

    var createHeroName = function() {
      var heroName = 'hero' + i + 1;
      var heroCoatColor = 0;
    };
    var heroFullNames = HERO_NAMES[randIndex] + HERO_SURNAMES[randIndex];
    heroName[i] = heroFullNames[i];

    heros.push({heroName});
    heros.push({heroCoatColor});
    heros.push({heroEyesColor});
    heros.heroName[i].push(heroFullNames[i]);
    heros.heroCoatColor[i].push(HERO_COAT_COLOR[i]);
    heros.heroEyesColor [i].push(HERO_EYES_COLOR[i])
    }
  }
