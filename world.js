/* 
 * This javascript implements the main algorithm.
 */

var world = [[]];
var matrix_size = 256;
var energy = 0;
var T = 1;
var magnetization = 0;

var historyNumber = 128;
var magnetizationHistory = [];

function initializeWorld(){
	T = 2.26918531421;
	world = Array(matrix_size).fill().map(()=>Array(matrix_size).fill());
	for(var i = 0; i < matrix_size; i++){
		for(var j = 0; j < matrix_size; j++){
			world[i][j] = (Math.random() < .5) ? 1 : -1;
		}
	}
	energy = currentEnergy();
	magnetization = currentMagnetization();
	
	magnetizationHistory = Array(historyNumber);
	for(var i = 0; i < historyNumber; i++){
		magnetizationHistory[i] = 0;
	}
	magnetizationHistory[historyNumber - 1] = magnetization;
}

function saveMagnetizationHistory(){
	for(var i = 0; i < historyNumber - 1; i++){
		magnetizationHistory[i] = magnetizationHistory[i + 1];
	}
	magnetizationHistory[historyNumber - 1] = currentMagnetization();

}

var neighborX = [1, 0, -1, 0];
var neighborY = [0, 1, 0, -1];
function currentEnergy(){
	var e = 0;
	for(var i = 0; i < matrix_size; i++){
		for(var j = 0; j < matrix_size; j++){
			e += energyAt(i, j);
		}
	}
	return e;
}

function currentMagnetization(){
	var m = 0;
	for(var i = 0; i < matrix_size; i++){
		for(var j = 0; j < matrix_size; j++){
			m += world[i][j];
		}
	}
	return m / (matrix_size * matrix_size);
}

function energyAt(i, j){
	var e = 0;
	for(var k = 0; k < 4; k++){
		var ni = (i + neighborX[k] + matrix_size) % matrix_size;
		var nj = (j + neighborY[k] + matrix_size) % matrix_size;
		e += world[i][j] * world[ni][nj];
	}
	return e / 4;
}

function loopWorld(){
	/* Choose random site */
	var randomX = Math.floor(Math.random() * matrix_size);
	var randomY = Math.floor(Math.random() * matrix_size);
	
	var dE = 2 * 4 * energyAt(randomX, randomY);
	if(dE < 0){
		world[randomX][randomY] = -world[randomX][randomY];
	}else if(Math.random() < Math.exp(-dE / T)){
		world[randomX][randomY] = -world[randomX][randomY];
	}
}

