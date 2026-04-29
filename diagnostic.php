<?php
$conn=new mysqli("localhost","root","");
$conn->query("CREATE DATABASE IF NOT EXISTS drivexpress");
$conn->select_db("drivexpress");

$conn->query("CREATE TABLE IF NOT EXISTS diagnostic(
id INT AUTO_INCREMENT PRIMARY KEY,
description TEXT,
date DATE
)");

if($_SERVER["REQUEST_METHOD"]=="POST"){
$desc=$_POST['desc'];
$date=$_POST['date'];

$stmt=$conn->prepare("INSERT INTO diagnostic(description,date) VALUES(?,?)");
$stmt->bind_param("ss",$desc,$date);
$stmt->execute();

echo "<script>alert('Booked');</script>";
}
?>

<form method="POST">
<textarea name="desc"></textarea>
<input type="date" name="date">
<button>Submit</button>
</form>
