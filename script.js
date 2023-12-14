let map;
let markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 0, lng: 0 },
    zoom: 2
  });
}

function fetchAndShowMarkers() {
  // Replace the URL with the endpoint to fetch data from your backend
  fetch('http://localhost:3000/api/maps/N6li0OqYcC4YIMdoIByK')
    .then(response => response.json())
    .then(data => {
      clearMarkers();
      data.forEach(item => {
        const marker = new google.maps.Marker({
          position: { lat: parseFloat(item.lat), lng: parseFloat(item.lng) },
          map: map,
          title: item.title
        });
        markers.push(marker);
      });
      fitBounds();
    })
    .catch(error => console.error('Error fetching markers:', error));
}

function clearMarkers() {
  markers.forEach(marker => marker.setMap(null));
  markers = [];
}

function fitBounds() {
  const bounds = new google.maps.LatLngBounds();
  markers.forEach(marker => bounds.extend(marker.getPosition()));
  map.fitBounds(bounds);
}
