import { loadModules } from 'esri-loader';
import { useEffect, useRef, useState } from 'react';
import { StopPointAdress } from '@/types/StopPointAdress';

interface MapProps {
  locations: StopPointAdress[];
  center?: [number, number];
}

export const StupidMap = ({ center, locations }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

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
        center: center ?? [18.0649, 59.33258],
        zoom: 11,
      });

      if (locations) {
        const layer = new GraphicsLayer();

        const simpleMarkerSymbol = {
          type: 'simple-marker',
          color: [226, 119, 40], // Orange
          outline: {
            color: [255, 255, 255], // White
            width: 1,
          },
        };

        locations.map((loc) => {
          const g = new Graphic({
            geometry: {
              type: 'point',
              longitude: loc.coordinates?.long,
              latitude: loc.coordinates?.lat,
            },
            symbol: simpleMarkerSymbol,
          });

          layer.add(g);
        });
        map.add(layer);
      }
    };

    if (mapRef.current && !loaded) {
      initializeMap(mapRef.current);
      setLoaded(true);
    }

    return () => {
      if (!loaded && view) {
        view.destroy();
      }
    };
    // Some properties are intentionally left out, because we don't care if they change.
  }, [mapRef, loaded, locations]);

  return (
    <div className={'w-full h-screen p-0 flex'}>
      <div className={'h-full w-full'} ref={mapRef}></div>
    </div>
  );
};
