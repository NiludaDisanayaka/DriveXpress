<?php
// DB Connection
$conn = new mysqli("localhost", "root", "", "drivexpress");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$carModel = $_POST['carModel'];
$dealer = $_POST['dealer'];
$date = $_POST['date'];
$time = $_POST['time'];
$notes = $_POST['notes'];

// Insert query
$sql = "INSERT INTO test_drive_bookings 
(name, phone, email, car_model, dealer, booking_date, booking_time, notes)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

// Prepare statement (secure way)
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssss", $name, $phone, $email, $carModel, $dealer, $date, $time, $notes);

// Execute
if ($stmt->execute()) {
    echo "<script>
        alert('Test Drive booked successfully!');
        window.location.href='book a test drive.html';
    </script>";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
