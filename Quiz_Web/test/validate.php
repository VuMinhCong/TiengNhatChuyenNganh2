<?php

include_once('connection.php');
session_start();
function test_input($data) {

    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if ($_SERVER["REQUEST_METHOD"]== "POST") {

    $adminname = strip_tags($_POST["adminname"]);
    $password = strip_tags($_POST["password"]);
    if($adminname=="" || $password =="") {
	    echo "<script language='javascript'>";
            echo "alert('Please FILL IN USERNAME AND PASSWORD ')";
            echo "</script>";
            header("Refresh:0 url=index.php");
        }
    $stmt = $db->prepare("SELECT * FROM userss");
    $stmt->execute();
    $users = $stmt->fetchAll();
    $i = 0;
    foreach($users as $user) {
        if(($user['Username'] == $adminname) &&
            ($user['Password'] == $password)) {
              $_SESSION['user'] = $user['Username']; 
              header("Location: ../");
	            $i=1;
        }
    }
    if($i==0) {
	    echo "<script language='javascript'>";
            echo "alert('WRONG INFORMATION')";
            echo "</script>";
            header("Refresh:0 url=index.php");
        }
}
?>
