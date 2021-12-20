//Function calculates diameter for lens circle
function diameterCalculation(width,height) {
	//calculate hypotenuse
	hypotenuse = Math.sqrt((width ** 2) + (height ** 2));

	//add margin
	hypotenuse += hypotenuse / 10;

	//return round result
	return (Math.round(hypotenuse));

}

