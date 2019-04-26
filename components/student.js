

class Student{
	/* constructor - take in information about the student to be created via its paramaters and saves it,
		             creates storage for student dom elements
		             store the deletion callback from the SGT_template class
		             binds event handlers
	params:
		(number) id - the id of this student
		(string) name - the name of the student
		(string) course - the course of the student
		(number) grade - the grade of the student
		(function) deleteCallback - the removal function from the SGT_template to call when this student wants to be
		removed from the SGT_templates's list
	return: undefined (don't return undefined, it will screw it up a constructor, don't put a return)
	ESTIMATED TIME: 30 minutes to understand
	*/
	constructor(id, name, course, grade, deleteCallback=()=>{}){
		//this method has been built out to help you understand the general structure better
		this.data = {
			id: id,
			name: name,
			course: course,
			grade: parseInt(grade)
		};
		this.deleteCallback = deleteCallback;
		this.domElements = {
			row: null,
			name: null,
			course: null,
			grade: null,
			operations: null,
			deleteButton: null
		};

	}

	/* getData - gets all of the currently stored student data as an object full of objects
	params: none
	return: (object) an object with the following data
		(number): id
		(string): name
		(string): course
		(number): grade
	ESTIMATED TIME: 30 minutes
	*/
	getData(){
	}

	/* render - create and return a table row (TR) with 4 table cells (TD). Content of TDs will be:
		        name : the student's name
		        course : the student's course
		        grade: the student's grade
		        operations: holds any buttons needed for current or future student operations - will hold a delete button for now
	purpose:
		create the TR and 4 TDs,
		put the 4 TDs inside the TR.
		Add the button to the operation TD
		create a click handler for the button and add the StudentRecord's handleDelete method as a callback
		store all of these values in the data object in the constructor
		return the TR you created
	params: none
	return: (jquery dom element) the tr you create which contains the student dom elements
	ESTIMATED TIME: 2 hours
	*/
	render(){

	}

	/* handleDelete - call the SGT_template delete callback which was passed into the student constructor,
	                  and then remove this student's dom element from the place in the DOM where it was appended
	purpose:
		call the callback that was passed into the constructor and pass into it the student's id as an argument
		remove this object's dom element row to erase the entire dom element
	ESTIMATED TIME: 15 minutes
	*/
	handleDelete(){

	}

	/* update - change a value in the student record
	purpose: ensure that the field is one that can be changed (either id, name, course, or grade)
		if the field is not changable, return false
		If the field is changable, update the value
			save the updated value into the student properties which are stored in the constructor
			then, update the dom element related to the field with the proper text
				(for example, if name was changed, go to the student's name TD and change the name as well)
			and return true
	params:
		(string) field - the field in the object to change
		(multiple) value - the value to change the field to
	return: (boolean) true if it was changed, false if it was not
	ESTIMATED TIME: 1.5 hours
	*/
	update( field, value ){



	}
}
