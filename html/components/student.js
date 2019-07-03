

class Student{
	/* constructor - take in params for the student and save them,
		create storage for student dom elements
		store the deletion callback from the SGT_template class
		bind event handlers
	params:
		(number) id - the id of this student
		(string) name - the name of the student
		(string) course - the course of the student
		(number) grade - the grade of the student
		(function) deleteCallback - the removal function from the SGT_template to call when this student wants to be removed from the SGT_templates's list
	return: undefined (don't return undefined, it will screw it up a constructor, don't put a return)
	ESTIMATED TIME: 30 minutes to understand
	*/
	constructor(id, name, course, grade, deleteCallback=()=>{}){
		//this method has been built out to help you understand the general structure better
		this.data = {
			id: parseInt(id),
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
		this.handleDelete = this.handleDelete.bind(this);
		this.render = this.render.bind(this);
	}

	/* getdata - get all the student data as a simple object
	params: none
	return: (object) an object with the following data
		(number): id
		(string): name
		(string): course
		(number): grade
	ESTIMATED TIME: 30 minutes
	*/
	getdata(){
		return this.data;
	}

	/* render - create and return a table row (tr) with 4 table cells (td) in them:
		name : the student's name
		course : the student's course
		grade: the student's grade
		operations: holds any buttons for the student - will hold a delete button
	purpose:
		create the tr and 4 tds,
		put the 4 tds inside the tr.
		Add the button to the operation td
		add the Studentrecord's handleDelete method to the delete button's click handler
		store all these elements for later use
		return the tr
	params: none
	return: (jquery dom element) the row that contains the student dom elements
	ESTIMATED TIME: 2 hours
	*/
	render(){
		
		var tr = $('<tr>');
		var td0 = $('<td>').text(this.data.name);
		var td1 = $('<td>').text(this.data.course);
		var td2 = $('<td>').text(this.data.grade);
		var td3 = $('<td>');

		// var delBut = $('<button>').on('click', this.handleDelete);

		td3.append($('<button>').on('click', this.handleDelete).text('delete'));

		tr.append(td0).append(td1).append(td2).append(td3);

		this.domElements.row = tr;
		this.domElements.name = td0;
		this.domElements.course = td1;
		this.domElements.grade = td2;
		this.domElements.deleteButton = td3;

		return tr;
	}

	/* handleDelete - call the SGT_template delete callback, and remove this student's dom element
	purpose:
		call the callback that was passed into the constructor - give it this object's reference
		remove this object's dom element row to erase the entire dom element
	ESTIMATED TIME: 15 minutes
	*/
	handleDelete(){
		
		this.deleteCallback(this.data.id);

		// if(this.domElements.row)
		this.domElements.row.remove();
	}

	/* update - change a value in the student record
	purpose: ensure that the field is one that can be changed (either id, name, course, or grade)
		if not changable, return false
		otherwise update the value
			save the value into the properties stored in the constructor
			go to the dom element of the appropriate field and change the text
				(for example, if name was changed, go to the student's name td and change the name as well)
			and return true
	params:
		(string) field - the field in the object to change
		(multiple) value - the value to change the field to
	return: (boolean) true if it was changed, false if it was not
	ESTIMATED TIME: 1.5 hours
	*/
	update(string, multiple){

		if(this.data[string]){
			if(string === 'grade'){
				this.data[string] = parseInt(multiple);
			}else{
				this.data[string] = multiple;
			}
			this.domElements[string].text(this.data[string])
			return true;
		}else{
			return false;
		};
	}
}
