<?php
// Database configuration
$servername = "localhost"; // Assuming your MySQL server is running on localhost
$username = "root"; // Default username for XAMPP MySQL is usually "root"
$password = ""; // Default password for XAMPP MySQL is empty
$dbname = "duck_game"; // Your database name

// Create connection
try {
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
