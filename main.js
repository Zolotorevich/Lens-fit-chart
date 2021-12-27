//Global variables for selected options
var selectedLens;
var selectedCamera;

//events handlers
$(document).ready(function(){

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

	//check if difference positiove
	if (flangesDiff > 0) {
		console.log('YES');

		//check if difference in tolerance
		if (flangesDiff < flangeTolerance) {
			console.log('YES, BUT');
		}
	} else {
		//check if same mounts selected
		if (selectedLens == selectedCamera) {
			console.log('SAME');
		}

		//check Minolta and Sony Alpha
		else if (
			mountData[selectedCamera].selectDisplayName == 'Sony A'
			&& mountData[selectedLens].selectDisplayName == 'Minolta A'
			) {
			console.log('SAME');
		}

		else if (
			mountData[selectedCamera].selectDisplayName == 'Minolta A'
			&& mountData[selectedLens].selectDisplayName == 'Sony A'
			) {
			console.log('SAME');
		}

		else {
			console.log('NO');
		}

	}

	//display crop (optional)

	//draw graphics
	
}