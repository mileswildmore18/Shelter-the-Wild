import { useEffect, useState, useRef } from "react";
import Map from "ol/Map.js";
import View from "ol/View.js";
import { Draw, Modify, Snap } from "ol/interaction.js";
import { OSM, Vector as VectorSource } from "ol/source.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import { get } from "ol/proj.js";
import "./style.css";

const MapComponent = () => {
  const [pointCoordinates, setPointCoordinates] = useState([]);
  const [lineCoordinates, setLineCoordinates] = useState([]);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [circleCoordinates, setCircleCoordinates] = useState([]);
  const mapContainer = useRef(null);
  const typeSelect = useRef(null);
  const map = useRef(null);
  const modify = useRef(null);
  const draw = useRef(null);
  const snap = useRef(null);

  useEffect(() => {
    const raster = new TileLayer({
      source: new OSM(),
    });

    const source = new VectorSource();
    const vector = new VectorLayer({
      source: source,
      style: {
        "fill-color": "rgba(255, 255, 255, 0.2)",
        "stroke-color": "#ffcc33",
        "stroke-width": 2,
        "circle-radius": 7,
        "circle-fill-color": "#ffcc33",
      },
    });

    const extent = get("EPSG:3857").getExtent().slice();
    extent[0] += extent[0];
    extent[2] += extent[2];

    map.current = new Map({
      layers: [raster, vector],
      target: mapContainer.current,
      view: new View({
        center: [-11000000, 4600000],
        zoom: 4,
        extent,
      }),
    });

    modify.current = new Modify({ source: source });
    map.current.addInteraction(modify.current);

    // Initial setup of draw and snap interactions
    addInteractions();

    // Cleanup when unmounting
    return () => {
      if (map.current) {
        map.current.dispose();
      }
    };
  }, []);

  const addInteractions = () => {
    draw.current = new Draw({
      source: map.current ? map.current.getLayers().item(1).getSource() : null,
      type: typeSelect.current.value,
    });

    if (map.current && draw.current) {
      map.current.addInteraction(draw.current);

      draw.current.on("drawend", (event) => {
        const feature = event.feature;
        const geometry = feature.getGeometry();

        if (geometry.getType() === "Point") {
          const coordinates = geometry.getCoordinates();
          console.log("Point coordinates:", coordinates);
        }

        if (geometry.getType() === "LineString") {
          const coordinates = geometry.getCoordinates();
          console.log("Line coordinates:", coordinates);
        }

        if (geometry.getType() === "Polygon") {
          const coordinates = geometry.getCoordinates();
          console.log("Polygon coordinates:", coordinates);
        }

        if (geometry.getType() === "Cirlce") {
          const coordinates = geometry.getCoordinates();
          console.log("Circle coordinates:", coordinates);
        }
      });
    }

    snap.current = new Snap({
      source: map.current ? map.current.getLayers().item(1).getSource() : null,
    });

    if (map.current && snap.current) {
      map.current.addInteraction(snap.current);
    }

    draw.current.on("drawend", (event) => {
      const feature = event.feature;
      const geometry = feature.getGeometry();
      const coordinates = geometry.getCoordinates();

      if (geometry.getType() === "Point") {
        setPointCoordinates(coordinates);
      } else if (geometry.getType() === "LineString") {
        setLineCoordinates(coordinates);
      } else if (geometry.getType() === "Polygon") {
        setPolygonCoordinates(coordinates);
      } else if (geometry.getType() === "Circle") {
        setCircleCoordinates(coordinates);
      }
    });
  };

  const handleTypeChange = () => {
    if (map.current && draw.current && snap.current) {
      map.current.removeInteraction(draw.current);
      map.current.removeInteraction(snap.current);
      addInteractions();
    }
  };

  return (
    <div className='flexbox-turn-on'>
      <div className='flexbox-turn-on' id='map-controls'>
        <div
          ref={mapContainer}
          className='map'
          style={{ width: "80%", height: "400px" }}
        ></div>
        <form>
          <label htmlFor='type'>Geometry type &nbsp;</label>
          <select id='type' ref={typeSelect} onChange={handleTypeChange}>
            <option value='Point'>Point</option>
            <option value='LineString'>LineString</option>
            <option value='Polygon'>Polygon</option>
            <option value='Circle'>Circle</option>
          </select>
        </form>
      </div>

      <div className='flexbox-turn-on' id='feature-array'>
        {pointCoordinates.length > 0 ? (
          <div>
            <h2>Point Coordinates:</h2>
            <pre>{JSON.stringify(pointCoordinates, null, 2)}</pre>
          </div>
        ) : null}
        {lineCoordinates.length > 0 ? (
          <div>
            <h2>LineString Coordinates:</h2>
            <pre>{JSON.stringify(lineCoordinates, null, 2)}</pre>
          </div>
        ) : null}
        {polygonCoordinates.length > 0 ? (
          <div>
            <h2>Polygon Coordinates:</h2>
            <pre>{JSON.stringify(polygonCoordinates, null, 2)}</pre>
          </div>
        ) : null}
        {circleCoordinates.length > 0 ? (
          <div>
            <h2>Circle Coordinates:</h2>
            <pre>{JSON.stringify(circleCoordinates, null, 2)}</pre>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MapComponent;
