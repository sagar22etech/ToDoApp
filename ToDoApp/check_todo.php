<?php
  include('connection.php');

  $data = "Request not Found.";
  $success = false;

  if ($_POST) {

    $check_id = $_POST['todo_id'];
    $check_value = $_POST['is_checked'];
    $data = "Id not found";
    $response = array();

    if (isset($check_id) && $check_id != "") {

      if ($check_value === 'true') {
        $update_query =  " UPDATE todo_list SET is_check = 1 WHERE id = '" . $check_id . "' ";
        if (mysqli_query($conn, $update_query)) {
          $success = true;
          $data = "Checked";
          $response[] = array('success'=> $success, 'data'=> $data);
        }

      } else {
        $update_query =  " UPDATE todo_list SET is_check = 0 WHERE id = '" . $check_id . "' ";
        if (mysqli_query($conn, $update_query)) {
          $success = false;
          $data = "Unchecked";
          $response[] = array('success'=> $success, 'data'=> $data);
        }
      }

    } else {
      $response[] = array('success'=> $success, 'data'=> $data);
    }


  } else {
    $response[] = array('success'=> $success, 'data'=> $data);
  }

  echo json_encode($response);

?>
