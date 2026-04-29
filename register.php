<?php
include "db.php";

if($_SERVER["REQUEST_METHOD"]=="POST"){

$name=$_POST['name'];
$email=$_POST['email'];
$password=password_hash($_POST['password'], PASSWORD_DEFAULT);

$stmt=$conn->prepare("INSERT INTO registration(name,email,password) VALUES(?,?,?)");
$stmt->bind_param("sss",$name,$email,$password);

if($stmt->execute()){
    echo "<script>alert('Registered Successfully'); window.location.href='homepage.html';</script>";
}else{
    die("Error: ".$stmt->error);
}
}
?>
