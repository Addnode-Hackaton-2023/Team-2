import { loadModules } from 'esri-loader';
import { useEffect, useRef, useState } from 'react';
import { addressToPoint, getLocationsAsycn } from './loctatorToAddress';
// import { EventEmitter } from 'fbemitter';

// const emitter = new EventEmitter();

interface MapProps {
  enableSearch?: boolean;
  searchCallback?: (search: SearchResult) => void;
  enableLocations?: boolean;
  showPoints?: boolean;
  enableGraphics?: boolean;
  graphics?: any;
}

export interface SearchResult {
  result: {
    name: string;
  };
}

export default function Map({
  enableSearch,
  searchCallback,
  enableLocations,
  showPoints,
  enableGraphics,
  graphics,
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const deliveryLayerRef = useRef<any>(null);
  const routesLayerRef = useRef<any>(null);
  const depotLayerRef = useRef<any>(null);
  const mapLayerRef = useRef<any>(null);

  console.log('map', enableGraphics, graphics);

  useEffect(() => {
    let view: any;
    let map: any;

    const initializeMap = async (mapRef: HTMLDivElement) => {
      const modules = [
        'esri/config',
        'esri/Map',
        'esri/views/MapView',
        'esri/widgets/Search',
        'esri/Graphic',
        'esri/layers/GraphicsLayer',
      ];
      const [esriConfig, Map, MapView, Search, Graphic, GraphicsLayer] =
        await loadModules(modules);
      esriConfig.apiKey = process.env.NEXT_PUBLIC_ARCGIS_KEY as string;

      map = new Map({
        basemap: 'arcgis-topographic',
      });

      view = new MapView({
        map,
        container: mapRef,
        center: [18.0649, 59.33258],
        zoom: 13,
      });

      if (enableLocations) {
        const locations = getLocationsAsycn();
        view.goTo({
          center: [locations[0].lat, locations[0].lon],
        });

        if (showPoints) {
          const layer = new GraphicsLayer();

          const simpleMarkerSymbol = {
            type: 'simple-marker',
            color: [226, 119, 40], // Orange
            outline: {
              color: [255, 255, 255], // White
              width: 1,
            },
          };

          const points = locations.map(addressToPoint);
          points.map((point) => {
            const g = new Graphic({
              geometry: point,
              symbol: simpleMarkerSymbol,
            });

            layer.add(g);
          });
          map.add(layer);
        }
      }

      if (enableSearch) {
        const searchWidget = new Search({
          view: view,
        });

        view.ui.add(searchWidget, {
          position: 'bottom-left',
          index: 2,
        });

        searchWidget.on(
          'select-result',
          (result: SearchResult) => searchCallback && searchCallback(result)
        );
      }

      // depotLayer = new GraphicsLayer();
      routesLayerRef.current = new GraphicsLayer();
      deliveryLayerRef.current = new GraphicsLayer();
      depotLayerRef.current = new GraphicsLayer();
      console.log('initializing layers');

      mapLayerRef.current = map;
    };

    if (mapRef.current && !loaded) {
      initializeMap(mapRef.current);
      setLoaded(true);
    }

    if (enableGraphics) {
      console.log('Graphics enabled', graphics);
      const { stops, labels } = showStops(graphics.stops);
      const routes = showRoutes(graphics.routes);
      // const { depots, labels: depotLabels } = showDepots(graphics.depots);

      routesLayerRef.current.addMany(routes);
      mapLayerRef.current.add(routesLayerRef.current);

      deliveryLayerRef.current.addMany(stops);
      deliveryLayerRef.current.addMany(labels);

      depotLayerRef.current.addMany(graphics.depots.features);
      // depotLayerRef.current.addMany(depotLabels);

      mapLayerRef.current.add(deliveryLayerRef.current);
      mapLayerRef.current.add(depotLayerRef.current);
    }

    return () => {
      if (!loaded && view) {
        view.destroy();
      }
    };
    // Some properties are intentionally left out, because we don't care if they change.
  }, [mapRef, loaded, enableSearch, graphics, enableGraphics]);

  return (
    <div className={'w-full h-screen p-0 flex fixed'}>
      <div className={'h-full w-full'} ref={mapRef}></div>
    </div>
  );
}

function showStops(stops: any) {
  for (let stop of stops) {
    const { SnapY, SnapX, RouteName, Sequence } = stop.attributes;
    stop.set({
      geometry: {
        type: 'point',
        latitude: SnapY,
        longitude: SnapX,
      },
      symbol: {
        type: 'simple-marker',
        color: [255, 255, 255],
        outline: {
          color: [0, 0, 0],
          width: 1,
        },
        size: '18px',
      },
      popupTemplate: {
        title: '{Name}',
        content: `${RouteName}<br>Stop: ${
          parseInt(Sequence) - 1
        }<br>Delivery Items: 1`,
      },
    });
  }

  const labels = stops.map((stop: any) => stop.clone());
  for (let label of labels) {
    label.set({
      symbol: {
        type: 'text',
        text: label.attributes.Sequence - 1,
        font: { size: 11, weight: 'bold' },
        yoffset: -4,
        color: [50, 50, 50],
      },
      popupTemplate: null,
    });
  }

  return { stops, labels };
}

function showRoutes(routes: any) {
  for (let route of routes) {
    route.symbol = {
      type: 'simple-line',
      color:
        route.attributes.Name === 'Rutt för ABC123'
          ? [50, 150, 255, 0.75]
          : [180, 69, 255, 0.75],
      width: '4px',
    };
  }

  return routes;
}

function showDepots(depots: any) {
  for (let depot of depots.features) {
    const { SnapY, SnapX, RouteName, Sequence } = depot.attributes;
    depot.set({
      geometry: {
        type: 'point',
        latitude: SnapY,
        longitude: SnapX,
      },
      symbol: {
        type: 'simple-marker',
        color: [255, 255, 255],
        outline: {
          color: [0, 0, 0],
          width: 1,
        },
        size: '18px',
      },
      popupTemplate: {
        title: '{Name}',
        content: `${RouteName}<br>Stop: ${
          parseInt(Sequence) - 1
        }<br>Delivery Items: 1`,
      },
    });
  }

  const labels = depots.map((depot: any) => depot.clone());
  for (let label of labels) {
    label.set({
      symbol: {
        type: 'text',
        text: label.attributes.Sequence - 1,
        font: { size: 11, weight: 'bold' },
        yoffset: -4,
        color: [50, 50, 50],
      },
      popupTemplate: null,
    });
  }

  return { depots, labels };
}
