<?php
$conn = new mysqli("localhost","root","","drivexpress");

if($conn->connect_error){
    die("Connection failed: ".$conn->connect_error);
}

$conn->query("CREATE DATABASE IF NOT EXISTS drivexpress");
$conn->select_db("drivexpress");
/*
// Registration table
$conn->query("CREATE TABLE IF NOT EXISTS registration(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100),
email VARCHAR(150) UNIQUE,
password VARCHAR(255)
)");

// Booking table
$conn->query("CREATE TABLE IF NOT EXISTS test_drive_bookings(
id INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(150),
car VARCHAR(100),
date DATE
)");*/
?>
