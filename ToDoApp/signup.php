<?php
  include('connection.php');

  $data = "Request not Found.";
  $success = false;

  if ($_POST) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['pass'];
    $bday = $_POST['bday'];

    $login_query = mysqli_query($conn, " SELECT * FROM todo_users WHERE email = '" . $email . "' ");

    if (mysqli_num_rows($login_query) > 0) {
      $success = false;
      $data = "Username already exist.";

    } else {
      $insert_query = " INSERT INTO todo_users( name, email, password, birthday ) VALUES( '".$name."', '".$email."', '".$password."', '".$bday."' ) ";
      if(mysqli_query($conn, $insert_query)){
        $success = true;
        $data = "Account created successfully.";
      }
    }

    if ($success) {
      $response[] = array('success'=> $success, 'data'=> $data);
    }else {
      $response[] = array('success'=> $success, 'data'=> $data);
    }

  } else {
    $response[] = array('success'=> $success, 'data'=> $data);
  }

  echo json_encode($response);

?>
