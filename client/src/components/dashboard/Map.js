// import React from "react";
// import mapboxgl from "mapbox-gl";
// import "../../App.css";
// import "mapbox-gl/dist/mapbox-gl.css";
// import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
// import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

// mapboxgl.accessToken =
//   "pk.eyJ1Ijoia2VzaGcwOTEyIiwiYSI6ImNsZGRlMjNmYzAycWIzb3MwdGxhaTd2aWUifQ.Ah1yPzjAal0Ez-QZC36M2A";

// class Map extends React.Component {
//   componentDidMount(props) {
//     // Creates new map instance
//     const map = new mapboxgl.Map({
//       container: this.mapWrapper,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [76.68346, 28.99329],
//       zoom: 12,
//     });

//     // Creates new directions control instance
//     const directions = new MapboxDirections({
//       accessToken: mapboxgl.accessToken,
//       unit: "metric",
//       profile: "mapbox/driving",
//       interactive: false,
//     });

//     //add waypoints
//     map.on("load", function () {
//       const placesCoords = [
//         [77.07287, 28.47556],
//         [76.68346, 30.99329],
//         [79.68346, 28.99329],
//       ];

//       for (var i = 0; i < 3; i++) {
//         directions.addWaypoint(i, placesCoords[i]);
//         var el = document.createElement("div");
//         el.className = "marker";
//         el.innerHTML = "<span><b>" + (i + 1) + "</b></span>";
//         new mapboxgl.Marker(el)
//           .setLngLat(placesCoords[i])
//           .setPopup(
//             new mapboxgl.Popup({ offset: 25 }) // add popups
//               .setHTML(
//                 `<h3>Times Square</h3>
//               <div style="height: 200px; overflow-y: scroll; height: 300px;">
//               <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/0480New_York_City_Madame_Tussauds_crop.jpg" alt="Image" style="width: 100%; height: 100px;">
//               <p>    Times Square is a major commercial intersection, tourist destination, entertainment hub, and neighborhood in Midtown Manhattan, New York City. It is formed by the junction of Broadway, Seventh Avenue, and 42nd Street. Together with adjacent Duffy Square, Times Square is a bowtie-shaped space five blocks long between 42nd and 47th Streets. </p>
//               <a target="_blank" href="https://en.wikipedia.org/wiki/Times_Square">Read More on Wikipedia </a>
//             </div>

//               `
//               )
//               .setMaxWidth("400px")
//           )
//           .addTo(map);
//       }
//     });
//   }

//   getAlert() {
//     alert("getAlert from Child");
//   }

//   render() {
//     return (
//       // Populates map by referencing map's container property
//       <div
//         ref={(el) => (this.mapWrapper = el)}
//         className="mapWrapper"
//         style={{ height: "150vh", marginTop: "100px", marginBottom: "100px" }}
//       />
//     );
//   }
// }

// export default Map;

import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "../../App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

const styles = {
  width: "100vw",
  height: "calc(100vh - 80px)",
  position: "absolute",
};

const Map = forwardRef((props, ref) => {
  const [map, setMap] = useState(null);

  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia2VzaGcwOTEyIiwiYSI6ImNsZGRlMjNmYzAycWIzb3MwdGxhaTd2aWUifQ.Ah1yPzjAal0Ez-QZC36M2A";

    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [0, 0],
        zoom: 5,
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });

      // Creates new directions control instance
      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric",
        profile: "mapbox/driving",
        interactive: false,
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  useImperativeHandle(ref, () => ({
    getAlert() {
      // Creates new directions control instance
      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric",
        profile: "mapbox/driving",
        interactive: false,
      });
      const placesCoords = [];
      props.entityDetails.forEach(function (entry) {
        var coordinates = [];
        coordinates.push(parseFloat(entry.longitude));
        coordinates.push(parseFloat(entry.latitude));
        placesCoords.push(coordinates);
      });
      console.log(placesCoords);

      for (var i = 0; i < placesCoords.length; i++) {
        directions.addWaypoint(i, placesCoords[i]);
        var el = document.createElement("div");
        el.className = "marker";
        el.innerHTML = "<span><b>" + (i + 1) + "</b></span>";
        new mapboxgl.Marker(el)
          .setLngLat(placesCoords[i])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                `<h3>${props.entityDetails[i].title}</h3>
                    <div style="height: 200px; overflow-y: scroll; height: 300px;">
                    <img src="${props.entityDetails[i].image}" alt="Image" style="width: 100%; height: 100px;">
                    <p> ${props.entityDetails[i].description}</p>
                    <a target="_blank" href="${props.entityDetails[i].wiki_url}">Read More on Wikipedia </a>
                  </div>
                    `
              )
              .setMaxWidth("400px")
          )
          .addTo(map);
      }
    },
  }));

  return (
    <div
      ref={(el) => (mapContainer.current = el)}
      style={{ height: "150vh", marginTop: "100px", marginBottom: "100px" }}
    />
  );
});

export default Map;
