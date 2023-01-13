const mapContainer = document.getElementById('map'),
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 2
    };

const map = new kakao.maps.Map(mapContainer, mapOption);

let drawingFlag = false;
let centerPosition;
let drawingCircle;
let drawingLine;
let drawingOverlay;
let drawingDot;

let circles = [];


kakao.maps.event.addListener(map, 'click', function(mouseEvent){
    if(!drawingFlag){
        drawingFlag = true;

        centerPosition = mouseEvent.latLng;

        if(!drawingLine){
            drawingLine = new kakao.maps.Polyline({
                strokeWeight: 3,
                strokeColor: '#00a0e9',
                strokeOpacity: 1,
                strokeStyle: 'solid'
            });
        }

        if(!drawingCircle){
            drawingCircle = new kakao.maps.Circle({
                strokeWeight: 1,
                strokeColor: '#00a0e9',
                strokeOpacity: 0.1,
                strokeStyle: 'solid',
                fillColor: '#00a0e9',
                fillOpacity: 0.2
            });
        }

        if(!drawingOverlay){
            drawingOverlay = new kakao.maps.CustomOverlay({
                xAnchor: 0,
                yAnchor: 0,
                zIndex: 1
            });
        }
    }
});

kakao.maps.event.addListener(map, 'mousemove', function (mouseEvent){

    if(drawingFlag){
        const mousePosition = mouseEvent.latLng;
        const linePath = [centerPosition, mousePosition];
        drawingLine.setPath(linePath);
        const length = drawingLine.getLength();
        if(length > 0){
            const circleOptions = {
                center: centerPosition,
                radius: length,
            };

            drawingCircle.setOptions(circleOptions);

            const radius = Math.round(drawingCircle.getRadius());
            const content = `<div class="info">반경 <span class="number">${radius}</span></div>`;

            drawingOverlay.setPosition(mousePosition);
            drawingOverlay.setContent(content);

            drawingCircle.setMap(map);
            drawingLine.setMap(map);
            drawingOverlay.setMap(map);
        }else{
            drawingCircle.setMap(null);
            drawingLine.setMap(null);
            drawingOverlay.setMap(null);
        }
    }
});

kakao.maps.event.addListener(map, 'rightclick', function (mouseEvent){
    if(drawingFlag){
        const rClickPosition = mouseEvent.latLng;
        const polyline = new kakao.maps.Polyline({
            path: [centerPosition, rClickPosition],
            strokeWeight: 3,
            strokeColor: '#00a0e9',
            strokeOpacity: 1,
            strokeStyle: 'solid'
        });

        const circle = new kakao.maps.Circle({
            center: centerPosition,
            radius: polyline.getLength(),
            strokeWeight: 1,
            strokeColor: '#00a0e9',
            strokeOpacity: 0.1,
            fillColor: '#00a0e9',
            fillOpacity: 0.2
        });

        const radius = Math.round(circle.getRadius()),
            content = getTimeHTML(radius);

        const radiusOverlay = new kakao.maps.CustomOverlay({
            content: content,
            position: rClickPosition,
            xAnchor: 0,
            yAnchor: 0,
            zIndex: 1
        });

        circle.setMap(map);
        polyline.setMap(map);
        radiusOverlay.setMap(map);
        const radiusObj = {
            'polyline': polyline,
            'circle': circle,
            'overlay': radiusOverlay
        };

        circles.push(radiusObj);

        drawingFlag = false;

        centerPosition = null;

        drawingCircle.setMap(null);
        drawingLine.setMap(null);
        drawingOverlay.setMap(null);
    }
});

const removeCircles = () => {
    for (let i in circles){
        circles[i].circle.setMap(null);
        circles[i].polyline.setMap(null);
        circles[i].overlay.setMap(null);
    }
    circles = [];
}

const getTimeHTML = (distance) => {
    let walkkTime = distance / 67 | 0;
    let walkHour = '', walkMin = '';

    if(walkkTime > 60){
        walkHour = `<span class="number">${Math.floor(walkkTime / 60)}</span>시간 `;
    }
    walkMin = `<span class="number">${walkkTime % 60}</span>분`;

    let bycicleTime = distance / 227 | 0;
    let bycicleHour = '', bycicleMin = '';

    if(bycicleTime > 60){
        bycicleHour = `<span class="number">${Math.floor(bycicleTime / 60)}</span>시간 `;
    }
    bycicleMin = `<span class="number">${bycicleTime % 60}</span>분`;

    let content = `<ul class="info">`;
    content += `    <li>`;
    content += `        <span class="label">총거리</span><span class="number">${distance}</span>m`;
    content += `    </li>`;
    content += `    <li>`;
    content += `        <span class="label">도보</span>${walkHour}${walkMin}`;
    content += `    </li>`;
    content += `    <li>`;
    content += `        <span class="label">자전거</span>${bycicleHour}${bycicleMin}`;
    content += `    </li>`;
    content += `</ul>`;

    return content;


}