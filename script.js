// Initialize the map
var map = L.map('map', {
    center: [20, 0],
    zoom: 2,
    minZoom: 2,
    maxZoom: 18,
    worldCopyJump: true
});

// Define base map layers
var grayscaleMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
});

var satelliteMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 20
});

// Add grayscale map as default
grayscaleMap.addTo(map);

// Define mosasaur fossil locations with additional information
var mosasaurLocations = [
    {
        name: "Maastricht, Netherlands",
        lat: 50.8514,
        lon: 5.6909,
        info: "Home of the first discovered Mosasaurus hoffmanni. The type specimen is now in Paris.",
        link: "https://www.nhmmaastricht.nl/exposities/mosasaurus-experience/",
        species: "Mosasaurus hoffmanni",
        year: 1764
    },
    {
        name: "Kansas, United States",
        lat: 38.5266,
        lon: -96.7265,
        info: "Rich in mosasaur fossils, including Tylosaurus and Platecarpus.",
        link: "https://biodiversity.ku.edu/exhibits/mosasaur",
        species: "Tylosaurus, Platecarpus",
        year: 1868
    },
    {
        name: "South Dakota, United States",
        lat: 44.5000,
        lon: -100.2500,
        info: "Home to various mosasaur species, including a large Mosasaurus skull found in Ziebach County.",
        link: "https://en.wikipedia.org/wiki/Paleontology_in_South_Dakota#Scientific_research",
        species: "Mosasaurus",
        year: 1884
    },
    {
        name: "New Jersey, United States",
        lat: 40.0583,
        lon: -74.4057,
        info: "One of the first North American locations where mosasaur fossils were documented.",
        link: "https://www.jerseysbest.com/family/digging-for-dinosaurs-n-j/",
        species: "Mosasaurus dekayi",
        year: 1818
    },
    {
        name: "Delaware, United States",
        lat: 38.9108,
        lon: -75.5277,
        info: "Early mosasaur discoveries in North America, including specimens from the Navesink Formation.",
        link: "https://www.cambridge.org/core/services/aop-cambridge-core/content/view/0F755E786097773CBB67FB4546C90B4B/S0016774600021028a.pdf/recent_mosasaur_discoveries_from_new_jersey_and_delaware_usa_stratigraphy_taphonomy_and_implications_for_mosasaur_extinction.pdf",
        species: "Various",
        year: 1830
    },
    {
        name: "Badlands National Park, South Dakota",
        lat: 43.8554,
        lon: -102.3397,
        info: "Mosasaur fossils found in the Pierre Shale formation.",
        link: "https://en.wikipedia.org/wiki/Paleontology_in_South_Dakota#Protected_areas",
        species: "Various",
        year: 1890
    },
    {
        name: "Morden, Manitoba, Canada",
        lat: 49.1919,
        lon: -98.1011,
        info: "Home to 'Bruce', the largest mosasaur on display in the world, at the Canadian Fossil Discovery Centre.",
        link: "https://www.travelmanitoba.com/directory/canadian-fossil-discovery-centre/",
        species: "Tylosaurus pembinensis",
        year: 1974
    },
    {
        name: "Vega Island, Antarctica",
        lat: -63.8333,
        lon: -57.3167,
        info: "Fossils related to Tylosaurus have been found here.",
        link: "https://en.wikipedia.org/wiki/Mosasaurus#Distribution",
        species: "Tylosaurus-like",
        year: 2000
    },
    {
        name: "Alabama, United States",
        lat: 32.3182,
        lon: -86.9023,
        info: "Rich in mosasaur fossils, with seven species found at Harrell Station alone.",
        link: "https://hakaimagazine.com/news/alabamas-return-to-the-sea/",
        species: "Various",
        year: 1880
    },
    {
        name: "Kastamonu, Turkey",
        lat: 41.3887,
        lon: 33.7827,
        info: "Mosasaurus hoffmanni jaw fossils were discovered here.",
        link: "https://en.wikipedia.org/wiki/Timeline_of_mosasaur_research#2000s",
        species: "Mosasaurus hoffmanni",
        year: 2009
    }
];

// Create a single icon for all mosasaur locations
var mosasaurIcon = L.icon({
    iconUrl: 'https://img.icons8.com/color/48/000000/dinosaur.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38]
});

// Create a layer group for markers
var markersLayer = L.layerGroup().addTo(map);

// Function to add markers
function addMarkers(locations) {
    markersLayer.clearLayers();
    locations.forEach(function(location) {
        // Create markers for three copies of the world
        for (var i = -1; i <= 1; i++) {
            var lng = location.lon + i * 360;
            var marker = L.marker([location.lat, lng], {icon: mosasaurIcon})
                .bindPopup(
                    "<b>" + location.name + "</b><br>" +
                    "Species: " + (location.species || "Unknown") + "<br>" +
                    "Year: " + (location.year || "Unknown") + "<br>" +
                    location.info + "<br>" +
                    "<a href='" + location.link + "' target='_blank'>Learn more</a>"
                );
            markersLayer.addLayer(marker);
        }
    });
}

// Add initial markers
addMarkers(mosasaurLocations);

// Add search control
var searchControl = L.Control.extend({
    options: {
        position: 'topright'
    },
    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'search-control');
        var input = L.DomUtil.create('input', 'search-input', container);
        input.type = 'text';
        input.placeholder = 'Search locations...';
        L.DomEvent.addListener(input, 'keyup', function(e) {
            var value = e.target.value.toLowerCase();
            var filteredLocations = mosasaurLocations.filter(function(location) {
                return location.name.toLowerCase().includes(value) ||
                       (location.species && location.species.toLowerCase().includes(value));
            });
            addMarkers(filteredLocations);
        });
        return container;
    }
});
map.addControl(new searchControl());

// Add filter control
var filterControl = L.Control.extend({
    options: {
        position: 'topright'
    },
    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'filter-control');
        var select = L.DomUtil.create('select', 'filter-select', container);
        var option = L.DomUtil.create('option', '', select);
        option.innerHTML = 'Filter by species';
        option.value = '';
        var species = [...new Set(mosasaurLocations.map(location => location.species).filter(Boolean))];
        species.forEach(function(species) {
            var option = L.DomUtil.create('option', '', select);
            option.innerHTML = species;
            option.value = species;
        });
        L.DomEvent.addListener(select, 'change', function(e) {
            var value = e.target.value;
            var filteredLocations = value ? mosasaurLocations.filter(location => location.species === value) : mosasaurLocations;
            addMarkers(filteredLocations);
        });
        return container;
    }
});
map.addControl(new filterControl());

// Add a legend
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = '<h4>Mosasaur Fossil Locations</h4>';
    div.innerHTML += '<img src="' + mosasaurIcon.options.iconUrl + '" width="20" height="20"> Mosasaur Fossils';
    return div;
};
legend.addTo(map);

// Add layer control
var baseMaps = {
    "Grayscale": grayscaleMap,
    "Satellite": satelliteMap
};

L.control.layers(baseMaps).addTo(map);