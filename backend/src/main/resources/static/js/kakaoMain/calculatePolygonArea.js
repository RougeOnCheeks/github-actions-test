const mapContainer = document.getElementById('map'),
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
    };

const map = new kakao.maps.Map(mapContainer, mapOption);

let drawingFlag = false;
let drawingPolygon;
let polygon;
let areaOverlay;


kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
    const clickPositon = mouseEvent.latLng;

    if(!drawingFlag){
        drawingFlag = true;

        if(polygon){
            polygon.setMap(null);
            polygon = null;
        }

        if(areaOverlay){
            areaOverlay.setMap(null);
            areaOverlay = null;
        }

        drawingPolygon = new kakao.maps.Polygon({
            map: map,
            path: [clickPositon],
            strokeWeight: 3,
            strokeColor: '#00a0e9',
            strokeOpacity: 1,
            strokeStyle: 'solid',
            fillColor: '#00a0e9',
            fillOpacity: 0.2
        });

        polygon = new kakao.maps.Polygon({
            path: [clickPositon],
            strokeWeight: 3,
            strokeColor: '#00a0e9',
            strokeOpacity: 1,
            strokeStyle: 'solid',
            fillColor: '#00a0e9',
            fillOpacity: 0.2
        });
    }else{
        const drawingPath = drawingPolygon.getPath();
        drawingPath.push(clickPositon);
        drawingPolygon.setPath(drawingPath);

        const path = polygon.getPath();
        path.push(clickPositon);
        polygon.setPath(path);
    }
});

kakao.maps.event.addListener(map, 'mousemove', function (mouseEvent) {
   if(drawingFlag){
       const mousePosition = mouseEvent.latLng;
       const path = drawingPolygon.getPath();
        if(path.length > 1){
            path.pop();
        }
        path.push(mousePosition);
        drawingPolygon.setPath(path);
   }
});

kakao.maps.event.addListener(map, 'rightclick', function (mouseEvent) {
   if(drawingFlag){
       drawingPolygon.setMap(null);
       drawingPolygon = null;
       const path = polygon.getPath();
       if(path.length > 2) {
           polygon.setMap(map);
           const area = Math.round(polygon.getArea()),
               content = `<div class="info">총면적 <span class="number">${area}</span> m<sup>2</sup></div>`;

           areaOverlay = new kakao.maps.CustomOverlay({
               map: map,
               content: content,
               xAnchor: 0,
               yAnchor: 0,
               position: path[path.length - 1]
           });
       }else{
           polygon = null
       }

       drawingFlag = false;
   }
});