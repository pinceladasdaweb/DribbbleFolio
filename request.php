<?php
require_once './vendor/autoload.php';

$classLoader = new SplClassLoader('DribbbleFolio', 'vendor');
$classLoader->register();

use DribbbleFolio\Dribbble;

$user    = isset($_GET['username']) ? $_GET['username'] : null;
$counter = isset($_GET['per_page']) ? $_GET['per_page'] : 18;
$token   = '';

$api   = new Dribbble($token);
$shots = $api->getUserShots($user, $counter);

header('Content-type: application/json');
echo $shots;