var apiUrl = "http://192.168.1.121/nitesh/todoApp/";
// var apiUrl = "http://excellencetechnologies.co.in/nitesh/todoApp/";

$(document).ready(function(){
    $(".back").click(function(event) {
      event.preventDefault();
      window.history.back();
    });
    $("#signup_form").validate({
            rules: {
                name: {
                    required: true,
                    minlength:4,
                },
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 6
                }
            },
            messages: {
                name: {
                      required:"Please put your full name.",
                      minlength:"C'mon full name please."
                      },
                email: "Enter a valid email.",
                password: {
                      required: "Please provide a password",
                      minlength: "Your password must be 6 characters long"
                      },
            },
            submitHandler:function() {
                var name = $("#name").val();
                var email = $("#email").val();
                var password = $("#password").val();
                var birthday = $("#date").val();
                $.ajax({
                 url: apiUrl + 'signup.php',
                 type:'post',
                 data:{name:name, email:email, pass:password, bday:birthday},
                 dataType: 'json',
                 success:function(response){
                   var hasData , message;
                   for (var i = 0; i < response.length; i++) {
                     hasData = response[i].success;
                     message = response[i].data;
                   }
                   if (hasData) {
                     $("#signup_form")[0].reset();
                     window.location.href = "index.html";
                   }
                     $("#error-msg").html(message);
                 }
                });
        }
    });

});
