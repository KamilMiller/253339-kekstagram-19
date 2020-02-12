'use strict'

// Константы.
var USERS_PICTURES_QUATITY = 25;
var USERS_PICTURES_CONTAINER = document.querySelector('.pictures');
var OTHER_USERS_PIC_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture');

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
var commentsAssembling = function (commentQuantity) {
  var commentsCache = [];
  var commentTextsCopy = COMMENT_TEXTS.slice();
  var commentateursCopy = COMMENTATEURS.slice();
  for (var i = 0; i < commentQuantity; i++) {
    commentsCache.push({
      avatar: 'img/avatar' + getRandomInt(0, 5) + '.svg',
      message: getRandomElement(commentTextsCopy),
      name: getRandomElement(commentateursCopy)
    });
  };
  return commentsCache;
};

// Функция сборки [карточки] фотогрфии с данными.
var picDataСollecting = function (dataQuantity) {
  var userPictures = [];
  for (var i = 1; i <= dataQuantity; i++) {
    var comments = commentsAssembling(getRandomInt(1, 6));
    userPictures.push({
      comments: comments,
      commentsNumber: comments.length,
      description: 'Это фотография.',
      likes: getRandomInt(15, 200),
      url: 'photos/' + i + '.jpg',
    });
  };
  return userPictures;
};

// Функция сборки DOM-объектов с фотографиями случайных пользователей.
var renderPictures = function (picturesArr) {
  var fragment = document.createDocumentFragment();
    picturesArr.forEach(function (item) {
    var otherUsersPicItem = OTHER_USERS_PIC_TEMPLATE.cloneNode(true);
    otherUsersPicItem.querySelector('.picture__img').src = item.url;
    otherUsersPicItem.querySelector('.picture__comments').textContent = item.commentsNumber;
    otherUsersPicItem.querySelector('.picture__likes').textContent = item.likes;
    fragment.appendChild(otherUsersPicItem);
  });
  return fragment
};

// Запуск функции сборки и складирования DOM-объектов с фотографиями случайных пользователей.
USERS_PICTURES_CONTAINER.appendChild(renderPictures(picDataСollecting(USERS_PICTURES_QUATITY)));
