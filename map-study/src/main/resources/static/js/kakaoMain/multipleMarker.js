const mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 마커를 표시할 위치와 title 객체 배열입니다
const positions = [
    {
        title: '<div>카카오</div>',
        latlng: new kakao.maps.LatLng(33.450705, 126.570677)
    },
    {
        title: '<div>생태연못</div>',
        latlng: new kakao.maps.LatLng(33.450936, 126.569477)
    },
    {
        title: '<div>텃밭</div>',
        latlng: new kakao.maps.LatLng(33.450879, 126.569940)
    },
    {
        title: '<div>근린공원</div>',
        latlng: new kakao.maps.LatLng(33.451393, 126.570738)
    }
];
// //마커 이미지 소스
// var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
//
// //배열 순회하면서 마커 생성
// for(var i in positions){
//     var imageSize = new kakao.maps.Size(24, 35);
//     var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
//     var marker = new kakao.maps.Marker({
//         map: map,
//         position: positions[i].latlng,
//         title: positions[i].title,
//         image: markerImage
//     });
// }
const makeOverListener = (map, marker, infowindow) => {
    return function () {
        infowindow.open(map, marker);
    }
};

const makeOutListener = (infowindow) => {
    return function (){
        infowindow.close();
    }
}

for(let i in positions){
    const marker = new kakao.maps.Marker({
        map: map,
        position: positions[i].latlng
    });

    const infowindow = new kakao.maps.InfoWindow({
        content: positions[i].title
    });

    kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
    kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
}



//
//
// kakao.maps.event.addListener(map, 'click', function(mouseEvent){
//     addMarker(mouseEvent.latLng);
// });
//
// const markers = [];
//
// addMarker(new kakao.maps.LatLng(33.450701, 126.570667));
//
// function addMarker(position){
//     var marker = new kakao.maps.Marker({
//         position: position
//     });
//
//     marker.setMap(map);
//     markers.push(marker);
// }
//
// function setMarkers(map){
//     for(var i in markers){
//         markers[i].setMap(map);
//     }
// }
//
// function showMarkers(){
//     setMarkers(map);
// }
//
// function hideMarkers(){
//     setMarkers(null);
// }
