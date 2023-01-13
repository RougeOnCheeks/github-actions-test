const mapContainer = document.getElementById('map'),
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 2
    };

const map = new kakao.maps.Map(mapContainer, mapOption);

const polygonPath = [
    new kakao.maps.LatLng(33.450965145649576, 126.57020280169624),
    new kakao.maps.LatLng(33.450958085478554, 126.57011679275952),
    new kakao.maps.LatLng(33.45098043867851, 126.57006290510864),
    new kakao.maps.LatLng(33.45097328515681, 126.56995000794919),
    new kakao.maps.LatLng(33.450990859851004, 126.56981816664641),
    new kakao.maps.LatLng(33.45101296099739, 126.5696916806749),
    new kakao.maps.LatLng(33.45098334215462, 126.56960040542974),
    new kakao.maps.LatLng(33.450985176064975, 126.56947939729541),
    new kakao.maps.LatLng(33.450917277011726, 126.56939906680272),
    new kakao.maps.LatLng(33.45086322853736, 126.56941277823229),
    new kakao.maps.LatLng(33.45081577388131, 126.56937805752437),
    new kakao.maps.LatLng(33.450779813154405, 126.56940781273165),
    new kakao.maps.LatLng(33.45081633405741, 126.56953938654304),
    new kakao.maps.LatLng(33.45080569884398, 126.56972228175628),
    new kakao.maps.LatLng(33.450752219367345, 126.56990001069012),
    new kakao.maps.LatLng(33.45065801908533, 126.57003491859678),
    new kakao.maps.LatLng(33.45063139100987, 126.57015604858434),
    new kakao.maps.LatLng(33.45064506393239, 126.5701990028593)
];

const polygon = new kakao.maps.Polygon({
    path:polygonPath, // 그려질 다각형의 좌표 배열입니다
    strokeWeight: 3, // 선의 두께입니다
    strokeColor: '#39DE2A', // 선의 색깔입니다
    strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: 'solid', // 선의 스타일입니다
    fillColor: '#A2FF99', // 채우기 색깔입니다
    fillOpacity: 0.7 // 채우기 불투명도 입니다
});

polygon.setMap(map);

const mouseoverOption = {
    fillColor: '#EFFFED',
    fillOpacity: 0.8
};

const mouseoutOption = {
    fillColor: '#A2FF99', // 채우기 색깔입니다
    fillOpacity: 0.7 // 채우기 불투명도 입니다
};


kakao.maps.event.addListener(polygon, 'mouseover', function (){
    polygon.setOptions(mouseoverOption);
});

kakao.maps.event.addListener(polygon, 'mouseout', function (){
    polygon.setOptions(mouseoutOption);
});

let downCount = 0;
kakao.maps.event.addListener(polygon, 'mousedown', function (){
    console.log(event);
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `다각형에 mousedown 이벤트가 발생했습니다! ${++downCount}`;
});