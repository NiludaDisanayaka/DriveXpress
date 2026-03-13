<?php
session_start();

// DB connection
$host = "localhost";
$user = "root";
$pass = "";
$db = "drivexpress";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

// Get POST data
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($email) || empty($password)) {
    echo 'fail';
    exit;
}

// Fetch hashed password from DB
$stmt = $conn->prepare("SELECT `Password` FROM `registration` WHERE `Email`=? LIMIT 1");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    // Verify password
    if (password_verify($password, $row['Password'])) {
        $_SESSION['Email'] = $email;
        echo 'success';
    } else {
        echo 'fail';
    }
} else {
    echo 'fail';
}

$stmt->close();
$conn->close();
?>