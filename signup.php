<?php
// Include configuration file
require_once "config.php";

// Define variables and initialize with empty values
$fullname = $email = $password = "";
$fullname_err = $email_err = $password_err = "";

// Processing form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Validate full name
    if (empty(trim($_POST["fullname"]))) {
        $fullname_err = "Please enter your full name.";
    } else {
        $fullname = trim($_POST["fullname"]);
    }
    
    // Validate email
    if (empty(trim($_POST["email"]))) {
        $email_err = "Please enter an email.";
    } else {
        $email = trim($_POST["email"]);
    }
    
    // Validate password
    if (empty(trim($_POST["password"]))) {
        $password_err = "Please enter a password.";
    } else {
        $password = trim($_POST["password"]);
    }
    
    // Check input errors before inserting into database
    if (empty($fullname_err) && empty($email_err) && empty($password_err)) {
        
        // Prepare a select statement to check if the email already exists
        $sql = "SELECT id FROM user_table WHERE email = :email";
        
        if ($stmt = $pdo->prepare($sql)) {
            // Bind variables to the prepared statement as parameters
            $stmt->bindParam(":email", $param_email, PDO::PARAM_STR);
            
            // Set parameters
            $param_email = $email;
            
            // Attempt to execute the prepared statement
            if ($stmt->execute()) {
                if ($stmt->rowCount() > 0) {
                    // Email already exists
                    $email_err = "This email is already taken.";
                } else {
                    // Prepare an insert statement
                    $sql = "INSERT INTO user_table (fullname, email, password) VALUES (:fullname, :email, :password)";
                    
                    if ($stmt = $pdo->prepare($sql)) {
                        // Bind variables to the prepared statement as parameters
                        $stmt->bindParam(":fullname", $param_fullname, PDO::PARAM_STR);
                        $stmt->bindParam(":email", $param_email, PDO::PARAM_STR);
                        $stmt->bindParam(":password", $param_password, PDO::PARAM_STR);
                        
                        // Set parameters
                        $param_fullname = $fullname;
                        $param_email = $email;
                        $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash
                        
                        // Attempt to execute the prepared statement
                        if ($stmt->execute()) {
                            // Redirect to login page
                            header("location: index.php");
                            exit();
                        } else {
                            echo "Something went wrong. Please try again later.";
                        }
                    }
                    
                    // Close statement
                    unset($stmt);
                }
            } else {
                echo "Oops! Something went wrong. Please try again later.";
            }
        }
        
        // Close connection
        unset($pdo);
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signup page</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <!-- signup section start -->
        <div class="box">
            <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post" class="box1">
                <h1> 
                    <b>Sign Up</b>
                </h1>
            </form>

            <!-- signup section start -->
            <div class="box2">
                <div class="sign-details">
                    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                        <div>
                            <label for="fullname">FULL NAME</label><br><br>
                            <input class="inp" type="text" name="fullname" required placeholder="Enter your full name"/><br><br>
                            <label for="email">EMAIL</label><br><br>
                            <input class="inp" type="email" name="email" required placeholder="Enter valid email"/><br><br>
                            <label for="password">PASSWORD</label><br><br>
                            <input class="inp" type="password" name="password" required placeholder="Enter Password" /><br><br>
                            <div>
                               <br>
                                
                                <input type="submit" name="submit" class="green" value="Sign Up"> 
                                <br>
                                <p>Already have an account? <a href="index.php" class="login-link">Login here</a></p> 
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
</body>
</html>
