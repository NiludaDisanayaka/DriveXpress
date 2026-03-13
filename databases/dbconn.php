<?php
$sn='localhost';
$un='root';
$pw='';

//dbconnection
$conn=mysqli_connect($sn,$un,$pw);

//db connection check
if(!$conn){
    die('Could not connect'.mysqli_connect_error());
}

//crate database
$sql='CREATE DATABASE drivexpress';

if(mysqli_query($conn,$sql)){
    echo'Database create successfuly';
}else{
     echo 'Error creating database'.mysqli_error($conn);
}

mysqli_close($conn);
?>