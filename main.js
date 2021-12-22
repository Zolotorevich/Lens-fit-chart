//Function calculates diameter for lens circle
function diameterCalculation(width,height) {
	console.log('diameterCalculation(' + width + ', ' + height + ')');

	//calculate hypotenuse
	hypotenuse = Math.sqrt((width ** 2) + (height ** 2));
	console.log('hypotenuse = ' + hypotenuse);

	//add margin
	hypotenuse += hypotenuse / 10;
	console.log('hypotenuse + 10% = ' + hypotenuse);

	//return round result
	console.log('diameterCalculation result = ' + Math.round(hypotenuse));
	return (Math.round(hypotenuse));
}

function drawSensor(type,width,height) {
	$("#sensor_square").width(width);
	$("#sensor_square").height(height);
}

function drawLens(type,diameter) {
	$("#lens_circle").width(diameter);
	$("#lens_circle").height(diameter);
}

function hypotenuse(a,b) {
	return Math.sqrt((a ** 2) + (b ** 2));
}