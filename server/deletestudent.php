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

$query = "DELETE FROM `grades` WHERE id={$_POST['id']}";

$result = mysqli_query($db, $query);

if($result){
	$data = [];
	if(mysqli_affected_rows($db)>0){
		$output['success']=true;
	} else {
		$output['error'] = 'data was not deleted';
	} 
} else {
	$output['error'] = mysqli_error($db);
}

$json_output = json_encode($output);
print($json_output);

?>