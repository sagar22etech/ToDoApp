var apiUrl = "http://192.168.1.121/nitesh/todoApp/";
// var apiUrl = "http://excellencetechnologies.co.in/nitesh/todoApp/";

$(document).ready(function() {
    // Fetching the data
    var uid = window.localStorage.getItem("id");
    $.ajax({
      url: apiUrl+'todo_list.php',
      type: 'POST',
      dataType: 'json',
      data: {uid: uid},
      success:function(response){
        $.each(response,function(i, data) {
          var isChecked , done , success;
          success = data.success;
          if (success) {
            if(data.check=='1'){
              isChecked = "checked";
              done = true;
            }
            else {
              isChecked = "";
              done = false;
            }
            var listdata = "<li id='"+data.id+"'>" +
              "<label>" +
                "<input type='checkbox' "+isChecked+">" +
                "<span class='box'></span>" +
                "<a href='javascript:void(0)' class='box-text'>"+data.title+"</a>" +
                "<div class='delete-todo-item'>" +
                  "<a href='javascript:void(0)'>" +
                    "<i class='material-icons'>delete</i>" +
                  "</a>" +
                "</div>" +
              "</label>" +
            "</li>"
            $(".todos").append(listdata);
            if(done){
              $("#"+data.id+" a.box-text").css('text-decoration', 'line-through');
            }
            else {
              $("#"+data.id+" a.box-text").css('text-decoration', 'none');
            }
          }
          else {
            if (data.data.toLowerCase() === "id not found") {
              window.location.href = "index.html";
            }
            else {
              var listdata = "<li class='ntdo' style='border:none; color: #fff; text-align: center; font-size: 34px; padding-left:0;'>"
              +data.data+
              "</li>"
              $(".todos").html(listdata);
            }

          }

        });
      }
    });

    // Adding The data
    $("#save_task").click(function(event) {
      event.preventDefault();
      var title = $("#defaultForm-email").val();
      var description = $("#defaultForm-pass").val();
      if (title != "" && description != "") {
        $.ajax({
          url: apiUrl+'add_todo.php',
          type: 'POST',
          dataType: 'json',
          data: {uid: uid , title : title , description : description},
          success:function(response){
            $.each(response,function(i, data) {
              var hasData = data.success;
              var msg = data.data;
              var listdata = "<li id='"+data.id+"'>" +
                "<label>" +
                  "<input type='checkbox'/>" +
                  "<span class='box'></span>" +
                  "<a href='javascript:void(0)' class='box-text'>"+data.title+"</a>" +
                  "<div class='delete-todo-item'>" +
                    "<a href='javascript:void(0)'>" +
                      "<i class='material-icons'>delete</i>" +
                    "</a>" +
                  "</div>" +
                "</label>" +
              "</li>";
              $(".ntdo").remove();
              $(".todos").append(listdata);
              if (hasData) {
                $("#success-msg").html(msg).show();
                setTimeout(function() { $("#success-msg").hide(); }, 2000);
              }
            });
             $("#addTodoForm")[0].reset();
          }
        })
      }
      else {
        $("#success-msg").html("Please Fill All The Fields").show();
      }
    });

    // Deleteing todo items
    $(document).on('click', '.delete-todo-item', function () {
      var todo_id = $(this).parentsUntil('ul')[1].id;
      $.ajax({
        url: apiUrl+'delete_todo.php',
        type: 'POST',
        dataType: 'json',
        data: {todo_id: todo_id},
        success:function(response){
          var hasData;
          for (var i = 0; i < response.length; i++) {
            hasData = response[i].success;
          }
          if (hasData) {
              $("#"+todo_id).remove();
              if (!$("ul").has("li").length) {
                    var listdata = "<li class='ntdo' style='border:none; color: #fff; text-align: center; font-size: 34px; padding-left:0;'>"
                    +"Nothing to do."+"</li>"
                $(".todos").html(listdata);
              }
          }
        }
      });
    });

// Check Todo
    $(document).on('click', 'input[type="checkbox"]', function () {
      var id = $(this).parentsUntil('ul')[1].id;
      var isChecked=false;
      isChecked = $(this).is(":checked");
      if(isChecked){
        $("#"+id+" a.box-text").css('text-decoration', 'line-through');
      }
      else {
        $("#"+id+" a.box-text").css('text-decoration', 'none');
      }
      var todo_id = $(this).parentsUntil('ul')[1].id;
      $.ajax({
        url: apiUrl+'check_todo.php',
        type: 'POST',
        dataType: 'json',
        data: {is_checked : isChecked , todo_id : todo_id},
        success:function(response){
        }
      });
    });

    // Details Of todos
    $(document).on('click', '.list ul li label > a', function () {
      var id = $(this).parentsUntil('ul')[1].id;
      window.localStorage.setItem("todo_id" , id );
      window.location.href = "details.html";
    });

    $("#logout-btn").click(function(event) {
      event.preventDefault();
      window.localStorage.clear();
      window.location.href = "index.html";
    });

});
