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
	
	//apply new sensor position
	$("#sensor_square").css('top', "calc(50% - " + (height / 2) + "px)");
	$("#sensor_square").css('left', "calc(70% - " + (width / 2) + "px)");

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

	//apply new lens position
	$("#lens_circle").css('top', "calc(50% - " + (diameter / 2) + "px)");
	$("#lens_circle").css('left', "calc(70% - " + (diameter / 2) + "px)");

}


function hypotenuse(a,b) {
	return Math.sqrt((a ** 2) + (b ** 2));
}