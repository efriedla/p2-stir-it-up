
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

$('button').on('click', function(e) {
        e.preventDefault();
        var query = $('input').val();
        $('#display').empty();
        $('h1').hide();
        $.get('/search/' + query).done(function(response){

          $('#display').html(response);
        });
      });
