var character = {
	src 		: '',
	elem		: $('.character'),
	position 	: {
		top 		: 576,
		left 		: 288
	}
}

var colors = ['black', 'blue', 'red', 'green', 'white'];
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
				case 1 :
					color = colors[1];
					break;
				case 'p' :
					color = colors[2];
					break;
				case 'b' :
					color = colors[3];
					break;
				default :
					color = colors[0];
					break;
			}

			var tile = $('<div>');
			tile.addClass('tile');
			tile.css('background-color', color);
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

	character.position = character.elem.position();
}

var timer;
var isMoveUp;
var isMoveDown;
var isMoveLeft;
var isMoveRight;
var x= Number(character.elem.css('left').replace('px', ''));
var y= Number(character.elem.css('top').replace('px', ''));

function init() {
	isMoveUp= false;
	isMoveDown= false;
	isMoveRight= false;
	isMoveLeft= false;
	if (timer != null) {
		clearInterval(timer);
	}
	timer= setInterval(update, 100);
}

function update() {
	if (isMoveUp) {
		y -= 32;
		character.elem.css('top', y + 'px');
	} 
	if (isMoveDown) {
		y += 32;
		character.elem.css('top', y + 'px');
	}
	if (isMoveLeft) {
		x -= 32;
		character.elem.css('left', x + 'px');
	}
	if (isMoveRight) {
		x += 32;
		character.elem.css('left', x + 'px');
	}
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
			console.log(isMoveUp);
			console.log(y);
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

init();