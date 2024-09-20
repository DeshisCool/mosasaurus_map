// Initialize the map
var map = L.map('map').setView([20, 0], 2);

// Add the base map layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Define mosasaur fossil locations with additional information
var mosasaurLocations = [
    {
        name: "Maastricht, Netherlands",
        lat: 50.8514,
        lon: 5.6909,
        info: "Home of the first discovered Mosasaurus hoffmanni. The type specimen is now in Paris.",
        link: "https://www.nhmmaastricht.nl/exposities/mosasaurus-experience/"
    },
    {
        name: "Kansas, United States",
        lat: 38.5266,
        lon: -96.7265,
        info: "Rich in mosasaur fossils, including Tylosaurus and Platecarpus.",
        link: "https://biodiversity.ku.edu/exhibits/mosasaur"
    },
    {
        name: "South Dakota, United States",
        lat: 44.5000,
        lon: -100.2500,
        info: "Home to various mosasaur species, including a large Mosasaurus skull found in Ziebach County.",
        link: "https://en.wikipedia.org/wiki/Paleontology_in_South_Dakota#Scientific_research"
    },
    {
        name: "New Jersey, United States",
        lat: 40.0583,
        lon: -74.4057,
        info: "One of the first North American locations where mosasaur fossils were documented.",
        link: "https://www.jerseysbest.com/family/digging-for-dinosaurs-n-j/"
    },
    {
        name: "Delaware, United States",
        lat: 38.9108,
        lon: -75.5277,
        info: "Early mosasaur discoveries in North America, including specimens from the Navesink Formation.",
        link: "https://www.cambridge.org/core/services/aop-cambridge-core/content/view/0F755E786097773CBB67FB4546C90B4B/S0016774600021028a.pdf/recent_mosasaur_discoveries_from_new_jersey_and_delaware_usa_stratigraphy_taphonomy_and_implications_for_mosasaur_extinction.pdf"
    },
    {
        name: "Badlands National Park, South Dakota",
        lat: 43.8554,
        lon: -102.3397,
        info: "Mosasaur fossils found in the Pierre Shale formation.",
        link: "https://en.wikipedia.org/wiki/Paleontology_in_South_Dakota#Protected_areas"
    },
    {
        name: "Morden, Manitoba, Canada",
        lat: 49.1919,
        lon: -98.1011,
        info: "Home to 'Bruce', the largest mosasaur on display in the world, at the Canadian Fossil Discovery Centre.",
        link: "https://www.travelmanitoba.com/directory/canadian-fossil-discovery-centre/"
    },
    {
        name: "Vega Island, Antarctica",
        lat: -63.8333,
        lon: -57.3167,
        info: "Fossils related to Tylosaurus have been found here.",
        link: "https://en.wikipedia.org/wiki/Mosasaurus#Distribution"
    },
    {
        name: "Alabama, United States",
        lat: 32.3182,
        lon: -86.9023,
        info: "Rich in mosasaur fossils, with seven species found at Harrell Station alone.",
        link: "https://hakaimagazine.com/news/alabamas-return-to-the-sea/"
    },
    {
        name: "Kastamonu, Turkey",
        lat: 41.3887,
        lon: 33.7827,
        info: "Mosasaurus hoffmanni jaw fossils were discovered here.",
        link: "https://en.wikipedia.org/wiki/Timeline_of_mosasaur_research#2000s"
    }
];

// Create a custom icon for mosasaur markers
var mosasaurIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3014/3014738.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38]
});

// Add markers for mosasaur fossil locations
mosasaurLocations.forEach(function(location) {
    L.marker([location.lat, location.lon], {icon: mosasaurIcon})
        .addTo(map)
        .bindPopup("<b>" + location.name + "</b><br>" + location.info + "<br><a href='" + location.link + "' target='_blank'>Learn more</a>");
});

// Add a layer control
var baseMaps = {
    "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }),
    "Satellite": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    })
};

L.control.layers(baseMaps).addTo(map);

// Add a legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += '<img src="https://cdn-icons-png.flaticon.com/512/3014/3014738.png" width="20" height="20"> Mosasaur Fossil Locations';
    return div;
};

legend.addTo(map);