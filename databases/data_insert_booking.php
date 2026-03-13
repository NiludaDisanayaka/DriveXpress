<?php
// Database connection
$conn = mysqli_connect("localhost", "root", "", "DRIVEXPRESS");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Get form data
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$car_model = $_POST['car_model'];
$dealer_branch = $_POST['dealer_branch'];
$date_booking = $_POST['date_booking'];
$time_booking = $_POST['time_booking'];
$notes = $_POST['notes'];

// Insert query
$sql = "INSERT INTO test_drive_bookings 
        (name, phone, email, car_model, dealer_branch, date_booking, time_booking, notes)
        VALUES ('$name', '$phone', '$email', '$car_model', '$dealer_branch', '$date_booking', '$time_booking', '$notes')";

if (mysqli_query($conn, $sql)) {
    echo "<script>
        alert('Test drive booked successfully!');
        window.location.href='book a test drive.html';
    </script>";
} else {
    echo "Error: " . mysqli_error($conn);
}

mysqli_close($conn);
?>