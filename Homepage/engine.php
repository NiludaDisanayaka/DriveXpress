<?php
$conn=new mysqli("localhost","root","");
$conn->query("CREATE DATABASE IF NOT EXISTS drivexpress");
$conn->select_db("drivexpress");

$conn->query("CREATE TABLE IF NOT EXISTS engine(
id INT AUTO_INCREMENT PRIMARY KEY,
issues TEXT
)");

if($_SERVER["REQUEST_METHOD"]=="POST"){
$issues=isset($_POST['issues'])?implode(",",$_POST['issues']):"";

$stmt=$conn->prepare("INSERT INTO engine(issues) VALUES(?)");
$stmt->bind_param("s",$issues);
$stmt->execute();

echo "<script>alert('Engine request sent');</script>";
}
?>
