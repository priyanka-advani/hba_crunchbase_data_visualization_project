var map, heatmap, points;

function getPoints() {

  points = [];
  $.get('/heatmap.json', function (heatmap_data) {
    var la, lo, w, point;
    for (var key in heatmap_data) {
      la = heatmap_data[key]['lat'];
      lo = heatmap_data[key]['lng'];
      w = heatmap_data[key]['weight'];
      point = {location: new google.maps.LatLng(la, lo), weight: w};
      points.push(point);
    }
  });
  return points;
}


function initMap() {
  map = new google.maps.Map(document.getElementById('heatmap'), {
    center: {lat: 39, lng: -95},
    zoom: 4
  });

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(),
    maxIntensity: 75,
    radius: 12,
    map: map
  });
}
