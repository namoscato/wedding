(function () {
  "use strict";

  var $window = $(window);
  var $balloons = $("#balloons");
  var $balloonStrings = $("#balloon-strings");
  var $pittsburgh = $("#pittsburgh");

  $window.scroll(function () {
    var scrollTop = $window.scrollTop();
    var progress = scrollTop > 800 ? 1 : scrollTop / 800;

    $balloons.css({
      transform:
        "translate3d(" +
        (-20 * progress - 50) +
        "%, " +
        scrollTop / 100 +
        "%, 0) scale(" +
        (1 + 0.3 * progress) +
        ")",
    });
    $pittsburgh.css({
      transform: "translate3d(0, -" + 1.875 * progress + "rem, 0)",
    });
    $balloonStrings.css({
      transform:
        "translate3d(-" +
        1.5625 * progress +
        "rem, -" +
        1.875 * progress +
        "rem, 0) rotate(-" +
        19 * progress +
        "deg)",
    });
  });

  $("#rsvp-link").click(function (event) {
    event.preventDefault();

    window.open(
      "https://www.theknot.com/us/tesin-gnalian-and-nicholas-amoscato-aug-2019/rsvp",
      "popup",
      "width=600, height=600, top=" +
        (window.screen.height / 2 - 300) +
        ", left=" +
        (window.screen.width / 2 - 300)
    );
  });

  $(".actions-link").click(function () {
    gtag("event", "Click", {
      event_category: "Link",
      event_label: $(this).text(),
    });
  });

  var layer = "watercolor";
  var markers = [
    {
      position: { lat: 40.608357, lng: -80.106538 },
      title: "Saints John & Paul Catholic Church",
      titleHref: "https://stsjohnandpaul.org/sts-john-paul",
      address: "2586 Wexford Bayne Road<br>Sewickley, Pennsylvania",
      addressHref: "https://goo.gl/maps/n7XwJgA7Uuu",
    },
    {
      position: { lat: 40.437597, lng: -80.017692 },
      title: "LeMont Restaurant",
      titleHref: "http://www.lemontpittsburgh.com/LeMont/",
      address: "1114 Grandview Ave<br>Pittsburgh, Pennsylvania",
      addressHref: "https://goo.gl/maps/QcGMZmihPon",
    },
    {
      position: { lat: 40.43496, lng: -80.006383 },
      title: "Sheraton Hotel",
      titleHref:
        "https://www.marriott.com/event-reservations/reservation-link.mi?id=1549056377311&key=GRP&app=resvlink",
      address: "300 W Station Square Dr<br>Pittsburgh, Pennsylvania",
      addressHref: "https://goo.gl/maps/3TVc3K3gdDG2",
    },
    {
      position: { lat: 40.437443, lng: -79.998973 },
      title: "Distrikt Hotel",
      titleHref: "http://group.curiocollection.com/GnalianAmoscatoWedding",
      address: "453 Boulevard of the Allies<br>Pittsburgh, Pennsylvania",
      addressHref: "https://goo.gl/maps/xsHWrkPu7K22",
    },
    {
      position: { lat: 40.44073, lng: -79.993769 },
      title: "DoubleTree Hotel",
      titleHref:
        "https://doubletree.hilton.com/en/dt/groups/personalized/P/PITDTDT-GAW-20190808/index.jhtml",
      address: "1 Bigelow Square<br>Pittsburgh, Pennsylvania",
      addressHref: "https://goo.gl/maps/AuvxEu9oiCA2",
    },
  ];

  var infoWindow = new google.maps.InfoWindow();
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.5468170582639, lng: -80.0461131953125 },
    zoom: 11,
    mapTypeControl: false,
    mapTypeId: layer,
    mapTypeControlOptions: {
      mapTypeIds: [layer],
    },
  });

  map.mapTypes.set(layer, new google.maps.StamenMapType(layer));

  markers.forEach(function (config) {
    config.map = map;

    var marker = new google.maps.Marker(config);

    marker.addListener("click", function () {
      infoWindow.setContent(
        '<div class="map-info">' +
          '<h2 class="map-info-title"><a href="' +
          config.titleHref +
          '" target="_blank">' +
          config.title +
          "</a></h2>" +
          '<p><a href="' +
          config.addressHref +
          '" title="Open in Google Maps" target="_blank">' +
          config.address +
          "</a></p>" +
          "</div>"
      );

      infoWindow.open(map, marker);

      if (map.getZoom() < 12) {
        map.setZoom(12);
      }

      map.panTo(
        new google.maps.LatLng(config.position.lat, config.position.lng)
      );
    });
  });
})();
