((global) => {
    global.addEventListener("DOMContentLoaded", () => {
        let latitude = 49.228477399999996;
        let longitude = 28.420087499999998;

        const map = generateMap(
            longitude,
            latitude,
            `pk.eyJ1IjoibWlzaGEtcnVzbmFjaGVua28iLCJhIjoiY2thbjFodWJwMTVyMDJ5bzY1cjBwa3lzYSJ9.-vZb5hKsJGcL_ttvZo387A`
        );

        fetchData(`https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=50&appid=1b5ee5a1a74d624a74750350327ea372`)
            .then(data =>
                data.list.forEach(item => createMarker(parseData(item)).addTo(map))
            );
    });

    const parseData = item => ({
        coordinates: [item.coord.lon, item.coord.lat],
        wind: item.wind,
        icon: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`,
    });
  
    const fetchData = url => fetch(url).then((response) => response.json());
  
    const createMarker = marker => {
        let el = document.createElement("div");
        el.className = "marker";
        el.style.backgroundImage = `url(${marker.icon})`;

        let popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<p>speed: ${marker.wind.speed},<br />deg: ${marker.wind.deg}</p>`
        );
    
        return new mapboxgl.Marker(el)
            .setLngLat(marker.coordinates)
            .setPopup(popup);
    };
  
    const generateMap = (longitude, latitude, token) => {
        mapboxgl.accessToken = token;
        return new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [longitude, latitude],
            zoom: 9,
        });
    };

    const btn = document.querySelector("#continue")
    const preloader = document.querySelector(".preload")
    btn.addEventListener('click', () => preloader.classList.add('hidden'))
})(window);