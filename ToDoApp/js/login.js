var apiUrl = "http://192.168.1.121/nitesh/todoApp/";
// var apiUrl = "http://excellencetechnologies.co.in/nitesh/todoApp/";

$(document).ready(function() {
  $("#btn").click(function(e){
      e.preventDefault();
      var user = $("#email").val();
      var pass = $("#password").val();
      if( user != "" && pass != "" ){
            $.ajax({
                url: apiUrl + 'login.php',
                type:'post',
                data:{username:user, password:pass},
                dataType: 'json',
                success:function(response){
                  var hasData , message , userid;
                  for (var i = 0; i < response.length; i++) {
                    hasData = response[i].success;
                    message = response[i].data;
                    userid = response[i].id;
                  }
                  if(hasData){
                    window.localStorage.setItem("id",userid);
                    window.location.href="list.html";
                    $("#error-msg").empty();
                  }
                  else{
                    $("#error-msg").html(message);
                  }
                }
            });
        }
        else {
          $("#error-msg").html("Please fill all the fields");
        }
  });

});
