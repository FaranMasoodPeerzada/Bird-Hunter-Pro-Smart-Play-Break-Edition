<?php
// Database connection settings
$servername = "localhost";
$username = "root";
$password = ""; // replace with your database password
$dbname = "gameDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve form data
$playername = $_POST['playername'];
$password = $_POST['password'];
$level = $_POST['level'];

// SQL query to insert data into the database
$sql = "INSERT INTO players (playername, password, level) VALUES (?, ?, ?)";

// Prepare and bind
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $playername, $password, $level);

// Execute the query
if ($stmt->execute()) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the connection
$stmt->close();
$conn->close();
?>
