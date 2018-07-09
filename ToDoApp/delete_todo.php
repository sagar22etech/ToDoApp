<?php
  include('connection.php');

  $data = "Request not Found.";
  $success = false;

  if ($_POST) {

    $todo_id = $_POST['todo_id'];
    $data = "Id not found";
    $response = array();

    if (isset($todo_id) && $todo_id != "") {

      $delete_query = " DELETE FROM todo_list WHERE id = '".$todo_id."' ";

      if(mysqli_query($conn, $delete_query)){
        $success = true;
        $data = "Todo Deleted.";
        $response[] = array('success'=> $success, 'data'=> $data);

      } else {
        $success = false;
        $data = "Delete todo failed";
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
