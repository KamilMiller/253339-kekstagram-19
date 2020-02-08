'use strict'

// Константы.
var USERS_PICTURES_QUATITY = 25;
var USERS_PICTURES_CONTAINER = document.querySelector('.pictures');

// Массив реплик комментариев.
var COMMENT_TEXTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Как можно было поймать такой неудачный момент?!'
];

// Массив имен авторов комментариев.
var COMMENTATEURS = ['Charm', 'Strange', 'Muon', 'Tau', 'Gluon', 'Higgs'];

// Функция получения случайных целых чисел.
var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Выкусывание элементов из массива в случайном порядке.
var getRandomElement = function (arr) {
  var elementIndex = getRandomInt(0, arr.length - 1);
  var randomElement = arr[elementIndex];
  arr.splice(elementIndex, 1);
  return randomElement;
}

// Функция создания массива комментариев.
var CommentsAssembling = function (commentQuantity) {
  var commentsCache = [];
  var commentTextsCopy = COMMENT_TEXTS.slice();
  var commentateursCopy = COMMENTATEURS.slice();
  for (var i = 0; i <= commentQuantity - 1; i++) {
    commentsCache.push({
      avatar: 'img/avatar' + getRandomInt(0, 5) + '.svg',
      message: getRandomElement(commentTextsCopy),
      name: getRandomElement(commentateursCopy)
    });
  };
  return commentsCache;
};

// Функция сборки [карточки] фотогрфии с данными.
var PicDataСollecting = function (dataQuantity) {
  var usersPictures = [];
  for (var i = 1; i <= dataQuantity; i++) {
    var comments = CommentsAssembling(getRandomInt(1, 6));
    usersPictures.push({
      comments: comments,
      commentsNumber: comments.length,
      description: 'Это фотография.',
      likes: getRandomInt(15, 200),
      url: 'photos/' + i + '.jpg',
    });
  };
  return usersPictures;
};

// Функция сборки DOM-объектов с фотографиями случайных пользователей.
var PicCardsAssembling = function (picQuantity) {
  var pictures = PicDataСollecting(picQuantity);
  var fragment = document.createDocumentFragment();
  var otherUsersPicTemplate = document.querySelector('#picture').content.querySelector('.picture');
  for (var i = 1; i <= picQuantity; i++) {
    var otherUsersPicItem = otherUsersPicTemplate.cloneNode(true);
    otherUsersPicItem.querySelector('.picture__img').src = pictures[i - 1].url;
    otherUsersPicItem.querySelector('.picture__comments').textContent = pictures[i - 1].commentsNumber;
    otherUsersPicItem.querySelector('.picture__likes').textContent = pictures[i - 1].likes;
    fragment.appendChild(otherUsersPicItem);
  };
  USERS_PICTURES_CONTAINER.appendChild(fragment);
};

// Запуск функции сборки и складирования DOM-объектов с фотографиями случайных пользователей.
PicCardsAssembling(USERS_PICTURES_QUATITY);
