'use strict';
var HERO_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var HERO_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var HERO_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var HERO_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var HERO_COUNT = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var similarListElement = userDialog.querySelector('.setup-similar-list');


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
 * @return {Object} герой со случайным именем и фамилие
 */
function generateRandomHero() {
  var hero = generateHero(getRandomElement(HERO_NAMES),
      getRandomElement(HERO_SURNAMES),
      getRandomElement(HERO_COAT_COLOR),
      getRandomElement(HERO_EYES_COLOR));
  return hero;
}

/**
 * @param {number} count количество героев, которое надо сгенерировать
 * @return {Hero[]}
 */
function generateHeroes(count) {
  var heroes = [];
  for (var i = 0; i < count; i++) {
    heroes.push(generateRandomHero());
  }
  return heroes;
}
var heroes = generateHeroes(HERO_COUNT);

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
 * функция берет необходимое колическтво героев
 * @param {number} count
 * @param {[ArrWizardElement]}
 * @return {Node} Element DOM элемент, представляющий список героев
 */
function renderHeroes(count) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < count; i++) {
    fragment.appendChild(renderHero(heroes[i]));
  }
  similarListElement.appendChild(fragment);
}

renderHeroes(HERO_COUNT);
document.querySelector('.setup-similar').classList.remove('hidden');

