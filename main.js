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

function drawSensor(width,height) {
	//check if values are valid
	if (isNaN(width) || isNaN(height) || width < 0 || height < 0) {
		//invalid values
		console.log('ERROR: drawSensor gets invalid values:' + 'width = ' + width + '; height = ' + height);
		return false;
	}
	
	//change sensor size
	$("#sensor_square").width(width);
	$("#sensor_square").height(height);

	//get midpoint position
	midpoint = calculateMidPoint();

	//calculate sensor position
	sensorVerticalPosition = midpoint.vertical - (height / 2);
	sensorHorizontalPosition = midpoint.horizontal - (width / 2);
	
	//apply new sensor position
	$("#sensor_square").css('top', sensorVerticalPosition + "px");
	$("#sensor_square").css('left', sensorHorizontalPosition + "px");

}

function drawLens(diameter) {
	//check if value are valid
	if (isNaN(diameter) || diameter < 0) {
		//invalid value
		console.log('ERROR: drawLens gets invalid value: ' + 'diameter = ' + diameter);
		return false;
	}

	//change lens size
	$("#lens_circle").width(diameter);
	$("#lens_circle").height(diameter);

	//get midpoint position
	midpoint = calculateMidPoint();

	//calculate lens position
	lensVerticalPosition = midpoint.vertical - (diameter / 2);
	lensHorizontalPosition = midpoint.horizontal - (diameter / 2);

	//apply new lens position
	$("#lens_circle").css('top', lensVerticalPosition + "px");
	$("#lens_circle").css('left', lensHorizontalPosition + "px");

}

function calculateMidPoint() {
	//calculate vertical position
	vertical = $(window).height() / 2;

	//calculate horizontal position
	horizontal = $(window).width() * 0.70;

	//return values in object
	return {vertical:vertical, horizontal:horizontal};
}

function hypotenuse(a,b) {
	return Math.sqrt((a ** 2) + (b ** 2));
}