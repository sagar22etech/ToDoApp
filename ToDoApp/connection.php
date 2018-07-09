<?php
  header('Access-Control-Allow-Origin: *');
  $conn = mysqli_connect("localhost", "root", "root","db_todo_app");
  // $conn = mysqli_connect("excellencetechnologies.co.in", "excelarf", "**T0y*6z8e0c","excelarf_nitesh_db");
  if ( !$conn ) {
    die(mysqli_connect_error());
  }

?>
