
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
