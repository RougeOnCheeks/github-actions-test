var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(37.479103, 127.037444), //지도의 중심좌표. 지도를 생성하는데 반드시 필요
    level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

//지도, 스카이뷰
var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

//확대 축소 제어하는 줌 컨트롤 생성
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.CENTERRIGHT);
//TOPRIGHT, BOTTOMRIGHT 등으로 표시될 위치 정의

displayLevel();

getInfo();
/**
 * 지도 중심 이동
 */
function setCenter(){
    //이동할 위도 경도 위치 생성
    var moveLatLon = new kakao.maps.LatLng(37.4783447, 127.0374924);
    map.setCenter(moveLatLon);
}

/**
 * 지도 중심 부드럽게 이동: 지도가 표시되고 있는 영역크기를 벗어나지 않는 거리라면 애니메이션 효과처럼 지도를 부드럽게 이동
 */
function panTo(){
    var moveLatLon = new kakao.maps.LatLng(33.452613, 126.570888);
    map.panTo(moveLatLon);
}

/**
 * 지도 레벨 내리기
 */
function zoomIn(){
    //현재지도 레벨 get
    var level = map.getLevel();
    //지도를 1레벨 내리기(지도가 확대됨)
    map.setLevel(level - 1);
    displayLevel();
}

/**
 * 지도 레벨 올리기
 */
function zoomOut(){
    var level = map.getLevel();
    map.setLevel(level + 1);
    displayLevel();
}

/**
 * 지도 레벨 표시
 */
function displayLevel(){
    var levelEl = document.getElementById('maplevel');
    levelEl.innerHTML = '현재 지도레벨은 ' + map.getLevel() + ' 레벨 입니다.';
}

function getInfo(){
    var center = map.getCenter();

    var level = map.getLevel();

    var mapTypeId = map.getMapTypeId();

    var bounds = map.getBounds();

    var swLatLng = bounds.getSouthWest();

    var neLatLng = bounds.getNorthEast();

    var boundsStr = bounds.toString();

    var message = `지도 중심좌표: 위도 ${center.getLat()}, 경도 ${center.getLng()}\n`;
        message += `지도 레벨: ${level}\n`;
        message += `지도 타입: ${mapTypeId}\n`;
        message += `지도의 남서쪽 좌표: ${swLatLng.getLat()}, ${swLatLng.getLng()}\n`;
        message += `지도의 북동쪽 좌표: ${neLatLng.getLat()}, ${neLatLng.getLng()}\n`;
        message += `영역 정보 ((남, 서), (북, 동)): ${boundsStr}`;

    var messageEl = document.getElementById("getInfo");
    messageEl.innerText = message;
}

/**
 * 지도 이동(드래그) 막기
 * @param draggable
 */
function setDraggable(draggable){
    map.setDraggable(draggable);
}

/**
 * 지도 확대 축소 막기
 * @param zoomable
 */
function setZoomable(zoomable){
    map.setZoomable(zoomable);
}

/**
 * 지도타입 바꾸기 1
 */
var currentTypeId;

function setOverlayMapTypeId(maptype){
    var changeMaptype;

    if(maptype === 'traffic'){
        changeMaptype = kakao.maps.MapTypeId.TRAFFIC;
    }else if(maptype === 'roadview'){
        changeMaptype = kakao.maps.MapTypeId.ROADVIEW;
    }else if(maptype === 'terrain'){
        changeMaptype = kakao.maps.MapTypeId.TERRAIN;
    }else if(maptype === 'use_district'){
        changeMaptype = kakao.maps.MapTypeId.USE_DISTRICT;
    }

    if(currentTypeId){
        map.removeOverlayMapTypeId(currentTypeId);
    }

    map.addOverlayMapTypeId(changeMaptype);

    currentTypeId = changeMaptype;
}

/**
 * 지도타입 바꾸기 2
 */
var mapTypes = {
    terrain: kakao.maps.MapTypeId.TERRAIN,
    traffic: kakao.maps.MapTypeId.TRAFFIC,
    bicycle: kakao.maps.MapTypeId.BICYCLE,
    useDistrict: kakao.maps.MapTypeId.USE_DISTRICT
}

function setOverlayMapTypeId2(){
    var chkTerrain = document.getElementById('chkTerrain');
    var chkTraffic = document.getElementById('chkTraffic');
    var chkBicycle = document.getElementById('chkBicycle');
    var chkUseDistrict = document.getElementById('chkUseDistrict');

    for(var type in mapTypes){
        map.removeOverlayMapTypeId(mapTypes[type]);
    }

    if(chkUseDistrict.checked){
        map.addOverlayMapTypeId(mapTypes.useDistrict);
    }

    if(chkTerrain.checked){
        map.addOverlayMapTypeId(mapTypes.terrain);
    }

    if(chkTraffic.checked){
        map.addOverlayMapTypeId(mapTypes.traffic);
    }

    if(chkBicycle.checked){
        map.addOverlayMapTypeId(mapTypes.bicycle);
    }
}

/**
 * 지도 범위 재설정
 */
var points = [
    new kakao.maps.LatLng(33.452278, 126.567803),
    new kakao.maps.LatLng(33.452671, 126.574792),
    new kakao.maps.LatLng(33.451744, 126.572441)
]; //좌표 기준 지도 범위 표출

//지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성
var bounds = new kakao.maps.LatLngBounds();

var i, marker;
for(i = 0; i < points.length; i++){
    //배열의 좌표들이 잘 보이게 마커를 지도에 추가
    marker = new kakao.maps.Marker({position: points[i]});
    marker.setMap(map);

    //LatLngBounds 객체에 좌표 추가
    bounds.extend(points[i]);
}

function setBounds(){
    //재설정 시 지도의 중심좌표와 레벨이 변경될 수 있다.
    map.setBounds(bounds);
}

/**
 * 지도영역 크기 동적 변경
 */
function resizeMap(){
    var mapContainer = document.getElementById('map');
    mapContainer.style.width = '300px';
    mapContainer.style.height = '200px';
}

function relayout(){
    // 크기를 변경한 이후에는 반드시  map.relayout 함수를 호출해야 함
    map.relayout();
}

/**
 * 클릭 이벤트 등록
 */
kakao.maps.event.addListener(map, 'click', function (mouseEvent){
    var latlng = mouseEvent.latLng;
    var message = `클릭한 위치의 위도: ${latlng.getLat()},`;
    message += ` 경도: ${latlng.getLng()}`;

    var messageEl = document.getElementById("getInfo");
    messageEl.innerText = message;
});

/**
 * 클릭한 위치에 마커 표시
 */
var marker = new kakao.maps.Marker({
    position: map.getCenter()
});

marker.setMap(map);

kakao.maps.event.addListener(map, 'click', function (mouseEvent){
    var latlng = mouseEvent.latLng;

    marker.setPosition(latlng);

    var message = `클릭한 위치의 위도: ${latlng.getLat()},`;
    message += ` 경도: ${latlng.getLng()}`;

    var resultDiv = document.getElementById('clickLatlng');
    resultDiv.innerHTML = message;
});

/**
 * 이동 이벤트 등록
 */
kakao.maps.event.addListener(map, 'dragend', function (){
    var latlng = map.getCenter();

    var message = `변경된 지도 중심좌표의 위도 : ${latlng.getLat()},`;
    message += ` 경도: ${latlng.getLng()}`;

    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = message;
});

/**
 * 확대, 축소 이벤트 등록
 */
kakao.maps.event.addListener(map, 'zoom_changed', function (){
    var level = map.getLevel();

    var message = `현재 지도 레벨: ${level}`;
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = message;
});

/**
 * 중심좌표 변경 이벤트 등록: 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트 등록
 */
kakao.maps.event.addListener(map, 'center_changed', function (){
    var level = map.getLevel();
    var latlng = map.getCenter();

    var message = `현재 지도 레벨: ${level}\n`;
    message += `중심좌표의 위도 : ${latlng.getLat()}, 경도: ${latlng.getLng()}`;

    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = message;
});

/**
 * 타일로드 이벤트 등록
 */
kakao.maps.event.addListener(map, 'tilesloaded', displayMarker);

function displayMarker(){
    marker.setPosition(map.getCenter());
    marker.setMap(map);
}