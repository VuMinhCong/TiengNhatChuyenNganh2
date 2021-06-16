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
    <form action="validate.php" method="post">
	<div class="login-page">
		<div class="form">
			<form class="login-form">
				<input type="text" placeholder="username"
					name="adminname" value="">

				<input type="password" placeholder="password"
					 name="password" value="">
      				<button>login</button>
      				<p class="message">Not registered? <a href="../Signup">Create an account</a></p>
    			</form>
  		</div>
        </div>
    </form>
</body>

</html>
