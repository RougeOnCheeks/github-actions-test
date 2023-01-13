const mapContainer = document.getElementById('map'),
    mapOption = {
        center: new kakao.maps.LatLng(37.498004414546934, 127.02770621963765),
        level: 3
    };

const map = new kakao.maps.Map(mapContainer, mapOption);

const coffeePositions = [
    new kakao.maps.LatLng(37.499590490909185, 127.0263723554437),
    new kakao.maps.LatLng(37.499427948430814, 127.02794423197847),
    new kakao.maps.LatLng(37.498553760499505, 127.02882598822454),
    new kakao.maps.LatLng(37.497625593121384, 127.02935713582038),
    new kakao.maps.LatLng(37.49646391248451, 127.02675574250912),
    new kakao.maps.LatLng(37.49629291770947, 127.02587362608637),
    new kakao.maps.LatLng(37.49754540521486, 127.02546694890695)
];

const storePositions = [
    new kakao.maps.LatLng(37.497535461505684, 127.02948149502778),
    new kakao.maps.LatLng(37.49671536281186, 127.03020491448352),
    new kakao.maps.LatLng(37.496201943633714, 127.02959405469642),
    new kakao.maps.LatLng(37.49640072567703, 127.02726459882308),
    new kakao.maps.LatLng(37.49640098874988, 127.02609983175294),
    new kakao.maps.LatLng(37.49932849491523, 127.02935780247945),
    new kakao.maps.LatLng(37.49996818951873, 127.02943721562295)
];

const carparkPositions = [
    new kakao.maps.LatLng(37.49966168796031, 127.03007039430118),
    new kakao.maps.LatLng(37.499463762912974, 127.0288828824399),
    new kakao.maps.LatLng(37.49896834100913, 127.02833986892401),
    new kakao.maps.LatLng(37.49893267508434, 127.02673400572665),
    new kakao.maps.LatLng(37.49872543597439, 127.02676785815386),
    new kakao.maps.LatLng(37.49813096097184, 127.02591949495914),
    new kakao.maps.LatLng(37.497680616783086, 127.02518427952202)
];

const markerImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png',
    coffeeMarkers = [],
    storeMarkers = [],
    carparkMarkers = [];

const createMarkerImage = (src, size, options) => {
    const markerImage = new kakao.maps.MarkerImage(src, size, options);
    return markerImage;
};

const createMarker = (position, image) => {
    const marker = new kakao.maps.Marker({
        position: position,
        image: image
    });
    return marker;
};

const createCoffeeMarkers = () => {
    for(let i in coffeePositions){
        const imageSize = new kakao.maps.Size(22,26),
            imageOptions = {
                spriteOrigin: new kakao.maps.Point(10, 0),
                spriteSize: new kakao.maps.Size(36, 98)
            };

        const markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),
            marker = createMarker(coffeePositions[i], markerImage);

        coffeeMarkers.push(marker);
    }
};

const setCoffeeMarkers = (map) => {
    for (let i in coffeeMarkers) {
        coffeeMarkers[i].setMap(map);
    }
};

const createStoreMarkers = () => {
    for(let i in storePositions){
        const imageSize = new kakao.maps.Size(22, 26),
            imageOptions = {
                spriteOrigin: new kakao.maps.Point(10, 36),
                spriteSize: new kakao.maps.Size(36, 98)
            };

        const markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),
            marker = createMarker(storePositions[i], markerImage);

        storeMarkers.push(marker);
    }
};

const setStoreMarkers = (map) => {
    for (let i in storeMarkers) {
        storeMarkers[i].setMap(map);
    }
};

const createCarparkMarkers = () => {
    for(let i in carparkPositions){
        const imageSize = new kakao.maps.Size(22, 26),
            imageOptions = {
                spriteOrigin: new kakao.maps.Point(10, 72),
                spriteSize: new kakao.maps.Size(36, 98)
            };
        const markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),
            marker = createMarker(carparkPositions[i], markerImage);

        carparkMarkers.push(marker);
    }
};

const setCarparkMarkers = (map) => {
    for(let i in carparkMarkers){
        carparkMarkers[i].setMap(map);
    }
};

const changeMarker = (type) => {
    const coffeeMenu = document.getElementById('coffeeMenu');
    const storeMenu = document.getElementById('storeMenu');
    const carparkMenu = document.getElementById('carparkMenu');

    if(type === 'coffee'){
        coffeeMenu.className = 'menu_selected';
        storeMenu.className = '';
        carparkMenu.className = '';

        setCoffeeMarkers(map);
        setStoreMarkers(null);
        setCarparkMarkers(null);

    }else if(type === 'store'){
        coffeeMenu.className = '';
        storeMenu.className = 'menu_selected';
        carparkMenu.className = '';

        setCoffeeMarkers(null);
        setStoreMarkers(map);
        setCarparkMarkers(null);

    }else if(type === 'carpark'){
        coffeeMenu.className = '';
        storeMenu.className = '';
        carparkMenu.className = 'menu_selected';

        setCoffeeMarkers(null);
        setStoreMarkers(null);
        setCarparkMarkers(map);
    }
};

createCoffeeMarkers();
createStoreMarkers();
createCarparkMarkers();

changeMarker('coffee');

