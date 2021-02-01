<?php
$site_root = "Customers/first-western-bank-and-trust/Game Kiosk/games";
//http://localhost:8888/00_go/gomedia40/00_GSAP/gsock-4/sandbox/games/
/*============================================================*/
/*-----	AUTOMATED CONFIGS	 ---------------------------------*/
/*============================================================*/
define('BASE_PATH', realpath(dirname(__FILE__)));
$domain = $_SERVER['HTTP_HOST'];
$hostname = $domain . "/" . $site_root . "/";
define('BASE_URL', 'http://' . $hostname . '');
define('HOSTNAME', $hostname);
define('DOMAIN', $domain);
//JAVASCRIPT CONFIGS
//echo "<script>var BASE_PATH='" . BASE_PATH . "';</script>";
//echo "<script>var BASE_URL='" . BASE_URL . "';</script>";
//echo("<br>BASE_PATH:".BASE_PATH);
//echo("<br>BASE_URL:".BASE_URL);

// ALSO consider: echo(__DIR__);
?>
