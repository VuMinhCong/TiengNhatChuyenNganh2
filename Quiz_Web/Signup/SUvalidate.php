<?php

include_once('connection.php');

function test_input($data) {

    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if ($_SERVER["REQUEST_METHOD"]== "POST") {

    $adminname = test_input($_POST["adminname"]);
    $password = test_input($_POST["password"]);
	$password2 = test_input($_POST["password2"]);
	//$Email =
    $stmt = $conn->prepare("SELECT * FROM Registration");
    $stmt->execute();
    $users = $stmt->fetchAll();
    $i = 0;
    foreach($users as $user) {
        if(($user['adminname'] == $adminname) &&
            ($user['password'] == $password)
            ($user['password'] == $password)) {
                header("Location: adminpage.php");
		$i=1;
        }
    }
    if($i==0) {
	    echo "<script language='javascript'>";
            echo "alert('WRONG INFORMATION')";
            echo "</script>";
            die();
        }
}
?>
