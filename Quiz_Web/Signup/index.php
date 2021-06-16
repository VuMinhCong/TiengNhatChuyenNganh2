<?php

require 'connection.php';
if (isset($_POST['btn_login'])) {
    $username = strip_tags($_REQUEST["txt_username"]);
    $pasword = strip_tags($_REQUEST["txt_password"]);
    $pasword2 = strip_tags($_REQUEST["txt_password2"]);
    $email = strip_tags($_REQUEST["txt_email"]);

    if($pasword != $pasword2){
      $errorMsg[] ="Wrong confirm password";
    }
    else{
      $sql ="SELECT * FROM userss WHERE Username =:uname";
      $stmt = $db->prepare($sql);
      $stmt->bindvalue(':uname',$username );
      $stmt->execute();
      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if($row>0) $errorMsg[] ="There already an accounr that name";
      else {
          $sql="INSERT INTO userss (Username, Email, Password) VALUES (:uname, :mail, :Pword)";
          $stmt = $db->prepare($sql);
          $stmt->bindvalue(':uname',$username );
          $stmt->bindvalue(':mail',$email );
          $stmt->bindvalue(':Pword',$pasword);
          $stmt->execute();
          $loginMsg="You has created account successfully";
          header("Refresh: 1; url=../");
      }
    }
}
 ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href=
"https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="index.css">
    <title>Login Page</title>
</head>

<body>
  <?php
  if (isset($errorMsg))
  {
      foreach ($errorMsg as $erro) {
          ?>
          <div class="alert alert-danger">
              <strong><?php  echo $erro; ?></strong>
          </div>
          <?php
      }
  }
  if (isset($loginMsg)) {
      ?>
      <div class="alert alert-success">
          <strong><?php  echo $loginMsg; ?></strong>
      </div>
      <?php
  }
  ?>

    <form  method="post">
	<div class="login-page">
		<div class="form">
			<form class="login-form">
				<input type="text" placeholder="username"
					name="txt_username" value="">
				<input type="text" placeholder="Email"
					name="txt_email" value="">
				<input type="password" placeholder="password"
					name="txt_password" value="">

				<input type="password" placeholder="confirm password"
					 name="txt_password2" value="">
					<button type="submit" class="btn btn-primary" name="btn_login" value ="Register">sign up</button>
      				<p class="message">Not registered? <a href="#">Create an account</a></p>
    			</form>
  		</div>
        </div>
    </form>
</body>

</html>
