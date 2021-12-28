//Global variables for selected options and view
var selectedLens;
var selectedCamera;
var listView = false;

//events handlers
$(document).ready(function(){
	//generate lists of lens and cameras on page load
	generateLists();

	//click on lens in list
	$('#lens_list').on('click', 'span', function() {
		//update global value
		selectedLens = $(this).attr( "data-id" );
		// console.log('selectedLens = ' + selectedLens);

		//update selector
		$('#question_lens span').text( mountData[selectedLens].selectDisplayName );

		//check choise
		checkChoice();
	});

	//click on camera in list
	$('#camera_list').on('click', 'span', function() {
		//update global value
		selectedCamera = $(this).attr( "data-id" );
		// console.log('selectedCamera = ' + selectedCamera);

		//update selector
		$('#question_camera span').text( mountData[selectedCamera].selectDisplayName );

		//check choise
		checkChoice();
	});

	//click on lens slector
	$('#question_lens').on('click', 'span', function() {
		//check if we not in list view
		if (!listView) {
			//display list
			drawTransitionToList();

			//scroll to lens
			$([document.documentElement, document.body]).animate({
				scrollTop: $("#question_lens").offset().top + 100
			}, 1000);
		}
	});

	//click on camera slector
	$('#question_camera').on('click', 'span', function() {
		//check if we not in list view
		if (!listView) {
			//display list
			drawTransitionToList();

			//scroll to lens
			$([document.documentElement, document.body]).animate({
				scrollTop: $("#question_camera").offset().top + 350
			}, 1000);
		}

	});
	
});

//checking if user choose lens amd camera
function checkChoice() {
	if (selectedCamera == null) {
		//scroll to camera select
		$([document.documentElement, document.body]).animate({
			scrollTop: $("#question_camera").offset().top - 50
		}, 1000);

	} else if (selectedLens == null) {
		//scroll to lens select
		$([document.documentElement, document.body]).animate({
			scrollTop: $("#question_lens").offset().top - 50
		}, 1000);

	} else {
		//compare flanges
		compareFlange();
	}
}

function compareFlange() {
	//compare flanges
	flangesDiff = mountData[selectedLens].flange - mountData[selectedCamera].flange;

	//adapter tolerance in mm
	flangeTolerance = 2;

	//check if difference positive
	if (flangesDiff > 0) {

		//check if difference in tolerance
		if (flangesDiff > flangeTolerance) {
			//yes
			drawAnswer('green','Yes','');
		} else {
			//round flanges difference
			roundedFlangesDiff = Math.round(flangesDiff * 10);

			//yes but
			drawAnswer('yellow','Yes, but...',`flange difference ${roundedFlangesDiff} mm may be short for adapter`);
		}

		//check if we need crop
		checkCrop();

	} else {
		//check if same mounts selected
		if (selectedLens == selectedCamera) {
			//Same
			drawAnswer('green','Yes',"It's the same mount");
		}

		//check Minolta and Sony Alpha
		else if (
			mountData[selectedCamera].selectDisplayName == 'Sony A'
			&& mountData[selectedLens].selectDisplayName == 'Minolta A'
			) {
				//Same
				drawAnswer('green','Yes',"It's the same mount");
		}

		else if (
			mountData[selectedCamera].selectDisplayName == 'Minolta A'
			&& mountData[selectedLens].selectDisplayName == 'Sony A'
			) {
				//Same
				drawAnswer('green','Yes',"It's the same mount");
		}

		//check M37×0.75 and Mini T-mount
		else if (
			mountData[selectedCamera].selectDisplayName == 'Mini T-mount'
			&& mountData[selectedLens].selectDisplayName == 'M37 × 0.75'
			) {
				//Same
				drawAnswer('green','Yes',"It's the same mount");
		}

		else if (
			mountData[selectedCamera].selectDisplayName == 'M37 × 0.75'
			&& mountData[selectedLens].selectDisplayName == 'Mini T-mount'
			) {
				//Same
				drawAnswer('green','Yes',"It's the same mount");
		}

		else {
			//No
			drawAnswer('red','No',"lens flange shorter than camera’s");
		}

	}

	//draw sensor and lens
	drawSensor();
	drawLens();

	//get back to select view
	drawTransitionToSelect();
	
}

//check if we need crop and display it
function checkCrop() {
	//TODO if we have APS-C and FF, then we don't need crop
	//also if sensors sizes equals
	//display crop in #answerCrop

	console.log('checkCrop');
}