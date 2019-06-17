


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
		this.deleteStudent = this.deleteStudent.bind(this);
		this.retrieveSuccess = this.retrieveSuccess.bind(this);
		this.retrieveStudentData = this.retrieveStudentData.bind(this);
		// this.deleteStudentData = this.deleteStudentData.bind(this);

		this.average = 0;
		this.elementConfig = {}; //all pre-made dom elements used by the app
		this.elementConfig.retrieveButton = $('#retrieveButton');

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
		this.elementConfig.retrieveButton.on('click', this.retrieveStudentData);
		
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

		if(id === undefined){
			id = 1;
		}else if(this.data[id]){
			return false;
		};
		
		while (this.data.hasOwnProperty(`${id}`)) {
			id++;
		};

		this.data[id] = new Student(id, name, course, grade, this.deleteStudentAjaxHandler);



		return this.data[id];
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
		if (!this.elementConfig.nameInput.val())
			return;

		
		var name = this.elementConfig.nameInput.val();
		var course = this.elementConfig.courseInput.val();
		var grade = this.elementConfig.gradeInput.val();

		var newStudent = this.createStudent(name, course, grade);
		this.clearInputs();

		this.addStudentToServer(name, course, grade);

		this.elementConfig.displayArea.empty();
		this.displayAllStudents();
	}

	addStudentToServer(name, course, grade){

		var ajaxConfig = {
			url: 'http://s-apis.learningfuze.com/sgt/create',
			method: 'post',
			dataType: 'json',
			data: { api_key: 'tC57qwUCPI', name: name, course: course, grade: grade },
			success: function(data, status, xhr){
				console.log('data: ', data);
				console.log('status: ', status);
				console.log('xhr: ', xhr);
			},
			error: function (xhr, status, error) {
				console.log('Error on ajax call');
			},
			complete: function () {
				console.log('addStudentToServerComplete')
			}
		};

		$.ajax(ajaxConfig);
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
		var display = this.elementConfig.displayArea.empty();

		var i = 0;
		var total = 0;

		for(var key in studentList){

			studentList[key].render();

			display.append(studentList[key].domElements.row);

			total += studentList[key].data.grade;
			i++;
		};
		
		this.average = (total / i).toFixed(2);
		this.displayAverage();

	}

	/* displayAverage - get the grade average and display it
	purpose: grab the average grade from students in this.data, and shows it on the dom
	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/
	displayAverage(){
		this.elementConfig.averageArea.text(this.average);
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
	deleteStudent(id, event){
		
		if(this.data[id]){

			delete this.data[id];

			return true;
		};

		return false;
	}

	// deleteSuccess(data, status, xhr){
	// 	console.log('data: ', data);
	// 	console.log('status: ', status);
	// 	console.log('xhr: ', xhr);

	// }

	// deleteStudentData(){

	// 	var ajaxConfig = {
	// 		url: 'http://s-apis.learningfuze.com/sgt/delete',
	// 		method: 'post',
	// 		dataType: 'json',
	// 		data: { api_key: 'tC57qwUCPI' },
	// 		success: this.deleteSuccess,
	// 		error: function () {
	// 			console.log('Error on ajax call');
	// 		}
	// 	};

	// 	$.ajax(ajaxConfig);
	// }

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
	updateStudent(id, targetField, value){

	}

	retrieveSuccess(object){

		if(object === undefined){
			console.log('Server contacted successfully, error retrieving data object.')
		}else{
			console.log("object: ", object);
			console.log('this: ', this);
			for(var i = 0; i < object.data.length; i++){
				var name = object.data[i].name;
				var grade = object.data[i].grade;
				var course = object.data[i].course;
				var id = object.data[i].id;

				this.createStudent(name, course, grade, id);
			};
			console.log('all students created and added')
			this.displayAllStudents();
			this.displayAverage();
		};
	}

	retrieveStudentData(){

		console.log('retrieve Student Data called');

		var ajaxConfig = {
			url: 'http://s-apis.learningfuze.com/sgt/get',
			method: 'post',
			dataType: 'json',
			data: { api_key: 'tC57qwUCPI'},
			success: this.retrieveSuccess,
			error: function(){
				console.log('Error on ajax call');
			},
			complete: function(){
				console.log('retrieveStudentDataComplete');
			}
		};

		$.ajax(ajaxConfig);
	}
}

