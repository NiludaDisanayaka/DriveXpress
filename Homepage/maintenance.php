<?php
$conn=new mysqli("localhost","root","");
$conn->query("CREATE DATABASE IF NOT EXISTS drivexpress");
$conn->select_db("drivexpress");

$conn->query("CREATE TABLE IF NOT EXISTS maintenance(
id INT AUTO_INCREMENT PRIMARY KEY,
model VARCHAR(100),
mileage INT,
date DATE
)");

if($_SERVER["REQUEST_METHOD"]=="POST"){
$model=$_POST['model'];
$mileage=$_POST['mileage'];
$date=$_POST['date'];

$stmt=$conn->prepare("INSERT INTO maintenance(model,mileage,date) VALUES(?,?,?)");
$stmt->bind_param("sis",$model,$mileage,$date);
$stmt->execute();

echo "<script>alert('Booked');</script>";
}
?>
