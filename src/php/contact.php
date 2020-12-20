<?php 

	header("Access-Control-Allow-Origin: *");

	$rest_json = file_get_contents("php://input");

	$_POST = json_decode($rest_json, true);

	// Check
	if(empty($_POST['email'])) die();

	if($_POST) {
		// set response code - 200 OK
		http_response_code(200);

	    $subject='YOUR_SUBJECT';
		$to="YOUR_EMAIL";
		$from=$_POST['email'];


		// Data
		$message='<html><body>';
		$message.='<p>Name<br /><strong>' . $_POST['name'] . '</strong></p>';
		$message.='<p>Message<br /><strong>' . $_POST['message'] . '</strong></p>';
		$message.='</body></html>';

		//Headers
		$headers="MIME-Version: 1.0\r\n";
		$headers.="Content-type: text/html; charset=UTF-8\r\n";
		$headers.="From: <".$from.">";

		mail($to,$subject,$message,$headers);

		echo json_encode(array("sent"=>true));

	} else {
		// Error
		echo json_encode([
			"sent"=>false,
			"message"=>"Something went wrong"
		]);
	}

?>