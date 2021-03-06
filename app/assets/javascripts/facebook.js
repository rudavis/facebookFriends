jQuery(function() {
  $('body').prepend('<div id="fb-root"></div>');
  return $.ajax({
    url: "" + window.location.protocol + "//connect.facebook.net/en_US/all.js#status=0",
    dataType: 'script',
    cache: true
  });
});

window.fbAsyncInit = function() {
  FB.init({
    appId: '262757100561957',
    cookie: true
  });

  $('#sign_in').click(function(e) {
    e.preventDefault();
    return FB.login(function(response) {
      if (response.authResponse) {
        return window.location = '/auth/facebook/callback';
      }
    });
  });

  $('#sign_out').click(function(e) {
    FB.getLoginStatus(function(response) {
      if (response.authResponse) {
        return FB.logout();
      }
    });
    return true;
  });

$('#find').click(function(e) {
  $('#results tbody').empty();
  var city = document.getElementById("city").value;
  var query = "SELECT name,uid, current_location FROM user WHERE uid in (SELECT uid2 FROM friend WHERE uid1 = me()) AND '"+city+"' in current_location";
  console.log(query);
  FB.api({
    method: "fql.query",
    query: query
  }, 
  function(response) {
    //console.log(response);
    //console.log(response.length);
    if (response.length != 0){
      for (var i = 0; i < response.length; i++) {
        //console.log(response[i].name);
        //$('#logging').append("<li class='list-group-item'>"+response[i].name+"</li>");
        $('#results tbody').append("<tr><td><a href='#'>"+response[i].name+"</a></td><td>Philadelphia, PA</td><td><button type='button' class='btn btn-default btn-sm'><span class='glyphicon glyphicon-envelope'></span>&nbsp;&nbsp;Send Message</button></td></tr>");
      }
    } else {
      //TODO:  Handle No Search Results...
    }
  });
});
};
