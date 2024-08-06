<?php
// Start session
session_start();

// Include database configuration
include_once "config.php";

// Retrieve login records
$stmt = $pdo->prepare("SELECT full_name, login_time FROM login_records ORDER BY login_time DESC");
$stmt->execute();
$login_records = $stmt->fetchAll();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Records</title>
    <link rel="stylesheet" href="style.css">
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 12px;
            text-align: left;
        }
        th {
            background-color: #333; /* Dark color for table heading */
            color: white; /* White text color for contrast */
        }
        
        tr:hover {
            background-color: #f1f1f1;
        }
        .container {
            width: 80%;
            margin: auto;
        }
        .box {
            padding: 20px;
            border: 1px solid #ddd;
            margin-top: 20px;
            border-radius: 10px;
        }
        .green {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .green:hover {
            background-color: #45a049;
        }
        .box1 {
            margin-top: 20px;
        }
        h1 {
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="box">
            <h1><b>Login Records</b></h1>
            <table>
                <tr>
                    <th>Full Name</th>
                    <th>Login Time</th>
                </tr>
                <?php foreach ($login_records as $record) { ?>
                    <tr>
                        <td><?php echo htmlspecialchars($record['full_name']); ?></td>
                        <td><?php echo htmlspecialchars($record['login_time']); ?></td>
                    </tr>
                <?php } ?>
            </table>
            <br>
            <form action="index.php" method="get" class="box1">
                <button type="submit" class="green">Back to Login</button>
            </form>
        </div>
    </div>
</body>
</html>
