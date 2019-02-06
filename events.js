/* 
 * This javascript handles the input from web browser events.
 */

window.onload = eventInitialize;

// Canvas
var elementCanvas;
// Mouse Corrdinates
var mouse = {
	x: 0,
	y: 0
};
var elementText;
var elementSlider;
var elementButton;

/** Event Initialize **/

function eventInitialize(){
	// Element binding
	elementCanvas = document.getElementById("canvasMain");
	elementCanvas.addEventListener("mousedown", eventMouseDown);
	elementCanvas.addEventListener("mouseup", eventMouseUp);
	elementCanvas.addEventListener("mousemove", eventMouseMove);

	elementSlider = document.getElementById('slider');
	elementSlider.addEventListener("input", eventSlideInput)

	elementText = document.getElementById('temperatureText');

	elementButton = document.getElementById('buttonReset');
	elementButton.addEventListener("click", eventButtonPress);

	// Initialization
	
	initDraw();
	initializeWorld();
	
	setInterval(intervalTick, 33);

	draw();
}

/** intervalTick **/

function intervalTick() {
	for(var i = 0; i < 100000; i++){
		loopWorld();
	}
	saveMagnetizationHistory();
	draw();
	
	elementText.innerHTML = "T = " + T;
}

function eventButtonPress(){
	T = 2.26918531421;
	elementText.innerHTML = "T = " + T;
	elementSlider.value = T * 100;
}

/** Event Slide Input **/

function eventSlideInput(){
	T = parseInt(this.value) / 100;
	console.log(T);
}

/** Event Mouse Down **/

function eventMouseDown(evt){
	//updateMouseCoord(evt);
	
	draw();
}

/** Event Mouse Up **/

function eventMouseUp(evt){
	//updateMouseCoord(evt);

	//draw();
}

/** Event Mouse Move **/

function eventMouseMove(evt){
	//updateMouseCoord(evt);

	//draw();
}

/** Mouse **/

function updateMouseCoord(evt){
	var clientCanvasRect = elementCanvas.getBoundingClientRect();
	var m = {x:-1, y:-1};
	scaleX = canvas.width / clientCanvasRect.width,
	scaleY = canvas.height / clientCanvasRect.height;
	m.x = Math.round((evt.clientX - clientCanvasRect.left) * scaleX - 0);
	m.y = -Math.round((evt.clientY - clientCanvasRect.top) * scaleY - 0);

	mouse = m;
}

