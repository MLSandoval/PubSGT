<?php

require_once('startup.php');

require_once('mysqlconnect.php');

$output = [
	'success'=>false
];

$query = "SELECT name, course, grade, added from `grades`";

$result = mysqli_query($db, $query);

if($result){
	$data = [];
	if(mysqli_num_rows($result)>0){
		while($row = mysqli_fetch_assoc($result)){
			$data[] = $row;
		}
		$output['success']=true;
		$output['data'] = $data;
	} else {
		$output['error'] = 'no data available';
	} 
} else {
	$output['error'] = mysqli_error($db);
}

$json_output = json_encode($output);
print($json_output);

?>