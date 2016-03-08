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
        window.location.href="/champions";
    }

  });
});

function del(cha){
  $.ajax({
    method: 'delete',
    url: "/champions/"+cha,
    success: function(data){

        window.location.href="/champions";
    }

  });
}