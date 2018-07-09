var apiUrl = "http://192.168.1.121/nitesh/todoApp/";
// var apiUrl = "http://excellencetechnologies.co.in/nitesh/todoApp/";

$(document).ready(function() {
  var todo_id = window.localStorage.getItem("todo_id");
  $.ajax({
    url: apiUrl+'todo_details.php',
    type: 'POST',
    dataType: 'json',
    data: {todo_id : todo_id},
    success:function(response){
      console.log(response[0].data);
      if (response[0].data.toLowerCase() === "id not found" && response[0].success === false) {
        window.location.href = "index.html";
      }else {
      var data = "<div class='contents-header'>" +
        "<h4>" + response[0].title + "</h4>" +
        "<hr class='hr-line'>" +
      "</div>" +
      "<div class='contents-details'>" +
        "<p>" + response[0].description + "</p>" +
      "</div>";
      $(".contents").html(data);
    }
  }
  });
  $(".save_btns").prop('disabled', true).css('cursor', 'not-allowed');


  $(".edit_btns").click(function(){
    $(".save_btns").prop('disabled', false).css('cursor', 'pointer');
    $(".contents").attr('contentEditable',true);
    $(".contents").css('outline','none');
    $(".hr-line").hide();
    $(".contents-header").css('border','1px solid #ff3366');
    $(".contents-header").css('margin-bottom','20px');
    $(".contents-header").css('background','white').css('padding','10px 10px');
    $(".contents-header").css('border-radius','5px').css('color','#ff3366');
    $(".contents-details").css('border','1px solid #ff3366').css('padding-top','10px');
    $(".contents-details").css('background','white').css('padding-left','10px');
    $(".contents-details").css('color','#ff3366').css('border-radius','6px');
  });

  $(".save_btns").click(function(){
    $(".save_btns").prop('disabled', true).css('cursor', 'not-allowed');
    $(".contents").attr("contentEditable",false);
    $(".contents-header").css('border','none');
    $(".hr-line").show();
    $(".contents-header").css('background','none').css('padding','0');
    $(".contents-header").css('margin-bottom','0px');
    $(".contents-header").css('border-radius','none').css('color','white');
    $(".contents-details").css('border','none').css('padding-top','0');
    $(".contents-details").css('background','none').css('padding-left','0');
    $(".contents-details").css('color','white').css('border-radius','none');
    var title = $(".contents-header h4").html();
    var description = $(".contents-details p").html();
    $.ajax({
      url: apiUrl+'update_todo_details.php',
      type: 'POST',
      dataType: 'json',
      data: {todo_id : todo_id , edit_title : title , edit_description : description},
      success:function(response){
        console.log(response);
      }
    });
  });

  $("#back-btn").click(function(event) {
    event.preventDefault();
    window.history.back();
  });

  $("#logout-btn").click(function(event) {
    event.preventDefault();
    window.localStorage.clear();
    window.location.href = "index.html";
  });

});
