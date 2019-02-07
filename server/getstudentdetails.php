<?php

require_once('startup.php');

require_once('mysqlconnect.php');

$output = [
	'success'=>false
];

sanitizeInputs('POST');

$checks = [
	'id' => [ 'regex'=>'/[0-9]{0,10}/', 'message'=>'id must be specified and be a whole number']
];

$errors = checkValues( $checks, $_POST);
if( !empty( $errors )){
	$output['errors'] = $errors;
	print( json_encode($output));
	exit();
}

$query = "SELECT * FROM `grades` WHERE id={$_POST['id']}";

$result = mysqli_query($db, $query);

if($result){
	$data = [];
	if(mysqli_num_rows($result)>0){
		$output['success']=true;
		$data = mysqli_fetch_assoc($result);
		$output['data'] = $data;
	} else {
		$output['error'] = 'could not find student by id '.$_POST['id'];
	} 
} else {
	$output['error'] = mysqli_error($db);
}

$json_output = json_encode($output);
print($json_output);

?>