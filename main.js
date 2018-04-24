var character = {
	src 		: '',
	elem		: $('.character'),
	position 	: {
		l 		: 18,
		c 		: 9
	}
}

var bateaux2 = {
	src 		: '',
	elem		: $('.bateaux2'),
	position 	: {
		l 		: 16,
		c 		: 480
	}
}

var bateaux31 = {
	src 		: '',
	elem		: $('.bateaux31'),
	position 	: {
		l 		: 14,
		c 		: 128
	}
}

var bateaux32 = {
	src 		: '',
	elem		: $('.bateaux32'),
	position 	: {
		l 		: 7,
		left 		: 96
	}
}

var bateaux4 = {
	src 		: '',
	elem		: $('.bateaux4'),
	position 	: {
		l 		: 4,
		left 		: 352
	}
}

var bateaux5 = {
	src 		: '',
	elem		: $('.bateaux5'),
	position 	: {
		l 		: 11,
		left 		: 224
	}
}

var objectif = {
	src 		: '',
	elem		: $('.objectif'),
	position 	: {
		l 		: 1,
		c 		: 16
	}
}

var imgs = ['water.png', 'fog.png'];
var $container = $('.tableau');
var tileSize = 32;


$(document).ready(function() {
	initGrid();
});


function initGrid() {
	for (var l = 0; l < grid.length; l++) {
		var line = grid[l];
		for (var c = 0; c < line.length; c++) {
			var cell = line[c];
			var color;

			switch(cell) {
				case 0 :
					img = imgs[0];
					break;
				case 'b' :

					break;
				default :
					img = imgs[1];
					break;
			}

			var tile = $('<div>');
			var tileImg= $('<img>');
			tileImg.attr('src', img);
			tileImg.appendTo(tile);

			tile.addClass('tile');
			tile.appendTo($container);

			tile.css('left', (tileSize * c) + 'px');
			tile.css('top', (tileSize * l) + 'px');
		}
	}
}

//renvoyer la valeur de la tile
function getTileAt(l , c) {
	return grid[l][c];
}

//renvoyer les tiles qui ont la valeur 1
function getTiles(val) {
	var tiles = [];

	for (var l = 0; l < grid.length; l++) {
		var line = grid[l];
		for (var c = 0; c < line.length; c++) {
			var cell = line[c];
			if(cell == val) {
				tiles.push({l, c});
			}
		}

	}

	return tiles;
}

//deplacer le personnage à la case l, c
function moveCharacter(l, c) {
	character.elem.css({
		'top'		: l * tileSize,
		'left'		: c * tileSize
	});

	character.position = {l, c}//character.elem.position();
}

var timer;
var isMoveUp;
var isMoveDown;
var isMoveLeft;
var isMoveRight;
var x= character.position["c"];//Number(character.elem.css('left').replace('px', ''));
var y= character.position["l"];//Number(character.elem.css('top').replace('px', ''));
var xObjectif= objectif.position["c"];//Number(character.elem.css('left').replace('px', ''));
var yObjectif= objectif.position["l"];
var yBateaux2= bateaux2.position["l"];
var yBateaux31= bateaux31.position["l"];
var yBateaux5= bateaux5.position["l"];
var yBateaux32= bateaux32.position["l"];
var yBateaux4= bateaux4.position["l"];

function init() {
	isMoveUp= false;
	isMoveDown= false;
	isMoveRight= false;
	isMoveLeft= false;
	character.elem.css({
		'top'	: 576,
		'left'	: 288
	});
	x= 9;
	y= 18;
	if (timer != null) {
		clearInterval(timer);
	}
	timer= setInterval(update, 100);
}

function update() {			// Essayer d'utiliser plutot la fonction moveCharacter pour le deplacement 
	if (isMoveUp) {
		y -= 1;
		moveCharacter(y, x);
		//character.elem.css('top', y + 'px');
	} 
	if (isMoveDown) {
		y += 1;
		moveCharacter(y, x);
		//character.elem.css('top', y + 'px');
	}
	if (isMoveLeft) {
		x -= 1;
		moveCharacter(y, x);
		//character.elem.css('left', x + 'px');
	}
	if (isMoveRight) {
		x += 1;
		moveCharacter(y, x);
		//character.elem.css('left', x + 'px');
	}
	collision();
	/*console.log(x);
	console.log(y);
	console.log(xObjectif);
	console.log(yObjectif);*/
}

document.addEventListener('keydown', move);
document.addEventListener('keyup', noMove);


function move(evt) {
	switch (evt.keyCode) {
		case 37:
			isMoveLeft= true;
			break;
		case 38:
			isMoveUp= true;
			break;
		case 39:
			isMoveRight= true;
			break;
		case 40:
			isMoveDown= true;
			break;
	}
}

function noMove(evt) {
	switch (evt.keyCode) {
		case 37:
			isMoveLeft= false;
			break;
		case 38:
			isMoveUp= false;
			break;
		case 39:
			isMoveRight= false;
			break;
		case 40:
			isMoveDown= false;
			break;
	}
}

function collision() {
	if (x == xObjectif && y == yObjectif) {
		alert('You Win');
		init();
	}
	if (character.elem.position().left >= Math.round(bateaux2.elem.position().left) - 32 && character.elem.position().left <= Math.round(bateaux2.elem.position().left) + bateaux2.elem.width() && y == yBateaux2) {
		alert('You Loose');
		init();
	}
	if (character.elem.position().left >= Math.round(bateaux31.elem.position().left) - 32 && character.elem.position().left <= Math.round(bateaux31.elem.position().left )+ bateaux31.elem.width()  && y == yBateaux31) {
		alert('You Loose');
		init();
	}
	if (character.elem.position().left >= Math.round(bateaux5.elem.position().left) - 32 && character.elem.position().left <= Math.round(bateaux5.elem.position().left) + bateaux5.elem.width()  && y == yBateaux5) {
		alert('You Loose');
		init();
	}
	if (character.elem.position().left >= Math.round(bateaux32.elem.position().left) - 32 && character.elem.position().left <= Math.round(bateaux32.elem.position().left) + bateaux32.elem.width() && y == yBateaux32) {
		alert('You Loose');
		init();
	}
	if (character.elem.position().left >= Math.round(bateaux4.elem.position().left) - 32 && character.elem.position().left <=Math.round(bateaux4.elem.position().left) + bateaux4.elem.width() && y == yBateaux4) {
		alert('You Loose');
		init();
	}
}

init();