

class Model{
	/* constructor - set up properties and binds for the model object
	params: none
	return: undefined (don't return undefined, that will screw it up)
	notes: store your records in an array that is a property of this object
	*/
	constructor(){

	}
	/* getNextID - for version .1-.5, returns the next available ID
	purpose: takes an id property from the constructor, adds one, and returns it
	params: none
	return: (number) the next id
	*/
	getNextID(){

	}
	/* add - add a student to the model
	purpose: 
		take in a name, course, and grade,
		generate an ID (this will be given later by the server, too)
		create new student record with id, name, course, grade, and a reference to the model's remove method
		add the newly made student to the model's list of students
	params: 
		(string) name: the student's name
		(string) course: the student's course
		(number) grade: the student's grade
	return: (number) the current number of students in the list
	*/
	add(  ){

	}
	/* remove - called from the student object when the student is removing itself, so the model can also remove it from the list
	purpose - finds the given student in the model's list, and removes it
	params: (StudentRecord object) the student to remove
	return: (boolean) true if the student was removed, false if not
	*/
	remove(  ){

	}
	/* getAllStudents - get the entire list of students and return it
	params: none
	return: (array) a list of all the student objects
	*/
	getAllStudents(){

	}
	/* getStudentByField - find a particular student by an arbitrary field, for example find the student with a name of "John Smith"
	purpose: 
		take in a field and value, 
		iterate through the student list
		search for the object with the field by the value
		return that student if found, -1 if not
	params: 
		(string) field - the property of the student to look through (for example, name, or course, or grade)
		(multiple) value - the value to search for, for example 'Jack' or 5
	return: (StudentRecord) student if found, (Number) -1 if not found
	*/
	getStudentByField(  ){

	}
	/* calculateGradeAverage - calculate the average grade of all students
	purpose: 
		iterate through all students
		sum up their grades
		divide by the number of grades to get the average and return it
		Will return 0 if there are no students
	params: none
	return: (number) the average grade of all students
	*/
	calculateGradeAverage(){

	}
}