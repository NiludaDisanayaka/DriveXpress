<?php
$conn=new mysqli("localhost","root","");
$conn->query("CREATE DATABASE IF NOT EXISTS drivexpress");
$conn->select_db("drivexpress");

$conn->query("CREATE TABLE IF NOT EXISTS wheel_service(
id INT AUTO_INCREMENT PRIMARY KEY,
services TEXT
)");

if($_SERVER["REQUEST_METHOD"]=="POST"){
$services=isset($_POST['services'])?implode(",",$_POST['services']):"";

$stmt=$conn->prepare("INSERT INTO wheel_service(services) VALUES(?)");
$stmt->bind_param("s",$services);
$stmt->execute();

echo "<script>alert('Wheel service booked');</script>";
}
?>
