<?php
// Start session
session_start();

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Include database configuration
    include_once "config.php";

    // Get email and password from the form
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Prepare and execute the query
    $stmt = $pdo->prepare("SELECT * FROM user_table WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    // Verify password
    if ($user && password_verify($password, $user['password'])) {
        // Store user data in session
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_email'] = $user['email'];
        $_SESSION['user_full_name'] = $user['fullname'];

        // Insert login record
        $stmt = $pdo->prepare("INSERT INTO login_records (user_id, username, full_name) VALUES (?, ?, ?)");
        $stmt->execute([$user['id'], $user['email'], $user['fullname']]);

        // Redirect to dashboard or profile page
        header("Location: home.html");
        exit;
    } else {
        // Invalid credentials, display error message
        $error = "Invalid email or password.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login page</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <!-- login section start -->
        <div class="box">
            <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post" class="box1">
                <h1><b>Login</b></h1>
                <?php if (isset($error)) { ?>
                    <div class="error"><?php echo $error; ?></div>
                <?php } ?>
                <div class="sign-details">
                    <label for="email">EMAIL</label><br><br>
                    <input class="inp" type="email" name="email" required placeholder="Enter valid email"/><br><br>
                    <label for="password">PASSWORD</label><br><br>
                    <input class="inp" type="password" name="password" required placeholder="Enter Password" /><br><br>
                    <div>
                        <input type="submit" name="submit" class="green" value="Login">
                        <br><br>
                        <p>New user? <a href="signup.php">Sign up here</a></p>
                       
                    </div>
                </div>
            </form>
            <form action="login_records.php" method="get" class="box1">
                <button type="submit" class="green">View Login Records</button>
            </form>
        </div>
    </div>
</body>
</html>
