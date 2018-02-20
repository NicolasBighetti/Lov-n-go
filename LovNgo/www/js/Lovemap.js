const REFRESH_INTERVAL = 30000;
let map, heatmap, points;

function initMap() {
  console.log('INIT MAP');
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {
      lat: 43.6141724,
      lng: 7.0680878
    },
    mapTypeId: 'satellite'
  });

  points = new google.maps.MVCArray([]);
  heatmap = createHeatmap(points);
  setHeatmap(heatmap, map);
  changeGradient(heatmap);
  getPoints();
}

function changeGradient(hm) {
  const gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ];
  hm.set('gradient', gradient);
}


function createHeatmap(points) {
  return new google.maps.visualization.HeatmapLayer({
    data: points,
    map: map
  });
}

function setHeatmap(hm, map) {
  hm.setMap(map);
};


function getPoints() {
  console.log('getPoints called');
  const req = new XMLHttpRequest();
  const url = 'http://localhost:3000/api/lovers?lat=43.6141724&long=7.0680878&distance=1000';

  req.onreadystatechange = function(event) {
    if (this.readyState === XMLHttpRequest.DONE) {
      if (this.status === 200) {
        let i = 0;
        let point;
        const data_length = JSON.parse(this.responseText).data.length;
        for (i = 0; i < data_length; i += 1) {
          point = JSON.parse(this.responseText).data[i].location.coordinates;
          points.push(new google.maps.LatLng(JSON.parse(this.responseText).data[i].location.coordinates[1], JSON.parse(this.responseText).data[i].location.coordinates[0]));
        }
        console.log(points.length);
      } else {
        console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
      }
    }
  };

  //     new google.maps.LatLng(37.782551, -122.445368),

  req.open('GET', url, true);
  req.send();
};

setInterval(async function refreshPoints() {
  console.log('map refreshed');
  points.clear();
  getPoints();
}, REFRESH_INTERVAL);

/*
setTimeout(() => {
  console.log('ADD DOT');
  points.push(new google.maps.LatLng(43.613210, 7.125191));
}, 20000);
*/
