<?php
session_start();

// DB connection
$conn = mysqli_connect("localhost", "root", "", "DRIVEXPRESS");

if (!$conn) {
    die("Connection Failed: " . mysqli_connect_error());
}

// Get email, password from form
$email = mysqli_real_escape_string($conn, $_POST['email']);
$password = mysqli_real_escape_string($conn, $_POST['pw']);

// Query database to check user
$sql = "SELECT * FROM registration WHERE email='$email' AND password='$password'";
$result = mysqli_query($conn, $sql);

// If found user
if(mysqli_num_rows($result) == 1) {
    // Save user in session
    $_SESSION['email'] = $email;

    // Redirect to user home page
    header("Location: user_home.php");
    exit;
} else {
    // Wrong credentials
    echo "<script>alert('Invalid email or password'); window.location.href='login.html';</script>";
}
?>