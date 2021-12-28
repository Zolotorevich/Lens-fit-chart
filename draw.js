//values for lines to sensor square and circle
var maxSensorWidth;
var maxLensDiameter;


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

//regenerate camera or lens lists
function reGenerateList(listType) {
	if (listType == 'lens_list') {
		//clear lens list
		$( "#lens_list" ).html('');

		//regenerate lens list
		for (i = 0; i < mountData.length; i++) {
			//check flanges
			if (mountData[i].flange >= mountData[selectedCamera].flange) {
				//append normal
				$( "#lens_list" ).append( '<li><span data-id="' + i + '">' + mountData[i].listDisplayName + "</span></li>" );
			} else {
				//append opacity
				$( "#lens_list" ).append( '<li><span style="opacity:.5;" data-id="' + i + '">' + mountData[i].listDisplayName + "</span></li>" );
			}
		}
		
	} else {
		//clear camera list
		$( "#camera_list" ).html('');

		//regenerate lens list
		for (i = 0; i < mountData.length; i++) {

			//check for Adaptall
			if (mountData[i].listDisplayName != 'Tamron Adaptall') {
				//check flanges
				if (mountData[i].flange <= mountData[selectedLens].flange) {
					//append normal
					$( "#camera_list" ).append( '<li><span data-id="' + i + '">' + mountData[i].listDisplayName + "</span></li>" );
				} else {
					//append opacity
					$( "#camera_list" ).append( '<li><span style="opacity:.5;" data-id="' + i + '">' + mountData[i].listDisplayName + "</span></li>" );
				}
			}
		}

		//add empty line in camera lens fro better colums distribution
		$( "#camera_list" ).append('<li>&nbsp;</li>');
	}
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
	$('#lens_container').css('display', 'none');
	$('#sensors_container').css('display', 'none');
	$('#graphics_labels_container').css('display', 'none');
	
	//change position of background graphics
	$('#background_graphics_sensors').css('top', '1200px');

	//increase back graphics lens height, so it's not crop
	$('#background_graphics_lens').css('height', '105%');

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

	//hide additional line
	$('#lens_line_vertical').css('display', 'none');
	
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
	$('#lens_container').css('display', 'block');
	$('#sensors_container').css('display', 'block');
	$('#graphics_labels_container').css('display', 'block');

	//change position of background graphics
	$('#background_graphics_sensors').css('top', '0');

	//decrease back graphics lens height
	$('#background_graphics_lens').css('height', '100%');

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

	//change lines position
	$('#lens_line').css('height', '2px');
	$('#lens_line').css('top', 'calc(50% - 127px)');
	$('#sensor_line').css('height', '2px');
	$('#sensor_line').css('top', 'calc(50% - 1px)');
	
	//change sensor line size
	$('#sensor_line').css('width', 'calc(70% - ' + (maxSensorWidth / 2) + 'px)');


	//check if lens radius less than margin betwee lines
	//note: vertical margin between lines is 124px
	if ((maxLensDiameter / 2) < 124) {
		//change lens line size
		$('#lens_line').css('width', 'calc(70% + 2px)');

		//change height of additional line
		$('#lens_line_vertical').css('height', 'calc(126px - ' + (maxLensDiameter / 2) + 'px)');

		//display additional line
		$('#lens_line_vertical').css('display', 'block');
		
	} else if ((maxLensDiameter / 2) == 124) {
		//change lens line size
		$('#lens_line').css('width', 'calc(70% - 124px)');
	} else {
		//calculate margin for lens line
		lensLineMargin = Math.round(Math.sqrt(((maxLensDiameter / 2) ** 2) - (124 ** 2)));

		//change lens line size
		$('#lens_line').css('width', 'calc(70% + 3px - ' + lensLineMargin + 'px)');
	}

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


//draw sensors
function drawSensor() {
	//clear sensors
	$('#sensors_container').html('');

	//clear max lens diameter
	maxSensorWidth = 0;

	//get senesors data
	for (i = 0; i < mountData[selectedCamera].sensor.length; i++) {

		sensorName = mountData[selectedCamera].sensor[i][0]
		sensorWidth = mountData[selectedCamera].sensor[i][1];
		sensorHeight = mountData[selectedCamera].sensor[i][2];

		//check if this sensor the biggest
		if (sensorWidth > maxSensorWidth) {
			maxSensorWidth = sensorWidth;
		}

		//draw sensor
		$('#sensors_container').append('<div style="width:' + sensorWidth + 'px; height:' + sensorHeight + 'px; left:calc(70% - ' + (sensorWidth / 2) + 'px); top:calc(50% - ' + (sensorHeight / 2) + 'px);"></div>');

		//draw sensor names
		$('#graphics_labels_container').append('<div class="graphics_labels" style="top:calc(50% - 6px + ' + (sensorHeight / 2) + 'px);"><div class="sensor_label">' + sensorName + '</div></div>');

	}

}

//draw lens cicles
function drawLens() {
	//clear lens
	$('#lens_container').html('');

	//clear max sensor width
	maxLensDiameter = 0;

	//get senesors data
	for (i = 0; i < mountData[selectedLens].sensor.length; i++) {

		sensorName = mountData[selectedLens].sensor[i][0];
		sensorWidth = mountData[selectedLens].sensor[i][1];
		sensorHeight = mountData[selectedLens].sensor[i][2];

		//find lens diameter
		lensDiameter = Math.round(Math.sqrt((sensorWidth ** 2) + (sensorHeight ** 2))) + 10; // +10px

		//check if its bigger diameter
		if (lensDiameter > maxLensDiameter) {
			maxLensDiameter = lensDiameter;
		}

		//draw lens circle
		$('#lens_container').append('<div style="width:' + lensDiameter + 'px; height:' + lensDiameter + 'px; left:calc(70% - ' + (lensDiameter / 2) + 'px); top:calc(50% - ' + (lensDiameter / 2) + 'px);"></div>');

		//draw sensor names
		$('#graphics_labels_container').append('<div class="graphics_labels" style="top:calc(50% - 6px - ' + (lensDiameter / 2) + 'px);"><div class="lens_label">' + sensorName + '</div></div>');

	}

}

