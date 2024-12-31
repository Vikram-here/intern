let map;

async function initMap() {
    map = new mappls.Map('map', {center:{lat:coard.latitude,lng:coard.longitude} });
    var marker = new mappls.Marker({
        map: map,
        position: {"lat":coard.latitude,"lng":coard.longitude}
        });
};


initMap();
 

