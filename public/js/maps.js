// Default infoBox Rating Type
var infoBox_ratingType = 'star-rating';

(function($){
    "use strict";

    function mainMap() {

      // Locations
      // ----------------------------------------------- //
      var ib = new InfoBox();

      // Infobox Output
      function locationData(locationURL,locationImg,locationTitle,locationType,locationOpen, locationAddress, locationRating, locationRatingCounter) {
          return(''+
            '<div class="place-post info-style">' +
              '<div class="place-post__gal-box">' +
                '<img class="place-post__image" src="'+locationImg+'" alt="place-image">' +
              '</div>' +
             '<div class="place-post__content">' +
                '<div class="infoBox-close"><i class="fa fa-times"></i></div>'+
                '<h2 class="place-post__title"><a href="'+ locationURL +'">'+ locationTitle +'</a></h2>' +
                '<p class="place-post__info">' +
                  '<span>'+ locationType +'</span>' +
                  '<span>'+ locationOpen +'</span>' +
                '</p>' +
                '<p class="place-post__description">'+
                  '<span class="place-post__rating-2 average-rat">'+locationRatingCounter+'</span> <span>' + rateFunction(locationRating) + '</span></p>' +
                
               '</p>' +
                '<p class="place-post__address">'+locationAddress+'</p>' + 
              '</div>' +
            '</div>')
      }

      // Locations
      var locations = [
        [ locationData('listing-detail-large.html','upload/info1.jpg',"Fifteen Restaurant & Cheese bar", 'Restaurant', 'Open', '1149 3rd St (Wilshire), London', '3', '8.5'), 51.4984835, -0.1203308, 1, '<i class="la la-cutlery"></i>'],
        [ locationData('listing-detail-large.html','upload/info2.jpg','Frankies 457 Spuntino', 'Coffee', 'Closed', '457 Court St, Brooklyn', '2', '7.9'), 51.4889418, -0.0780963, 2, '<i class="fa fa-coffee"></i>'],
        [ locationData('listing-detail-large.html','upload/info5.jpg','Hotel Govendor', 'Restaurant', 'Open', 'de Veldestraat 5, Amsterdam', '4', '10'), 51.4763005, 0.0281958, 3, '<i class="la la-cutlery"></i>' ],
        [ locationData('listing-detail-large.html','upload/info3.jpg','Beautiful City Hostel & Hotel', 'Hotel', 'Closed', '1000 5th Ave to Central Park,, New York', '1', '9.0'), 51.4138859, 0.0041918, 4, '<i class="la la-hotel"></i>' ],
        [ locationData('listing-detail-large.html','upload/info4.jpg','Fifteen Restaurant & Cheese bar', 'Restaurant', 'Open', 'della Repubblica, Florence', '3', '7.9'), 51.5458899, -0.2858389, 5, '<i class="la la-cutlery"></i>'],
        [ locationData('listing-detail-large.html','upload/info2.jpg','Mabelle Coffee', 'Coffee', 'Open', '12 rue de l\'atlas, Paris', '1', '8.6'), 51.423754,-0.4777472, 6, '<i class="fa fa-coffee"></i>'],
        [ locationData('listing-detail-large.html','upload/info5.jpg','Hotel Hilton', 'Hotel', 'Closed', 'London, United Kingdom', '3', '9.2'), 51.6141438, -0.0957405, 7, '<i class="la la-hotel"></i>'],
        [ locationData('listing-detail-large.html','upload/info8.jpg','Resturant Fish Boat', 'Restaurant', 'Open', 'Via Mozart 14, Milan', '2', '9.8'), 51.430903, 0.2259189, 7, '<i class="la la-cutlery"></i>'],
        [ locationData('listing-detail-large.html','upload/info7.jpg','Best Places to visit', 'Visit Country', 'Open', 'Cockpit Theatre, London', '4', '8.9'), 51.3273188,0.0346171, 7, '<i class="la la-map-o"></i>'],
      ];


      // rating function
      function rateFunction(elem) {
        let arr=[];
        for(var i=0; i<4; i++) {
          if(i < elem) {
            arr.push('<i class="fa fa-usd red-col" aria-hidden="true"></i>');
          } else {
            arr.push('<i class="fa fa-usd" aria-hidden="true"></i>');
          }
        }
        return arr.join('');
      }

      // Map Attributes
      // ----------------------------------------------- //

      var mapZoomAttr = $('#map').attr('data-map-zoom');
      var mapScrollAttr = $('#map').attr('data-map-scroll');

      if (typeof mapZoomAttr !== typeof undefined && mapZoomAttr !== false) {
          var zoomLevel = parseInt(mapZoomAttr);
      } else {
          var zoomLevel = 5;
      }

      if (typeof mapScrollAttr !== typeof undefined && mapScrollAttr !== false) {
         var scrollEnabled = parseInt(mapScrollAttr);
      } else {
        var scrollEnabled = false;
      }


      // Main Map
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoomLevel,
        scrollwheel: scrollEnabled,
        center: new google.maps.LatLng(51.5344894,-0.1370057),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        panControl: false,
        navigationControl: false,
        streetViewControl: false,
        gestureHandling: 'cooperative'
      });


      // Marker highlighting when hovering listing item
      $('.listing-item-container').on('mouseover', function(){

        var listingAttr = $(this).data('marker-id');

        if(listingAttr !== undefined) {
          var listing_id = $(this).data('marker-id') - 1;
          var marker_div = allMarkers[listing_id].div;

          $(marker_div).addClass('clicked');

          $(this).on('mouseout', function(){
              if ($(marker_div).is(":not(.infoBox-opened)")) {
                 $(marker_div).removeClass('clicked');
              }
           });
        }

      });


      // Infobox
      // ----------------------------------------------- //

      var boxText = document.createElement("div");
      boxText.className = 'map-box'

      var currentInfobox;

      var boxOptions = {
              content: boxText,
              disableAutoPan: false,
              alignBottom : true,
              maxWidth: 0,
              pixelOffset: new google.maps.Size(-150, -55),
              zIndex: null,
              boxStyle: {
                width: "300px"
              },
              closeBoxMargin: "0",
              closeBoxURL: "",
              infoBoxClearance: new google.maps.Size(25, 25),
              isHidden: false,
              pane: "floatPane",
              enableEventPropagation: false,
      };


      var markerCluster, overlay, i;
      var allMarkers = [];

      var clusterStyles = [
        {
          textColor: 'white',
          url: '',
          height: 50,
          width: 50
        }
      ];


      var markerIco;
      for (i = 0; i < locations.length; i++) {

        markerIco = locations[i][4];

        var overlaypositions = new google.maps.LatLng(locations[i][1], locations[i][2]),

        overlay = new CustomMarker(
         overlaypositions,
          map,
          {
            marker_id: i
          },
          markerIco
        );

        allMarkers.push(overlay);

        google.maps.event.addDomListener(overlay, 'click', (function(overlay, i) {

        return function() {
             ib.setOptions(boxOptions);
             boxText.innerHTML = locations[i][0];
             ib.close();
             ib.open(map, overlay);
             currentInfobox = locations[i][3];
             // var latLng = new google.maps.LatLng(locations[i][1], locations[i][2]);
             // map.panTo(latLng);
             // map.panBy(0,-90);


            google.maps.event.addListener(ib,'domready',function(){
              $('.infoBox-close').click(function(e) {
                  e.preventDefault();
                  ib.close();
                  $('.marker-box').removeClass('clicked infoBox-opened');
              });

            });

          }
        })(overlay, i));

      }


      // Marker Clusterer Init
      // ----------------------------------------------- //

      var options = {
          imagePath: 'upload/',
          styles : clusterStyles,
          minClusterSize : 2
      };

      markerCluster = new MarkerClusterer(map, allMarkers, options);

      google.maps.event.addDomListener(window, "resize", function() {
          var center = map.getCenter();
          google.maps.event.trigger(map, "resize");
          map.setCenter(center);
      });



      // Custom User Interface Elements
      // ----------------------------------------------- //

      // Custom Zoom-In and Zoom-Out Buttons
        var zoomControlDiv = document.createElement('div');
        var zoomControl = new ZoomControl(zoomControlDiv, map);

        function ZoomControl(controlDiv, map) {

          zoomControlDiv.index = 1;
          map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(zoomControlDiv);
          // Creating divs & styles for custom zoom control
          controlDiv.style.padding = '5px';
          controlDiv.className = "zoomControlWrapper";

          // Set CSS for the control wrapper
          var controlWrapper = document.createElement('div');
          controlDiv.appendChild(controlWrapper);

          // Set CSS for the zoomIn
          var zoomInButton = document.createElement('div');
          zoomInButton.className = "custom-zoom-in";
          controlWrapper.appendChild(zoomInButton);

          // Set CSS for the zoomOut
          var zoomOutButton = document.createElement('div');
          zoomOutButton.className = "custom-zoom-out";
          controlWrapper.appendChild(zoomOutButton);

          // Setup the click event listener - zoomIn
          google.maps.event.addDomListener(zoomInButton, 'click', function() {
            map.setZoom(map.getZoom() + 1);
          });

          // Setup the click event listener - zoomOut
          google.maps.event.addDomListener(zoomOutButton, 'click', function() {
            map.setZoom(map.getZoom() - 1);
          });

      }


      // Scroll enabling button
      var scrollEnabling = $('#scrollEnabling');

      $(scrollEnabling).on('click', function(e){
          e.preventDefault();
          $(this).toggleClass("enabled");

          if ( $(this).is(".enabled") ) {
             map.setOptions({'scrollwheel': true});
          } else {
             map.setOptions({'scrollwheel': false});
          }
      })


      // Geo Location Button
      $("#geoLocation, .input-with-icon.location a").on('click', function(e){
          e.preventDefault();
          geolocate();
      });

      function geolocate() {

          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function (position) {
                  var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                  map.setCenter(pos);
                  map.setZoom(12);
              });
          }
      }

    }


    // Map Init
    var map =  document.getElementById('map');
    if (typeof(map) != 'undefined' && map != null) {
      google.maps.event.addDomListener(window, 'load',  mainMap);
    }


    // ---------------- Main Map / End ---------------- //


    // Single Listing Map
    // ----------------------------------------------- //

    function mapSingle() {

      var myLatlng = new google.maps.LatLng({lng: $( '#mapSingle' ).data('longitude'),lat: $( '#mapSingle' ).data('latitude'), });

      var single_map = new google.maps.Map(document.getElementById('mapSingle'), {
        zoom: 15,
        center: myLatlng,
        scrollwheel: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        panControl: false,
        navigationControl: false,
        streetViewControl: false
      });

      // Steet View Button
      $('#streetView').on('click', function(e){
         e.preventDefault();
         single_map.getStreetView().setOptions({visible:true,position:myLatlng});
         // $(this).css('display', 'none')
      });


      // Custom zoom buttons
      var zoomControlDiv = document.createElement('div');
      var zoomControl = new ZoomControl(zoomControlDiv, single_map);

      function ZoomControl(controlDiv, single_map) {

        zoomControlDiv.index = 1;
        single_map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(zoomControlDiv);

        controlDiv.style.padding = '5px';

        var controlWrapper = document.createElement('div');
        controlDiv.appendChild(controlWrapper);

        var zoomInButton = document.createElement('div');
        zoomInButton.className = "custom-zoom-in";
        controlWrapper.appendChild(zoomInButton);

        var zoomOutButton = document.createElement('div');
        zoomOutButton.className = "custom-zoom-out";
        controlWrapper.appendChild(zoomOutButton);

        google.maps.event.addDomListener(zoomInButton, 'click', function() {
          single_map.setZoom(single_map.getZoom() + 1);
        });

        google.maps.event.addDomListener(zoomOutButton, 'click', function() {
          single_map.setZoom(single_map.getZoom() - 1);
        });

      }


      // Marker
      var singleMapIco =  "<i class='"+$('#mapSingle').data('map-icon')+"'></i>";

      new CustomMarker(
        myLatlng,
        single_map,
        {
          marker_id: '1'
        },
        singleMapIco
      );


    }

    // Single Listing Map Init
    var single_map =  document.getElementById('mapSingle');
    if (typeof(single_map) != 'undefined' && single_map != null) {
      google.maps.event.addDomListener(window, 'load',  mapSingle);
    }

    // -------------- Single Listing Map / End -------------- //



    // Custom Map Marker
    // ----------------------------------------------- //

    function CustomMarker(latlng, map, args, markerIco) {
      this.latlng = latlng;
      this.args = args;
      this.markerIco = markerIco;
      this.setMap(map);
    }

    CustomMarker.prototype = new google.maps.OverlayView();

    CustomMarker.prototype.draw = function() {

      var self = this;

      var div = this.div;

      if (!div) {

        div = this.div = document.createElement('div');
        div.className = 'marker-box';

        div.innerHTML = '<div class="marker-holder">'+
                            '<div class="circle-icon">'+
                               '<div class="circle-icon-item">' + self.markerIco + '</div>'+
                               '<div class="border-arrow-btm"></div>'+
                            '</div>'+
                          '</div>'


        // Clicked marker highlight
        google.maps.event.addDomListener(div, "click", function(event) {
            $('.marker-box').removeClass('clicked infoBox-opened');
            google.maps.event.trigger(self, "click");
            $(this).addClass('clicked infoBox-opened');
        });


        if (typeof(self.args.marker_id) !== 'undefined') {
          div.dataset.marker_id = self.args.marker_id;
        }

        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
      }

      var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

      if (point) {
        div.style.left = (point.x) + 'px';
        div.style.top = (point.y) + 'px';
      }
    };

    CustomMarker.prototype.remove = function() {
      if (this.div) {
        this.div.parentNode.removeChild(this.div);
        this.div = null; $(this).removeClass('clicked');
      }
    };

    CustomMarker.prototype.getPosition = function() { return this.latlng; };

    // -------------- Custom Map Marker / End -------------- //



})(this.jQuery);
