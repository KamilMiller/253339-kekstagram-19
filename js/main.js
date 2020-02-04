'use strict'

// Константы.
var USERS_PICTURES_QUATITY = 25;

// Массив реплик комментариев.
var commentTexts = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Как можно было поймать такой неудачный момент?!'
];

// Массив имен авторов комментариев.
var commentateurs = ['Charm', 'Strange', 'Muon', 'Tau', 'Gluon', 'Higgs'];

// Пустой массив.
var usersPictures = [];

// Пустой массив с комментариями.
var commentsCache = [];

// Пустой фрагмент.
var fragment = document.createDocumentFragment();

// Функция получения случайных целых чисел.
var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция перемешивания элементов в массиве.
var shuffle = function (arr, arrLength) {
	var j;
    var temp;
	for(var i = arr.length - 1; i > 0; i--){
		j = getRandomInt(0, arrLength - 1);
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

// Функция создания массива комментариев.
var CommentsAssembling = function (commentQuantity) {
    commentsCache = [];
    var commentTextsCopy = commentTexts.slice();
    var commentateursCopy = commentateurs.slice();
    shuffle(commentTextsCopy, commentTextsCopy.length);
    shuffle(commentateursCopy, commentateursCopy.length);
    for (var i = 0; i <= commentQuantity - 1; i++) {
        commentsCache.push({
            avatar: 'img/avatar' + getRandomInt(0, 5) + '.svg',
            message: commentTextsCopy[i],
            name: commentateursCopy[i]
        });
    };
};

// Функция сборки [карточки] фотогрфии с данными.
var PicDataСollecting = function (dataQuantity) {
    for (var i = 1; i <= dataQuantity; i++) {
        CommentsAssembling(getRandomInt(1, 6));
        usersPictures.push({
            comments: commentsCache,
            commentsNumber: commentsCache.length,
            description: 'Это фотография.',
            likes: getRandomInt(15, 200),
            url: 'photos/' + i + '.jpg',  
        });
    };
};

// Функция сборки DOM-объектов с фотографиями случайных пользователей.
var PicCardsAssembling = function (picQuantity) {
    PicDataСollecting(picQuantity);
    var otherUsersPicTemplate = document.querySelector('#picture').content.querySelector('.picture');
    for (var i = 1; i <= picQuantity; i++) {
        var otherUsersPicItem = otherUsersPicTemplate.cloneNode(true);
        otherUsersPicItem.querySelector('.picture__img').src = usersPictures[i - 1].url;
        otherUsersPicItem.querySelector('.picture__comments').textContent = usersPictures[i - 1].commentsNumber;
        otherUsersPicItem.querySelector('.picture__likes').textContent = usersPictures[i - 1].likes;
        fragment.appendChild(otherUsersPicItem);
    };    
};

// Запуск функции сборки и складирования DOM-объектов с фотографиями случайных пользователей.
PicCardsAssembling(USERS_PICTURES_QUATITY);

// Отрисовка DOM-объектов с фотографиями случайных пользователей.
var usersPicturesContainer = document.querySelector('.pictures');
usersPicturesContainer.appendChild(fragment);