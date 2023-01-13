var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(37.54699, 127.09598), // 지도의 중심좌표
        level: 4 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소
    imageSize = new kakao.maps.Size(64, 69), // 마커이미지 크기
    imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정

//마커 이미지
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
//마커 표시 위치
var markerPosition = new kakao.maps.LatLng(37.54699, 127.09598);

//마커 생성
var marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage,
    clickable: true //마커 클릭 시 지도의 클릭 이벤트 발생하지 않도록 설정
});

//마커 표시
marker.setMap(map);

//마커 제거
// marker.setMap(null);

//드래그 가능한 마커 생성
marker.setDraggable(true);

//인포윈도우: 표시할 제목, 좌표 넣으면 링크에서 표출
var iwContent = '<div style="padding:5px;">Hello World! <br><a href="https://map.kakao.com/link/map/야구장,37.54699,127.09598" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/야구장,37.54699,127.09598" style="color:blue" target="_blank">길찾기</a></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
//var iwContent = `<div style="padding:5px;">Hello World!</div>`,
    //iwPosition = new kakao.maps.LatLng(37.54699, 127.09598), //인포윈도우 표시할 좌표
    iwRemovable = true; //인포윈도우 x 버튼

var infowindow = new kakao.maps.InfoWindow({
   //map: map,
   //position: iwPosition,
   content: iwContent,
   removable: iwRemovable
});

//마커에 클릭이벤트 등록: 클릭시 인포 윈도우 표출
kakao.maps.event.addListener(marker, 'click', function (){
    infowindow.open(map, marker);
});

//마커에 마우스오버 이벤트 등록
kakao.maps.event.addListener(marker, 'mouseover', function (){
    infowindow.open(map, marker);
});

//마커에 마우스아웃 이벤트 등록
kakao.maps.event.addListener(marker, 'mouseout', function(){
    infowindow.close();
});
