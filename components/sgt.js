


class SGT_template{
	/* constructor - sets up sgt object 
	params: (object) elementConfig - all pre-made dom elements used by the app.  See script.js for a list of elements coming in via the object
	purpose: instantiates a model and stores it in the object
	return: undefined
	*/
	constructor(  ){
		//this has been done for you to show instantiating an object within another object 
		this.model = new Model(); 
		//the rest of the constructor must be filled in by you

	}
	/* addEventHandlers - add event handlers to premade dom elements
	adds click handlers to add and cancel buttons using the dom elements passed into constructor
	params: none
	return: undefined
	*/

	addEventHandlers(){

	}
	/* clearInputs - take the three inputs and clear their values
	params: none
	return: undefined
	*/
	clearInputs(){

	}
	/* handleCancel - function to handle the cancel button press
	params: none
	return: undefined
	*/
	handleCancel(){

	}
	/* handleAdd - function to handle the add button click
	purpose: grabs values from inputs, utilizes the model's add method to save them, then clears the inputs and displays all students
	params: none
	return: undefined
	*/
	handleAdd(){

	}
	/* displayAllStudents - iterate through all students in the model
	purpose: 
		grab all students from model, 
		iterate through the retrieved list, 
		then render every student's dom element
		then append every student to the dom's display area
		then display the grade average
	params: none
	return: undefined
	*/
	displayAllStudents(){

	}
	/* displayAverage - get the grade average and display it
	purpose: grab the average grade from the model, and show it on the dom
	params: none
	return: undefined */
	displayAverage(){

	}
}