<?php
  include('connection.php');

  $data = "Request not Found.";
  $success = false;

  if ($_POST) {

    $user_id = $_POST['uid'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    $data = "Id not found";
    $response = array();

    if (isset($user_id) && $user_id != "") {

      $insert_query = " INSERT INTO todo_list(title, description, user_id, is_check) VALUES('".$title."', '".$description."', '".$user_id."', '0') ";

      if(mysqli_query($conn, $insert_query)){

        $success = true;
        $data = "Todo add successfully.";
        $last_id = mysqli_insert_id($conn);
        $login_query = mysqli_query($conn, " SELECT * FROM todo_list WHERE id = '" . $last_id . "' AND user_id = '" . $user_id . "' ");
        $result = mysqli_fetch_assoc($login_query);
        $id = $result['id'];
        $title = $result['title'];
        $response[] = array('success'=> $success, 'data'=> $data, 'id'=> $id, 'title'=> $title);

      } else {
        $success = false;
        $data = "Add todo failed";
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
