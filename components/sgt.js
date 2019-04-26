


class SGT_template{
	/* constructor - sets up the SGT object and storage for both the student objects and
	                 the DOM element references which the app requires
	params: (object) elementConfig - all pre-made dom elements used by the app
	purpose:
	    To store the student objects which are created
	    To store the appropriate DOM elements inside of an object
		so that they can be used for later portions of the application
	return: undefined
	*/
	constructor( elementConfig ){

	}
	/* addEventHandlers - add event handlers to premade dom elements
						  adds click handlers to both the add and cancel buttons using
						  the dom elements which were passed into the constructor
	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/

	addEventHandlers(){

	}

	/* clearInputs - take the three supplied inputs (name, course, grade)
	                 and clear their values
	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/
	clearInputs(){

	}

	/* handleCancel - function to handle the cancel button being pressed
	                  which should clear the inputs of the app on click
	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/
	handleCancel(){

	}

	/* createStudent - takes in all the needed data for a student,
					   makes a new Student object,
					   and adds it to the this.data object

					   name : the student's name
					   course : the student's course
					   grade: the student's grade
					   id: the id of the student
	purpose:
			If no id is present, the function must pick the next available id that can be used.
			Once that is complete, it must create the Student object,
			to do this, it must pass the id, name, course, grade,
			and a reference to SGT's deleteStudent method
	params:
		name : the student's name
		course : the student's course
		grade: the student's grade
		id: the id of the student
	return: false if unsuccessful in adding student, true if successful
	ESTIMATED TIME: 1.5 hours
	*/
	createStudent(name, course, grade, id){

	}

	/* doesStudentExist - determines if a student exists by ID.
						  returns true if student does exist by ID
						  returns false if student does not exist by ID
	purpose:
			check if passed in id exists as a key in this.data,
			and confirms or denies existence of student based on that id
	params:
		id: (number) the id of the student to search for
	return: false if id is undefined, or if that student doesn't exist,
	        true if the student does exist
	ESTIMATED TIME: 15 minutes
	*/
	doesStudentExist(id){

	}

	/* handleAdd - function to handle the add button click
	purpose: grabs values from the inputs,
			 utilizes the createStudent method to create a student object based on the input values
			 and store it in the this.data object,
			 clears the inputs and displays all students
	params: none
	return: undefined
	ESTIMATED TIME: 1 hour
	*/
	handleAdd(){

	}

	/* readStudent - get the data an individual student or all students
	purpose:
			determines if an id has been passed in as an argument
			if id is passed in, return the student associated with that id, if they exist
			if id is not passed in, return all students currently in this.data as an array of objects
	params:
		id: (number)(optional) the id of the student to search for, if any
	return:
		a singular Student object if an ID was given, an array of Student objects if no ID was given
		ESTIMATED TIME: 45 minutes
	*/
	readStudent(id){

	}

	/* displayAllStudents - iterate through all students in the this.data object
	purpose:
		grab all students from this.data,
		empty out every student currently in the dom's display area,
		iterate through the this.data object,
		render every student's dom element
		append every student to the dom's display area
		call the displayAllStudents method
	params: none
	return: undefined
	ESTIMATED TIME: 1.5 hours
	*/
	displayAllStudents(){

	}

	/* displayAverage - get the grade average of all students in this.data and display it
	purpose: calculate the average grade from all students in this.data
	         append the calculated grade into the proper element on the DOM

	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/

	displayAverage(){

	}

	/* deleteStudent - delete the given student at the id which is passed in as an argument
	purpose:
			determine if the id currently exists in this.data
			if the id exists, remove it from the object
			return true if deletion is successful
		    return false if deletion is not successful
			this is often called by the student's delete button through the Student handleDelete method
	params:
		id: (number) the id of the student to delete
	return:
		true if it was successful, false if not
		ESTIMATED TIME: 30 minutes
	*/
	deleteStudent(id){

	}

	/* updateStudent - not used for now.  Will be used later.
		pass in a student id, a specific field to change, and a value to change the field to
	purpose:
		finds the necessary student by the given id
		finds the passed in field in the student (name, course, or grade)
		changes the value of the student to the passed in value
		for example updateStudent(2, 'name','joe') would change the name of student 2 to "joe"
	params:
		id: (number) the id of the student to change in this.data
		field: (string) the field to change in the student
		value: (multi) the value to change the field to
	return:
		true if it updated the student information, false if it did not
		ESTIMATED TIME: not needed for initial versions: 30 minutes
	*/
	updateStudent(){

	}


}
