$(document).ready(
  function(){
    
    $(":text").labelify();
    
    $('.coding .commits').githubInfoWidget({
        'user': 'tav', 
        'repo': 'togethr', 
        'branch': 'master', 
        'last': 6, 
        'limitMessageTo': 90
      }
    );
    
    // http://search.twitter.com/search.json?geocode=37.781157,-122.398720,1mi
    
    /*
    
    var render_background = function (location) {
      var url = 'http://maps.google.com/maps/api/staticmap';
      var params = {
        'center': location.latitude + ',' + location.longitude,
        'format': 'png32',
        'zoom': '12',
        'size': '640x640',
        'sensor': false
      };
      var img = '<img src="' + url + '?' + $.param(params) + '" class="bg" />';
      $('body').prepend(img);
    };
    
    */
    
    var render_map = function (location) {
      var ll = new google.maps.LatLng(location.latitude, location.longitude);
      var options = {
        'zoom': 13,
        'disableDefaultUI': true,
        'center': ll,
        'mapTypeId': google.maps.MapTypeId.ROADMAP
      };
      var target = $('.map .canvas').get(0);
      var map = new google.maps.Map(target, options);
    };
    
    var store_location = function (location) {
      $.cookie(
        'togethr-ll', 
        location.latitude + ',' + location.longitude
      );
    };
    var default_location = {
      'latitude': 51.5001524,
      'longitude': -0.1262362
    };
    var ll = $.cookie('togethr-ll');
    if (ll) {
      var parts = ll.split(',');
      var location = {
        'latitude': parts[0],
        'longitude': parts[1]
      };
      render_map(location);
    }
    else {
      $.geolocation.find(
        function (location) {
          store_location(location);
          render_map(location);
        },
        function () {
          render_map(default_location);
        }
      );
    }
});