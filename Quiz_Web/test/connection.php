<?php


$db_host = "103.124.95.89:3306";
$db_user = "hust_web_121223";
$db_password = "0ROk5ttMxO8U2WSu";
$db_name = "hust_web_009";
try {

    $db = new PDO("mysql:host={$db_host};dbname={$db_name}",$db_user,$db_password);

    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

 ?>
