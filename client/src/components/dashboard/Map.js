import React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2VzaGcwOTEyIiwiYSI6ImNsZGRlMjNmYzAycWIzb3MwdGxhaTd2aWUifQ.Ah1yPzjAal0Ez-QZC36M2A";

class Map extends React.Component {
  componentDidMount() {
    // Creates new map instance
    var map = new mapboxgl.Map({
      container: this.mapWrapper,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [76.68346, 28.99329],
      zoom: 12,
    });

    map.on("idle", function () {
      map.resize();
    });
    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: true,
      zoom: 20,
    });

    map.addControl(geocoder);

    // var marker = new mapboxgl.Marker();

    // map.on("click", function () {
    //   var coordinates = marker.lngLat;
    //   console.log("Lng:", coordinates.lng, "Lat:", coordinates.lat);
    //   marker.setLngLat(coordinates).addTo(map);
    // });

    // new mapboxgl.Marker()
    //   .setLngLat([77.67999, 29.00393])
    //   .setPopup(
    //     new mapboxgl.Popup({ offset: 25 }) // add popups
    //       .setHTML(
    //         `<h3>Heading</h3><p>This is the popup marker description</p>`
    //       )
    //   )
    //   .addTo(map);
    // new mapboxgl.Marker().setLngLat([79.67628, 29.0308]).addTo(map);
    // new mapboxgl.Marker().setLngLat([79.49764, 28.60245]).addTo(map);

    // // Creates new directions control instance
    // var directions = new MapboxDirections({
    //   accessToken: mapboxgl.accessToken,
    //   unit: "metric",
    //   profile: "mapbox/driving",
    //   interactive: false,
    // });

    // // Integrates directions control with map
    // map.addControl(directions, "top-left");

    // //add waypoints
    // map.on("load", function () {
    //   directions.setOrigin([76.68346, 28.99329]);
    //   directions.addWaypoint(0, [77.67999, 29.00393]);
    //   directions.addWaypoint(1, [79.67628, 29.0308]);
    //   // directions.addWaypoint(2, [79.49764, 28.60245]);
    //   directions.setDestination([76.68346, 28.99329]);
    // });
  }

  render() {
    return (
      // Populates map by referencing map's container property
      <div
        ref={(el) => (this.mapWrapper = el)}
        className="mapWrapper"
        style={{ height: "80vh", marginTop: "100px", marginBottom: "100px" }}
      />
    );
  }
}

export default Map;
