


class SGT_template{
	/* constructor - sets up SGT object and storage of students
	params: (object) elementConfig - all pre-made dom elements used by the app
	purpose: stores the appropriate DOM elements inside of an object
		and uses those reference for later portions of the application
	return: undefined
	*/
	constructor(domEleObj){
		this.displayAllStudents = this.displayAllStudents.bind(this);
		this.readStudent = this.readStudent.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleCancel = this.handleCancel.bind(this);

		this.elementConfig = {}; //all pre-made dom elements used by the app

		for (var key in domEleObj){
			this.elementConfig[key] = domEleObj[key];
		};

		this.data = {};
		
	}

	/* addEventHandlers - add event handlers to premade dom elements
	adds click handlers to add and cancel buttons using the dom elements passed into constructor
	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/
	addEventHandlers(){
		this.elementConfig.addButton.on('click', this.handleAdd);
		this.elementConfig.cancelButton.on('click', this.handleCancel);
	}

	/* clearInputs - take the three inputs and clear their values
	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/
	clearInputs(){
		this.elementConfig.nameInput.val('');
		this.elementConfig.courseInput.val('');
		this.elementConfig.gradeInput.val('');
	}

	/* handleCancel - function to handle the cancel button press
	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/
	handleCancel(){
		this.clearInputs();
	}

	/* createStudent - take in data for a student, make a new Student object, and add it to this.data object

		name : the student's name
		course : the student's course
		grade: the student's grade
		id: the id of the student
	purpose:
			If no id is present, it must pick the next available id that can be used
			when it creates the Student object, it must pass the id, name, course, grade,
			and a reference to SGT's deleteStudent method
	params:
		name : the student's name
		course : the student's course
		grade: the student's grade
		id: the id of the student
	return: false if unsuccessful in adding student, true if successful
	ESTIMATED TIME: 1.5 hours
	*/
	createStudent(name, course, grade, id, deleteCallback){
		debugger;
		console.log('this.elementConfig: ', this.elementConfig);
		
		if(id === undefined){
			id = 1;
		}else if(this.data[id]){
			return false;
		};
		
		while (this.data.hasOwnProperty(`${id}`)) {
			id++;
		};

		this.data[id] = new Student(id, name, course, grade, deleteCallback);

		return true;
	}

	/* doesStudentExist -
		determines if a student exists by ID.  returns true if yes, false if no
	purpose:
			check if passed in ID is a value, if it exists in this.data, and return the presence of the student
	params:
		id: (number) the id of the student to search for
	return: false if id is undefined or that student doesn't exist, true if the student does exist
	ESTIMATED TIME: 15 minutes
	*/
	doesStudentExist(id){
		console.log('doesStudentExist');
		if(this.data[id]){
			return true;
		};
		return false;
	}

	/* handleAdd - function to handle the add button click
	purpose: grabs values from inputs, utilizes the createStudent method to save them, then clears the inputs and displays all students
	params: none
	return: undefined
	ESTIMATED TIME: 1 hour
	*/
	handleAdd(){
		
		var name = this.elementConfig.nameInput.val();
		var course = this.elementConfig.courseInput.val();
		var grade = this.elementConfig.gradeInput.val();

		console.log('name val, course val, grade val: ', name, course, grade);
		
		this.createStudent(name, course, grade);
		this.clearInputs();
		this.displayAllStudents();
	}

	/* readStudent -
		get the data for one or all students
	purpose:
			determines if ID is given or not
			if ID is given, return the student by that ID, if present
			if ID is not given, return all students in an array
	params:
		id: (number)(optional) the id of the student to search for, if any
	return:
		a singular Student object if an ID was given, an array of Student objects if no ID was given
		ESTIMATED TIME: 45 minutes
	*/
	readStudent(id){
		
		if(id === undefined){
			return Object.values(this.data);

		}else if(this.data[id]){
			return this.data[id];

		}else if(!this.data[id]){
			return false;
		};
	}

	/* displayAllStudents - iterate through all students in the this.data object
	purpose:
		grab all students from this.data,
		empty out every student in the dom's display area,
		iterate through the retrieved list,
		then render every student's dom element
		then append every student to the dom's display area
		then display the grade average
	params: none
	return: undefined
	ESTIMATED TIME: 1.5 hours
	*/
	displayAllStudents(){
	
		var studentList = this.data;
		this.elementConfig.displayArea.empty();

		var i = 0;
		var total = 0;

		for(var key in studentList){

			studentList[key].render();

			console.log('studentList render: ', studentList[key].render());

			for(var key1 in studentList[key].domElements)
				this.elementConfig.displayArea.append(studentList[key].domElements[key1]);

			total += studentList[key].data.grade;
			i++;
		};

		this.data.average = total / i;

	}

	/* displayAverage - get the grade average and display it
	purpose: grab the average grade from students in this.data, and shows it on the dom
	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/
	displayAverage(){
		this.elementConfig.averageArea.text(this.data.average);
	}

	/* deleteStudent -
		delete the given student at the given id
	purpose:
			determine if the ID exists in this.data
			remove it from the object
			return true if successful, false if not
			this is often called by the student's delete button through the Student handleDelete
	params:
		id: (number) the id of the student to delete
	return:
		true if it was successful, false if not
		ESTIMATED TIME: 30 minutes
	*/
	deleteStudent(){

	}

	/* updateStudent -
		not used for now.  Will be used later
		pass in an ID, a field to change, and a value to change the field to
	purpose:
		finds the necessary student by the given id
		finds the given field in the student (name, course, grade)
		changes the value of the student to the given value
		for example updateStudent(2, 'name','joe') would change the name of student 2 to "joe"
	params:
		id: (number) the id of the student to change in this.data
		field: (string) the field to change in the student
		value: (multi) the value to change the field to
	return:
		true if it updated, false if it did not
		ESTIMATED TIME: no needed for first versions: 30 minutes
	*/
	updateStudent(){

	}


}
