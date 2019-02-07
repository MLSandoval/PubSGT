

class Student{
	/* constructor - take in params for the student and save them,
		create storage for student dom elements
		store the deletion callback from the model
		bind event handlers
	params: 
		(number) id - the id of this student
		(string) name - the name of the student
		(string) course - the course of the student
		(number) grade - the grade of the student
		(function) deleteCallback - the removal function from the model to call when this student wants to be removed from the model's list
	return: undefined (don't return undefined, it will screw it up a constructor, don't put a return)
	*/
	//Student(id, name, course, grade, received, this.deleteStudent)
	constructor(id, name, course, grade, added, notes, deleteCallback=()=>{}, clickCallback=()=>{}){
		this.data = {
			id: id,
			name: name,
			course: course,
			notes: notes,
			grade: parseInt(grade),
			added: added
		}
		this.deleteCallback = deleteCallback;
		this.clickCallback = clickCallback;
		this.domElements = {
			row: null,
			name: null,
			course: null,
			added: null,
			grade: null,
			operations: null,
			deleteButton: null
		}
		this.detailDomElements = {
			container: null,
			nameContainer: null,
			nameText: null,
			courseContainer: null,
			courseText: null,
			gradeContainer: null,
			gradeText: null,
			instructorContainer: null,
			instructorText: null,
			addedContainer: null,
			addedText: null,
			notesContainer: null,
			notesText: null
		}
		this.handleDelete = this.handleDelete.bind( this );
		this.handleRowClick = this.handleRowClick.bind( this );
	}
	/* update - change a value in the student record
	purpose: ensure that the field is one that can be changed (either id, name, course, or grade)
		if not changable, return false
		otherwise update the value 
			save the value into the properties stored in the constructor
			go to the dom element of the appropriate field and change the text
				(for example, if name was changed, go to the student's name TD and change the name as well)
			and return true
	params: 
		(string) field - the field in the object to change
		(multiple) value - the value to change the field to
	return: (boolean) true if it was changed, false if it was not
	*/
	update( field, value ){
		var allowedFields = ['id', 'name', 'course', 'grade', 'notes', 'instructor', 'added'];
		if( allowedFields.indexOf( field ) !== -1 ){
			this.data[field] = value;
			if( field !== 'id'){
				if(this.domElements.hasOwnProperty(field)){
					this.domElements[field].text(value);
				}
				if(this.detailDomElements.hasOwnProperty(field)){
					this.detailDomElements[field].text(value);
				}
			}
			return true;
		}
		console.error('cannot modify '+ field);
		return false;
	}
	/* getData - get all the student data as a simple object
	params: none
	return: (object) an object with the following data
		(number): id
		(string): name
		(string): course
		(number): grade
	*/
	getData(){
		return this.data;
	}
	/* render - create and return a table row (TR) with 4 table cells (TD) in them:
		name : the student's name
		course : the student's course
		grade: the student's grade
		operations: holds any buttons for the student - will hold a delete button
	purpose: 
		create the TR and 4 TDs, 
		put the 4 TDs inside the TR.  
		Add the button to the operation TD
		add the StudentRecord's handleDelete method to the delete button's click handler
		store all these values for eventual change
		return the TR
	params: none
	return: (jquery dom element) the row that contains the student dom elements
	*/
	render(){
		this.domElements.row = $("<tr>");
		this.domElements.row.click( this.handleRowClick );
		this.domElements.name = $("<td>").text( this.data.name );
		this.domElements.course = $("<td>").text( this.data.course);
		this.domElements.grade = $("<td>").text( this.data.grade );
		this.domElements.added = $("<td>").text( this.data.added );
		this.domElements.operations = $("<td>");
		this.deleteButton = $("<button>",{
			text: 'delete',
			'class': 'btn btn-lrg btn-danger',
			on: {
				click: this.handleDelete
			}
		});
		this.domElements.operations.append( this.deleteButton );
		this.domElements.row.append(this.domElements.name, this.domElements.course, this.domElements.grade , this.domElements.added, this.domElements.operations);
		return this.domElements.row;
	}
	renderDetails(){
		this.detailDomElements = {
			container: $("<div>").addClass('studentDetailsContainer'),
			nameContainer: $("<div>").addClass('name').text('name'),
			nameText: $("<div>").addClass('data').text(this.data.name),
			courseContainer: $("<div>").addClass('course').text('course'),
			courseText: $("<div>").addClass('data').text(this.data.course),
			gradeContainer: $("<div>").addClass('grade').text('grade'),
			gradeText: $("<div>").addClass('data').text(this.data.grade),
			instructorContainer: $("<div>").addClass('instructor').text('instructor'),
			instructorText: $("<div>").addClass('data').text(this.data.instructor),
			addedContainer: $("<div>").addClass('completed').text('added'),
			addedText: $("<div>").addClass('data').text(this.data.added),
			notesContainer: $("<div>").addClass('notes').text('notes'),
			notesText: $("<div>").addClass('data').text(this.data.notes)
		}
		this.detailDomElements.nameContainer.append( this.detailDomElements.nameText);
		this.detailDomElements.courseContainer.append( this.detailDomElements.courseText);
		this.detailDomElements.gradeContainer.append( this.detailDomElements.gradeText);
		this.detailDomElements.instructorContainer.append( this.detailDomElements.instructorText);
		this.detailDomElements.addedContainer.append( this.detailDomElements.addedText);
		this.detailDomElements.notesContainer.append( this.detailDomElements.notesText);
		this.detailDomElements.container.append(
			this.detailDomElements.nameContainer,
			this.detailDomElements.courseContainer,
			this.detailDomElements.gradeContainer,
			this.detailDomElements.instructorContainer,
			this.detailDomElements.addedContainer,
			this.detailDomElements.notesContainer
		);
		return this.detailDomElements.container;
	}
	/* handleDelete - call the model delete callback, and remove this student's dom element
	purpose: 
		call the callback that was passed into the constructor by the model - give it this object's reference
		remove this object's dom element row to erase the entire dom element
	*/
	handleDelete(event){
		this.deleteCallback( this.getData().id );
		this.domElements.row.remove();
	}
	handleRowClick(){
		event.stopPropagation();
		this.clickCallback( this.getData().id );
	}
}