import { loadModules } from 'esri-loader';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/WebMap.module.css';
import { start } from './calculateRoute';
import { getLocationsAsycn } from './loctatorToAddress';

interface MapProps {
  enableSearch: boolean;
  searchCallback?: (search: SearchResult) => void;
}

export interface SearchResult {
  result: {
    name: string;
  };
}

export default function Map({ enableSearch, searchCallback }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let view: any;

    const initializeMap = async (mapRef: HTMLDivElement) => {
      const modules = [
        'esri/config',
        'esri/Map',
        'esri/views/MapView',
        'esri/widgets/Search',
      ];
      const [esriConfig, Map, MapView, Search] = await loadModules(modules);
      esriConfig.apiKey = process.env.NEXT_PUBLIC_ARCGIS_KEY as string;

      const map = new Map({
        basemap: 'arcgis-topographic',
      });

      view = new MapView({
        map,
        container: mapRef,
        center: [18.0649, 59.33258],
        zoom: 13,
      });
      const locations = await getLocationsAsycn(view);
      view.goTo({
        center: [locations[0].location.x, locations[0].location.y]
      })
      view.when(()=> {
        locations.length && start(map, locations, view)
      });
      console.log(locations);
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
  }, [mapRef, loaded, enableSearch]);

  return (
    <div className={styles.container}>
      <div className={styles.viewDiv} ref={mapRef}></div>
    </div>
  );
}
