<?php

header('Access-Control-Allow-Origin: *');

$url = 'https://mywellmetrics.com/api/Upload';

if (!empty($_POST['e'])) {
	$e = $_POST['e'];
} else {
	$e = '';
}

if (!empty($_POST['psk'])) {
	$psk = $_POST['psk'];
} else {
	$psk = '';
}

if (!empty($_POST['data'])) {
	$data = $_POST['data'];
} else {
	$data = '';
}

if (!empty($_POST['type'])) {
	$type = $_POST['type'];
} else {
	$type = '';
}

$params = array(
	'e' => $e,
	'psk' => $psk,
	'data' => $data,
	'type' => $type,
	'format' => 'csv',
	'response' => 'json'
);

$params_string = http_build_query($params);

// Limeade can take awhile, so let's give it an extra minute
// set_time_limit(60);

// Open connection
$ch = curl_init();

// Set the url, number of POST vars, POST data
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, count($params));
curl_setopt($ch, CURLOPT_POSTFIELDS, $params_string);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

// Execute post request, store response
$response = curl_exec($ch);

// Close connection
curl_close($ch);

echo $response;

?>

