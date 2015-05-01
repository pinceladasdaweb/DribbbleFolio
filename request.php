<?php
require_once('./api/Dribbble.class.php');

$user    = isset($_GET['username']) ? $_GET['username'] : NULL;
$counter = isset($_GET['per_page']) ? $_GET['per_page'] : 18;
$token   = '';

$api   = new Dribbble($token);
$shots = $api->getUserShots($user, $counter);

header('Content-type: application/json');
echo $shots;