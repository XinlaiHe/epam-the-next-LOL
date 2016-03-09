function cancel(){
  window.location.href="/champions"
}

$("#addform").submit(function(e){
  e.preventDefault();
  $.ajax({
    method: 'post',
    data: $("#addform").serialize(),
    url: "/champions",
    success: function(data){

        window.location.href="/champions?action=add successfully";
    },
    error: function(data){

        window.location.href="/champions?action=add failed";
    }

  });
});

function del(cha){
  $.ajax({
    method: 'delete',
    url: "/champions/"+cha,
    success: function(data){

        window.location.href="/champions?action=delete successfully";
    },
    error: function(data){

        window.location.href="/champions?action=delete failed";
    }

  });
}
function hideUpdateBox(){

  $(".updatepanel").css("display", "none");
}

function showUpdateBox(name, image, masteries){

  $(".updatepanel").css("display", "block");
  $('#updateform').attr("action", name);
  $("input[name='name']").val(name);
  $("input[name='image']").val(image);
  $("input[name='masteries']").val(masteries.toString());

}


$('#updateform').submit(function(e){
  e.preventDefault();
  var name = $('#updateform').attr("action");
  $.ajax({
    method: "PUT",
    url: "/champions/"+name,
    data: $('#updateform').serialize(),
    success: function(data){

        window.location.href="/champions?action=update successfully";
    },
    error: function(data){

        window.location.href="/champions?action=update failed";
    }
  });
})