<?php

$conn = new mysqli("localhost", "root", "", "drivexpress");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $firstName = $_POST['firstName'] ?? '';
    $lastName  = $_POST['lastName'] ?? '';
    $email     = $_POST['emailAddress'] ?? '';
    $phone     = $_POST['phoneNumber'] ?? '';
    $zipCode   = $_POST['zipCode'] ?? '';
    $comment   = $_POST['comment'] ?? '';
    $financing = isset($_POST['financing']) ? 1 : 0;

    // NEW VALUES
    $carName   = $_POST['carName'] ?? '';
    $carPrice  = $_POST['carPrice'] ?? '';
    $carYear   = $_POST['carYear'] ?? '';

    if (empty($firstName) || empty($email)) {
        die("Required fields missing");
    }

    $stmt = $conn->prepare("INSERT INTO car_order 
    (first_name, last_name, email, phone, zip_code, comment, interested_in_financing, car_name, car_price, car_year) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    $stmt->bind_param(
        "ssssssisss",
        $firstName,
        $lastName,
        $email,
        $phone,
        $zipCode,
        $comment,
        $financing,
        $carName,
        $carPrice,
        $carYear
    );

    if ($stmt->execute()) {
        echo "<script>
        alert('Request Sent Successfully');
        window.location.href='homepage.html';
        </script>";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();

?>