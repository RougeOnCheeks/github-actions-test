const mapContainer = document.getElementById('map'),
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 4
    };

const map = new kakao.maps.Map(mapContainer, mapOption);

const circle = new kakao.maps.Circle({
    center: new kakao.maps.LatLng(33.450701, 126.570667), //원의 중심좌표
    radius: 50, //원의 반지름 단위: m
    strokeWeight: 3, //선의 두께
    strokeColor: '#0f69f1',
    strokeOpacity: 0.7,
    strokeStyle: 'dashed', //선의 스타일
    fillColor: '#0f69f1',
    fillOpacity: 0.4
});

circle.setMap(map);

const linePath = [
    new kakao.maps.LatLng(33.452344169439975, 126.56878163224233),
    new kakao.maps.LatLng(33.452739313807456, 126.5709308145358),
    new kakao.maps.LatLng(33.45178067090639, 126.5726886938753)
];

const polyline = new kakao.maps.Polyline({
    path: linePath,
    strokeWeight: 5,
    strokeColor: '#FFAE00',
    strokeOpacity: 1,
    strokeStyle: 'solid'
});

polyline.setMap(map);

const sw = new kakao.maps.LatLng(33.448842, 126.570379),
    ne = new kakao.maps.LatLng(33.450026,  126.568556);

const rectangleBounds = new kakao.maps.LatLngBounds(sw, ne);

const rectangle = new kakao.maps.Rectangle({
    bounds: rectangleBounds,
    strokeWeight: 3,
    strokeColor: '#FF3DE5',
    strokeOpacity: 1,
    strokeStyle: 'shortdashdot',
    fillColor: '#FF8AEF',
    fillOpacity: 0.7
});

rectangle.setMap(map);

const polygonPath = [
    new kakao.maps.LatLng(33.45133510810506, 126.57159381623066),
    new kakao.maps.LatLng(33.44955812811862, 126.5713551811832),
    new kakao.maps.LatLng(33.449986291544086, 126.57263296172184),
    new kakao.maps.LatLng(33.450682513554554, 126.57321034054742),
    new kakao.maps.LatLng(33.451346760004206, 126.57235740081413)
];

const polygon = new kakao.maps.Polygon({
    path: polygonPath,
    strokeWeight: 2,
    strokeOpacity:0.8,
    strokeColor: '#39DE2A',
    strokeOpacity: 0.8,
    strokeStyle: 'longdash',
    fillColor: '#A2FF99',
    fillOpacity: 0.7
});

polygon.setMap(map);