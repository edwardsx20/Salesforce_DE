/*
// Set map height
$(document).on("pageshow","#mapspage", function( event ) {
  console.log("Entering mapspage"); 

  $("#backtohome").on("click", function() { 
  $.mobile.changePage("#menupage", { transition: "fade" });
  });

  //$("#map_canvas").css('width', $(window).width());
  // If you dont add a constructor ($('#map_canvas').gmap({'some_option':'some_value'});) the plugin will auto initialize 
  $('#map_canvas').gmap('addMarker', {'position': '57.7973333,12.0502107', 'bounds': true}).click(function() {
    $('#map_canvas').gmap('openInfoWindow', {'content': 'Hello World!'}, this);
  });
});
*/



function fixMapSize() { 
  console.log("attempting to fix map size");
  $("#map_canvas").css('height', $(window).height() - 47);
}

$(window).resize(function() {
  console.log("fixing map size");
  fixMapSize();
});

$(document).on("pageinit","#mapspage", function() {
   console.log("Entering mapspage");
   fixMapSize();
   //initializemap().done(function () { 
   // $('#map_canvas').gmap('refresh');
  // }); 



var defaultLatLng = new google.maps.LatLng(-33.4227993,-70.6078812); // Coyancura 2283

$('#map_canvas').gmap({'center': defaultLatLng}).bind('init', function(event, map) { 
  $(map).click( function(event) {
    console.log("map click event fired");
    $('#map_canvas').gmap('addMarker', {
      'position': event.latLng, 
      'draggable': true, 
      'bounds': false
    }, function(map, marker) {
      console.log("marker dialog fired");
      console.log(marker.__gm_id);
      $('#dialog').append('<form id="dialog'+marker.__gm_id+'" method="get" action="/" style="display:none;"><p><label for="country">Country</label><input id="country'+marker.__gm_id+'" class="txt" name="country" value=""/></p><p><label for="state">State</label><input id="state'+marker.__gm_id+'" class="txt" name="state" value=""/></p><p><label for="address">Address</label><input id="address'+marker.__gm_id+'" class="txt" name="address" value=""/></p><p><label for="comment">Comment</label><textarea id="comment" class="txt" name="comment" cols="40" rows="5"></textarea></p></form>');
      findLocation(marker.getPosition(), marker);
    }).dragend( function(event) {
      findLocation(event.latLng, this);
    }).click( function() {
      openDialog(this);
    })
  });
});

  $("#backtohome").on("click", function() { 
  $.mobile.changePage("#menupage", { transition: "fade" });
  });//end backtohome
});


$(document).on("pageshow","#mapspage", function( event ) {
   $('#map_canvas').gmap('refresh');
}); //end no pageshow
  

var initializemap = function () {
var r = $.Deferred();
console.log("Initializing ..");


setTimeout(function () {
    // and call `resolve` on the deferred object, once you're done
    r.resolve();
}, 2500);

return r;
}

function findLocation(location, marker) {
  $('#map_canvas').gmap('search', {'location': location}, function(results, status) {
    if ( status === 'OK' ) {
      $.each(results[0].address_components, function(i,v) {
        if ( v.types[0] == "administrative_area_level_1" || 
           v.types[0] == "administrative_area_level_2" ) {
          $('#state'+marker.__gm_id).val(v.long_name);
        } else if ( v.types[0] == "country") {
          $('#country'+marker.__gm_id).val(v.long_name);
        }
      });
      marker.setTitle(results[0].formatted_address);
      $('#address'+marker.__gm_id).val(results[0].formatted_address);
      openDialog(marker);
    }
  });
}

function openDialog(marker) {
  $('#dialog'+marker.__gm_id).dialog({'modal':true, 'title': 'Edit and save point', 'buttons': { 
    "Remove": function() {
      $(this).dialog( "close" );
      marker.setMap(null);
    },
    "Save": function() {
      $(this).dialog( "close" );
    }
  }});
}