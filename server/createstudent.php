<?php

require_once('startup.php');

require_once('mysqlconnect.php');

$output = [
	'success'=>false
];

sanitizeInputs('POST');

$checks = [
	'name' => [ 'regex'=>'/\w{2,}/', 'message'=>'name must be at least 2 characters with no special characters'],
	'course'=> [ 'regex'=>'/\w{2,}/', 'message'=>'course must be at least 2 characters with no special characters'],
	'grade'=>[ 'regex'=>'/[0-9]{0,3}/', 'message'=>'grade must be a whole number between 0 and 100'],
	'instructor'=>[ 'regex'=>'/\w{2,}/', 'message'=>'instructor must be at least 2 characers with no special characters'],
	'notes'=>[ 'regex'=>'/\w*/', 'message'=>'notes can only contain standard letters and characters'],
];

$errors = checkValues( $checks, $_POST);
if( !empty( $errors )){
	$output['errors'] = $errors;
	print( json_encode($output));
	exit();
}

$query = "INSERT INTO `grades` SET `name`='{$_POST['name']}', `course`='{$_POST['course']}', `instructor`='{$_POST['instructor']}', `grade`='{$_POST['grade']}', added=NOW(), notes='{$_POST['notes']}'";

$result = mysqli_query($db, $query);

if($result){
	$data = [];
	if(mysqli_affected_rows($db)>0){
		$insertID = mysqli_insert_id($db);
		$output['success']=true;
		$output['new_id'] = $insertID;
	} else {
		$output['error'] = 'data was not inserted';
	} 
} else {
	$output['error'] = mysqli_error($db);
}

$json_output = json_encode($output);
print($json_output);

?>