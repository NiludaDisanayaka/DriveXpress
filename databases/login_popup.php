<?php
session_start();
include 'connection.php'; // MySQL connection file

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    // Prepare statement for security
    $stmt = $conn->prepare("SELECT * FROM registration WHERE email = ? AND Password = ?");
    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        // Successful login
        $_SESSION['email'] = $email; // optional: store email in session
        header("Location: loginpage.html");
        exit;
    } else {
        // Login failed
        echo "<script>alert('Email or Password is incorrect'); window.history.back();</script>";
        exit;
    }
}
?>