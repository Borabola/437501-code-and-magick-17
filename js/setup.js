'use strict';
var HERO_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var HERO_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var HERO_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var HERO_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var HERO_FIREBALLS_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var HERO_COUNT = 4;

var userDialog = document.querySelector('.setup');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var userName = userDialog.querySelector('.setup-user-name');/* или('.setup-user-name')  '[name = username]'*/
var wizardCoat = userDialog.querySelector('.wizard-coat');
var wizardCoatInput = userDialog.querySelector('[name = coat-color]');
var wizardEyes = userDialog.querySelector('.wizard-eyes');
var wizardEyesInput = userDialog.querySelector('[name = eyes-color]');
var wizardFireballs = userDialog.querySelector('.setup-fireball-wrap');
var wizardFireballsInput = userDialog.querySelector('[name = fireball-color]');

/**
 * Функция показывает и скрывает окно героя и список возможных героев
 */

function setup() {


  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      closePopup();
    }
  };

  /* Не получается */
  userName.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  userName.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });

  var openPopup = function () {
    userDialog.classList.remove('hidden');

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        userDialog.classList.add('hidden');
      }
    });
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  userDialogOpen.addEventListener('click', function () {
    openPopup();
  });


  userDialogOpen.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openPopup();
    }
  });

  userDialogClose.addEventListener('click', function () {
    closePopup();
  });

  userDialog.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      closePopup();
    }
  });

  document.querySelector('.setup-similar').classList.remove('hidden');
}

/**
 * Функция нахождения случайного элемента массива
 * @param {Arr} arr
 * @return {number} случайный элеммент массива
 */
function getRandomElement(arr) {
  var randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
}

/**
 *
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} coatColor в формате rgb
 * @param {string} eyesColor в формате rgb
 * @return {Hero} Герой
 */
function generateHero(firstName, lastName, coatColor, eyesColor) {
  var hero = {
    fullName: firstName + ' ' + lastName,
    coatColor: coatColor,
    eyesColor: eyesColor
  };
  return hero;
}

/**
 *  @return {
 * {fullName: string,
 *  coatColor: string,
 *  eyesColor: string,
 * }
 * } герой со случайным именем и фамилией
 */
function generateRandomHero() {
  var hero = generateHero(getRandomElement(HERO_NAMES),
      getRandomElement(HERO_SURNAMES),
      getRandomElement(HERO_COAT_COLORS),
      getRandomElement(HERO_EYES_COLORS));
  return hero;
}

/**
 * @param {number} count количество героев, которое надо сгенерировать
 * @return {
 * {fullName: string,
 *  coatColor: string,
 *  eyesColor: string,
 * }[]
   }
 */
function generateHeroes(count) {
  var heroes = [];
  for (var i = 0; i < count; i++) {
    heroes.push(generateRandomHero());
  }
  return heroes;
}


/**
 * функция берет объект героя и создает разметку героя
 * @param {Hero} hero
 * @return {Node} Element DOM элемент, представляющий героя
 */
function renderHero(hero) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = hero.fullName;
  wizardElement.querySelector('.wizard-coat').style.fill = hero.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = hero.eyesColor;
  return wizardElement;
}

/**
 * функция берет необходимое количество героев, добавляет фрагмент описания героя из массива объектов указанное кол-во раз
 * @param {number} count
 */
function renderHeroes(count) {
  var heroes = generateHeroes(HERO_COUNT);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < count; i++) {
    fragment.appendChild(renderHero(heroes[i]));
  }
  similarListElement.appendChild(fragment);
}

wizardCoat.addEventListener('click', function () {
  /* setHeroElementColor(wizardCoat, HERO_COAT_COLORS); */
  var fillColor = getRandomElement(HERO_COAT_COLORS);
  wizardCoat.style.fill = fillColor;
  wizardCoatInput.value = fillColor;
});

wizardEyes.addEventListener('click', function () {
  var fillColor = getRandomElement(HERO_EYES_COLORS);
  wizardEyes.style.fill = fillColor;
  wizardEyesInput.value = fillColor;
});

wizardFireballs.addEventListener('click', function () {
  var fireballsBackgroundColor = getRandomElement(HERO_FIREBALLS_COLORS);
  wizardFireballs.style.backgroundColor = fireballsBackgroundColor;
  wizardFireballsInput.value = fireballsBackgroundColor;
});

setup();
renderHeroes(HERO_COUNT);

