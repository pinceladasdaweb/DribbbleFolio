<?php
require_once './vendor/autoload.php';

$helperLoader   = new SplClassLoader('Helpers', 'vendor');
$dribbbleLoader = new SplClassLoader('DribbbleFolio', 'vendor');

$helperLoader->register();
$dribbbleLoader->register();

use Helpers\Config;
use DribbbleFolio\Dribbble;

$config = new Config;
$config->load('config/config.php');

$user    = isset($_GET['username']) ? $_GET['username'] : null;
$counter = isset($_GET['per_page']) ? $_GET['per_page'] : 18;

$api   = new Dribbble($config->get('dribbble.token'));
$shots = $api->getUserShots($user, $counter);

header('Content-type: application/json');
echo $shots;