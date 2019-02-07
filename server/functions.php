<?php

if( ! function_exists('sanitizeInputs')){
	function sanitizeInputs( $type ){
		switch($type){
			case 'GET':
				$target = $_GET;
				break;
			case 'POST':
				$target = $_POST;
				break;
			case 'REQUEST': 
				$target = $_REQUEST;
				break;
			case 'COOKIES':
				$target = $_COOKIES;
				break;
		}
		foreach($target as $key=>$value){
			$target[$key] = htmlentities( addslashes( $value ));
		}
	}
}

if( ! function_exists('checkValues')){
	function checkValues( $checks, $target ){
		$errors = [];
		foreach($checks as $key=>$value){
			if(empty($target[$key])){
				$errors[] = $value['message'];
			}
			else if(!preg_match( $value['regex'], $target[$key] )){
				$errors[] = $value['message'];
			}
		}
		return $errors;
	}
}

?>