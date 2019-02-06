/* 
 * This javascript renders in canvas.
 */

var canvas, ctx;
var graphCanvas, graphCtx;

var pixelSize = 2;

var grayPixels = [];

/** Initialization **/

function initDraw(){
	canvas = document.getElementById("canvasMain");
	ctx = canvas.getContext("2d");

	graphCanvas = document.getElementById("canvasGraph");
	graphCtx = graphCanvas.getContext("2d");

}

/** Main draw **/

function draw(){ 
	clearCanvas();
	drawWorld();

	clearGraphCanvas();
	drawGraph();
}

/** Main draw methods **/

/** Clear Canvas **/

function clearCanvas(){
	ctx.fillStyle = "rgba(255, 255, 255, 1)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/** Clear Graph Canvas **/

function clearGraphCanvas(){
	graphCtx.fillStyle = "rgba(255, 255, 255, 1)";
	graphCtx.fillRect(0, 0, graphCanvas.width, graphCanvas.height);
}

/** Draw world **/

function drawWorld(){
	ctx.fillStyle = "black";
	for(var i = 0; i < matrix_size; i++){
		for(var j = 0; j < matrix_size; j++){
			if(world[i][j] > 0){
				ctx.fillRect(i * pixelSize, j * pixelSize, pixelSize, pixelSize);	
			}
		}
	}
}

/** Draw graph **/

var c = 0;
function drawGraph(){
	graphCtx.lineWidth = 1;

	graphCtx.strokeStyle = "rgba(0,	255, 0, 1)";
	graphCtx.beginPath();
	graphCtx.moveTo(0, graphCanvas.height / 2);
	graphCtx.lineTo(graphCanvas.width, graphCanvas.height / 2);
	graphCtx.stroke();

	graphCtx.beginPath();
	graphCtx.strokeStyle = "rgba(255, 0, 0, 1)";
	graphCtx.moveTo(0, graphCanvas.height / 2);
	for(var i = 0; i < historyNumber; i++){
		graphCtx.lineTo(i * graphCanvas.width / historyNumber, magnetizationHistory[i] * 1 * graphCanvas.height / 2 + graphCanvas.height / 2);
	}
	graphCtx.stroke();

	//console.log(magnetizationHistory[historyNumber - 128]);
}
