<?php
$conn = new mysqli("localhost","root","");
$conn->query("CREATE DATABASE IF NOT EXISTS drivexpress");
$conn->select_db("drivexpress");

$conn->query("CREATE TABLE IF NOT EXISTS body_repair (
id INT AUTO_INCREMENT PRIMARY KEY,
accident_type VARCHAR(100),
repair_type VARCHAR(50),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");

if($_SERVER["REQUEST_METHOD"]=="POST"){
    $type = $_POST['accident_type'];
    $repair = $_POST['repair_type'];

    $stmt=$conn->prepare("INSERT INTO body_repair(accident_type,repair_type) VALUES(?,?)");
    $stmt->bind_param("ss",$type,$repair);
    $stmt->execute();

    echo "<script>alert('Submitted');</script>";
}
?>

<form method="POST">
<input type="text" name="accident_type" placeholder="Accident Type">
<select name="repair_type">
<option>Insurance Claim</option>
<option>Private Repair</option>
</select>
<button>Submit</button>
</form>
