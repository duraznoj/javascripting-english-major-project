// Define and assign a Markdown-it renderer.
/*let md;
md = window.markdownit({html: true}).use(window.markdownitFootnote);
// Load the Markdown file with jQuery.*/
/*$.ajax({
  url: "https://the-javascripting-english-major.org/v1/examples/markdown/hastings-street.md",
  success: function(markdown){*/
  /*$.ajax({
    url: "https://raw.githubusercontent.com/durasno/javascripting-english-major-project/master/data/hastings-street.md",
    success: function(markdown){
    // Convert the Markdown to HTML.
    let html;
    html = md.render(markdown);
    // Print the HTML to #content using jQuery.
    $("#content").html(html); //code wasn't working because content wasn't defined in the html sample
  }
});*/
let md;
md = window.markdownit({html: true}).use(window.markdownitFootnote);
["hastings-street", "eighteenth-and-vine",
  "fifth-and-mound", "introduction",
  "lenox-avenue", "rampart"].forEach(function(tab){
  // Create a variable tab that has the name as a string.
  $.ajax({
    // tab + ".md" yields, for example, "rampart.md".
    /*url: "https://the-javascripting-english-major.org/v1/examples/markdown/" + tab + ".md",*/
    url: "https://raw.githubusercontent.com/duraznoj/javascripting-english-major-project/master/data/" + tab + ".md",
    success: function(markdown){
      let html;
      html = md.render(markdown);
      // "#rampart", for example.
      $("#" + tab).html(html);
    }
  });
});

let map, tileLayer;
map = L.map("could-be-map");
tileLayer = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
              attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> &copy; <a href='http://carto.com/attribution'>CARTO</a>",
              subdomains: "abcd",
              maxZoom: 18
            }).addTo(map);
map.setView([40.730833, -73.9975], 16);

// Define the features array.
let couldBeFeatures;
/*$.getJSON("https://the-javascripting-english-major.org/v1/could-be.geo.json", function(data){*/
$.getJSON("https://raw.githubusercontent.com/durasno/javascripting-english-major-project/master/data/could-be.geo.json", function(data){
  //console.log(data.features[1].properties.name);
  // Define the Leaflet layer.
  let couldBeLayer;
  // Iterate over the .features property of the GeoJSON object to
  // create an array of objects (features), with every object’s
  // properties as noted.
  couldBeFeatures = data.features.map(function(feature){
    // This return returns an object.
    return {
      name: feature.properties.name,
      html: feature.properties.html,
      tab: feature.properties.tab,
      mentions: feature.properties.mentions,
      lines: feature.properties.lines,
      wikipedia: feature.properties.wikipedia,
      // Create an L.latLng object out of the GeoJSON coordinates.
      // Remember that in GeoJSON, the coordinates are reversed
      // (longitude, then latitude).
      latLng: L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0])
    };
  });
  // Now create a Leaflet feature group made up of markers for each
  // object in couldBeFeatures.
  couldBeLayer = L.featureGroup(couldBeFeatures.map(function(feature){
    return L.marker(feature.latLng);
    })
  );
  // Add the layer to the map.
  couldBeLayer.addTo(map);
  // Redraw the map so that all the markers are visible.
  map.fitBounds(couldBeLayer.getBounds());
  // Zoom out one level to give some padding.
  map.zoomOut(1);
});
