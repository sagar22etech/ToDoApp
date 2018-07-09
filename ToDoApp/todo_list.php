<?php
  include('connection.php');

  $data = "Request not Found.";
  $success = false;

  if ($_POST) {

    $user_id = $_POST['uid'];
    $data = "Id not found";
    $response = array();

    if (isset($user_id) && $user_id != "") {

      $login_query = mysqli_query($conn, " SELECT * FROM todo_list WHERE user_id = '" . $user_id . "' ");

      if (mysqli_num_rows($login_query) > 0) {
        $success = true;
        $data = "Details found";
        while ($row = mysqli_fetch_assoc($login_query)) {
          $id = $row['id'];
          $title = $row['title'];
          $check = $row['is_check'];
          $response[] = array('success'=> $success, 'data'=> $data, 'id'=> $id, 'title'=> $title, 'check'=> $check);
        }

      } else {
        $success = false;
        $data = "Nothing to do.";
        $response[] = array('success'=> $success, 'data'=> $data);
      }

    } else {
      $response[] = array('success'=> $success, 'data'=> $data);
    }



  } else {
    $response[] = array('success'=> $success, 'data'=> $data);
  }

  echo json_encode($response);

?>
