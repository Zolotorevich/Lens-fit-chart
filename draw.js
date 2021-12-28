//generate lists of lens and cameras
function generateLists() {
	//get all data one by one
	for (i = 0; i < mountData.length; i++) {
		//append lens list
		$( "#lens_list" ).append( '<li><span data-id="' + i + '">' + mountData[i].listDisplayName + "</span></li>" );

		//check for Adaptall
		if (mountData[i].listDisplayName != 'Tamron Adaptall') {
			//append camera list
			$( "#camera_list" ).append( '<li><span data-id="' + i + '">' + mountData[i].listDisplayName + "</span></li>" );
		}
	}

	//add empty line in camera lens fro better colums distribution
	$( "#camera_list" ).append('<li>&nbsp;</li>');
}

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

//transition from select view to list view
function drawTransitionToList() {
	//check if we alredy in this mode
	if (listView) {
		return false;
	}

	//hide answer and it's line
	$('#answer_container').css('display', 'none');
	$('#answer_line').css('display', 'none');

	//hide graphics
	$('#lens_circle').css('display', 'none');
	$('#sensor_square').css('display', 'none');

	//change position of background graphics
	$('#background_graphics_sensors').css('top', '1200px');

	//hide logotype
	$('#rzlogotype').css('display', 'none');

	//increase font
	$('.selector_header').css('font-size', '180px');
	$('.selector_header').css('line-height', '140px');
	$('.selector_header').css('margin', '0 0 50px 0');
	$('.selector_header').css('letter-spacing', '10px');

	//remove hover class
	$('#question_lens span').removeClass('white_hover_pointer');
	$('#question_camera span').removeClass('white_hover_pointer');

	//change container top position
	$('.question_container').css('top', '150px');

	//change lines position and size
	$('#lens_line').css('height', '10px');
	$('#lens_line').css('top', '500px');
	$('#lens_line').css('width', '100%');
	$('#sensor_line').css('height', '10px');
	$('#sensor_line').css('top', '1688px');
	$('#sensor_line').css('width', '100%');
	
	//display lists
	$('.list_container').css('display', 'block');

	//apply view state
	listView = true;

}

//transition from list view to select view
function drawTransitionToSelect() {
	//display answer and it's line
	$('#answer_container').css('display', 'block');
	$('#answer_line').css('display', 'block');

	//display graphics
	$('#lens_circle').css('display', 'block');
	$('#sensor_square').css('display', 'block');

	//change position of background graphics
	$('#background_graphics_sensors').css('top', '0');

	//display logotype
	$('#rzlogotype').css('display', 'block');

	//decrease font
	$('.selector_header').css('font-size', '38px');
	$('.selector_header').css('line-height', '40px');
	$('.selector_header').css('margin', '0 0 23px 0');
	$('.selector_header').css('letter-spacing', '1px');

	//add hover class
	$('#question_lens span').addClass('white_hover_pointer');
	$('#question_camera span').addClass('white_hover_pointer');

	//change container top position
	$('.question_container').css('top', 'calc(50% - 229px)');

	//change lines position and size
	$('#lens_line').css('height', '2px');
	$('#lens_line').css('top', 'calc(50% - 127px)');
	$('#lens_line').css('width', '70%');
	$('#sensor_line').css('height', '2px');
	$('#sensor_line').css('top', 'calc(50% - 1px)');
	$('#sensor_line').css('width', '70%');
	
	//hide lists
	$('.list_container').css('display', 'none');

	//apply view state
	listView = false;
}

//display answer
function drawAnswer(type,title,message) {
	//set title and mesage
	$('#answerHeader').html(title + '<br/><span>' + message + '</span>');

	//set color theme
	if (type == 'red') {
		$('#answer_container').css('border', '2px solid #ce0e0e');
		$('#answerHeader').css('background-color', '#ce0e0e');
		$('#answerHeader').css('color', '#fafafa');
		$('#answer_line').css('background-color', '#ce0e0e');
	}

	if (type == 'green') {
		$('#answer_container').css('border', '2px solid #98ff6d');
		$('#answerHeader').css('background-color', '#98ff6d');
		$('#answerHeader').css('color', '#161616');
		$('#answer_line').css('background-color', '#98ff6d');
	}

	if (type == 'yellow') {
		$('#answer_container').css('border', '2px solid #e2d544');
		$('#answerHeader').css('background-color', '#e2d544');
		$('#answerHeader').css('color', '#161616');
		$('#answer_line').css('background-color', '#e2d544');
	}
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