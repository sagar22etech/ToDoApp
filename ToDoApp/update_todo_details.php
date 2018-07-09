<?php
  include('connection.php');

  $data = "Request not Found.";
  $success = false;

  if ($_POST) {

    $todo_id = $_POST['todo_id'];
    $title = $_POST['edit_title'];
    $description = $_POST['edit_description'];
    $data = "Id not found";
    $response = array();

    if (isset($todo_id) && $todo_id != "") {

      $updtae_query = " UPDATE todo_list SET title = '" . $title . "', description = '" . $description . "' WHERE id = '" . $todo_id . "' ";

      if (mysqli_query($conn, $updtae_query)) {
          $success = true;
          $data = "Todo Updated";
          $details_query = mysqli_query($conn, " SELECT * FROM todo_list WHERE id = '" . $todo_id . "' ");

          if(mysqli_num_rows($details_query) > 0){
            $result = mysqli_fetch_assoc($details_query);
            $id = $result['id'];
            $title = $result['title'];
            $description = $result['description'];
            $response[] = array('success'=> $success, 'data'=> $data, 'id'=> $id, 'title'=> $title, 'description'=> $description);

          } else {
            $success = false;
            $data = "data not found";
            $response[] = array('success'=> $success, 'data'=> $data);
          }

      } else {
        $success = false;
        $data = "Update failed";
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
