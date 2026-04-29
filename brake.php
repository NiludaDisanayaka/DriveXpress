<?php
$conn=new mysqli("localhost","root","");
$conn->query("CREATE DATABASE IF NOT EXISTS drivexpress");
$conn->select_db("drivexpress");

$conn->query("CREATE TABLE IF NOT EXISTS brake_service(
id INT AUTO_INCREMENT PRIMARY KEY,
issues TEXT,
date DATE
)");

if($_SERVER["REQUEST_METHOD"]=="POST"){
$issues=isset($_POST['issues'])?implode(",",$_POST['issues']):"";
$date=$_POST['date'];

$stmt=$conn->prepare("INSERT INTO brake_service(issues,date) VALUES(?,?)");
$stmt->bind_param("ss",$issues,$date);
$stmt->execute();

echo "<script>alert('Brake request saved');</script>";
}
?>

<form method="POST">
<input type="checkbox" name="issues[]" value="Grinding">Grinding
<input type="checkbox" name="issues[]" value="Vibration">Vibration
<input type="checkbox" name="issues[]" value="Soft pedal">Soft pedal
<input type="date" name="date">
<button>Submit</button>
</form>
