


class SGT_template{
	/* constructor - sets up sgt object 
	params: (object) elementConfig - all pre-made dom elements used by the app
	purpose: instantiates a model and stores it in the object
	return: undefined
	*/
	constructor( elementConfig ){
		this.data = {};
		this.studentCount = 0;
		this.buttons = {
			add: elementConfig.addButton,
			cancel: elementConfig.cancelButton,
			modalClose: elementConfig.modalClose
		}
		this.inputs = {
			name: elementConfig.nameInput,
			course: elementConfig.courseInput,
			grade: elementConfig.gradeInput,
			instructor: elementConfig.instructorInput,
			notes: elementConfig.notesInput
		}
		this.displayAreas = {
			students : elementConfig.displayArea,
			average : elementConfig.averageArea,
			modalShadow: elementConfig.modalShadow,
			modalContent: elementConfig.modalContent,	
		}
		this.handleAdd = this.handleAdd.bind( this );
		this.handleCancel = this.handleCancel.bind( this );
		this.deleteStudent = this.deleteStudent.bind(this);
		this.handleDataFromServer = this.handleDataFromServer.bind(this);
		this.handleError = this.handleError.bind(this);
		this.showStudentDetails = this.showStudentDetails.bind(this);
		this.getOneStudent_Server = this.getOneStudent_Server.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.showModal = this.showModal.bind(this);

		this.getAllStudents_Server();
	}
	/* addEventHandlers - add event handlers to premade dom elements
	adds click handlers to add and cancel buttons using the dom elements passed into constructor
	params: none
	return: undefined
	*/

	addEventHandlers(){
		this.buttons.add.click( this.handleAdd );
		this.buttons.cancel.click( this.handleCancel );
		this.buttons.modalClose.click( this.hideModal );
	}
	/* clearInputs - take the three inputs and clear their values
	params: none
	return: undefined
	*/
	clearInputs(){
		this.inputs.name.val('');
		this.inputs.course.val('');
		this.inputs.grade.val('');
		this.inputs.instructor.val('');
		this.inputs.notes.val('');
	}
	/* handleCancel - function to handle the cancel button press
	params: none
	return: undefined
	*/
	handleCancel(){
		this.clearInputs();
	}
	/* handleAdd - function to handle the add button click
	purpose: grabs values from inputs, utilizes the model's add method to save them, then clears the inputs and displays all students
	params: none
	return: undefined
	*/
	handleAdd(){
		this.createStudent_Server( 
			this.inputs.name.val(), 
			this.inputs.course.val(), 
			this.inputs.grade.val(), 
			this.inputs.instructor.val(),
			this.inputs.notes.val()
		);
		this.clearInputs();
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
		var studentDoms = [];
		var allStudents = this.readStudent();
		for( var i=0; i< allStudents.length; i++){
			var currentStudent = allStudents[i];
			studentDoms.push( currentStudent.render() );
		}
		this.displayAreas.students.empty().append( studentDoms );
		this.displayAverage();
	}
	/* displayAverage - get the grade average and display it
	purpose: grab the average grade from the model, and show it on the dom
	params: none
	return: undefined */
	displayAverage(){
		var sum = 0;
		for( var index in this.data){
			sum += this.data[index].getData().grade;
		}
		var average = sum / this.studentCount;
		this.displayAreas.average.text( average.toFixed(2) );
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
	*/
	createStudent(name, course, grade, received, id, notes=''){
		if(this.data.hasOwnProperty(id)){
			return false;
		}
		if(id===undefined){
			id = this.studentCount+1;
			while(this.data.hasOwnProperty(id)){
				id++;
			}
		}
		var student = new Student(
			id, name, course, grade, received, notes,  
			this.deleteStudent,
			this.getOneStudent_Server
		);
		this.data[id] = student;
		return true;
	}
	/* doesStudentExist - 
		deermines if a student exists by ID.  returns true if yes, false if no
	purpose: 
			check if passed in ID is a value, if it exists in this.data, and return the presence of the student
	params: 
		id: (number) the id of the student to search for
	return: false if id is undefined or that student doesn't exist, true if the student does exist
	*/
	doesStudentExist(id){
		if(id===undefined){
			return false;
		}		
		if(this.data.hasOwnProperty(id)){
			return true
		}
		return false;
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
	*/
	readStudent(id){
		if(id!==undefined && this.doesStudentExist(id)){
			return this.data[id];
		} else {
			return Object.values(this.data);
		}
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
		true if it updatd, false if it did not
	*/
	updateStudent(id, field, value){
		if(id!==undefined && this.doesStudentExist(id)){
			return this.data[id].update(field, value);
		}
		return false;
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
	*/
	deleteStudent(id){
		this.deleteStudent_Server(id);
		// if(id!==undefined && this.doesStudentExist(id)){
		// 	delete this.data[id];
		// 	return true;
		// }
		// return false;
	}
	handleDataFromServer( response ){
		if(response && response.success){
			var data = response.data;
			//createStudent(name, course, grade, received, id, notes){
			for( var studentIndex = 0; studentIndex < data.length; studentIndex++){
				this.createStudent( 
					data[studentIndex].name, 
					data[studentIndex].course, 
					data[studentIndex].grade, 
					data[studentIndex].added,
					data[studentIndex].id
				);
			}
			this.studentCount = data.length;
			this.displayAllStudents();			
		} else {
			this.handleError( response.error );
		}
	}
	resetStudents(){
		this.data = {};
		this.studentCount = 0;		
	}
	getAllStudents_Server(){
		this.resetStudents();
		$.ajax({
			url: 'server/getstudentlist.php',
			dataType: 'json',
			method: 'post',
			success: this.handleDataFromServer,
			error: this.handleError
		});
	}
	handleError(response, xtpObj, rawResponse){
		console.error('error: ' + rawResponse);
	}
	showStudentDetails( response ){
		if(response && response.success){
			var studentID = response.data.id;
			delete response.data.id;
			for( var key in response.data){
				this.updateStudent(studentID, key, response.data[key]);
			}
			var student = this.readStudent(studentID);
			this.showModal( student.renderDetails());
		}
	}
	getOneStudent_Server( id ){

		$.ajax({
			url: 'server/getstudentdetails.php',
			dataType: 'json',
			data: { id: id },
			method: 'post',
			success: this.showStudentDetails,
			error: this.handleError
		});
	}
	createStudent_Server( name, course, grade, instructor, notes){
		$.ajax({
			url: 'server/createstudent.php',
			data: {
				name:name,
				course:course,
				grade: grade,
				instructor: instructor,
				notes, notes
			},
			dataType: 'json',
			method: 'post',
			success: (response)=>{
				if(response.success){
					this.getAllStudents_Server();
				}
				else{
					this.handleError( response.error );
				}
			},
			error: this.handleError
		})
	}
	deleteStudent_Server( id ){
		$.ajax({
			url: 'server/deletestudent.php',
			data: {
				id:id
			},
			dataType: 'json',
			method: 'post',
			success: (response)=>{
				if(response.success){
					this.getAllStudents_Server();
				}
				else{
					this.handleError( response.error );
				}
			},
			error: this.handleError
		})
	}
	showModal(content){
		if(content!==undefined){
			this.displayAreas.modalContent.empty().append(content);
		}
		this.displayAreas.modalShadow.show()
	}
	hideModal(){
		this.displayAreas.modalShadow.hide();
	}


}