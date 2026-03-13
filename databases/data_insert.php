<?php
$conn=mysqli_connect('localhost','root','','drivexpress');

if(!$conn){
    die("Connection failed: ".mysqli_connect_error());
}

$name=$_POST['name'];
$email=$_POST['email'];
$pss=$_POST['pw'];

$sql="insert into registration
       values('$name','$email','$pss')";


if(mysqli_query($conn,$sql)){
    
    echo "<script>
            alert('Account created successfully');
            window.location.href='homepage.html';
          </script>";

}else{
    
    echo "<script>
            alert('Error inserting data');
            window.history.back();
          </script>";
}
?>