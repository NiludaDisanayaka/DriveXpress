<?php
session_start();
include 'connection.php'; // DB connection

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    // Prepare SQL statement for security (SQL injection safe)
    $stmt = $conn->prepare("SELECT * FROM registration WHERE email = ? AND Password = ?");
    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        // Login success
        $_SESSION['email'] = $email; // optional: store in session
        header("Location: loginpage.html"); // redirect to login page
        exit;
    } else {
        // Login failed
        echo "<script>alert('Email or Password is incorrect'); window.history.back();</script>";
        exit;
    }
}
?>