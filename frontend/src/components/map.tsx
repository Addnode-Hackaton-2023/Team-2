import styles from '../styles/WebMap.module.css';
import { useEffect, useRef, useState } from 'react';
import { loadModules } from 'esri-loader';

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let view: any;

    const initializeMap = async (mapRef: HTMLDivElement) => {
      const modules = ['esri/config', 'esri/Map', 'esri/views/MapView'];
      const [esriConfig, Map, MapView] = await loadModules(modules);
      esriConfig.apiKey = process.env.NEXT_PUBLIC_ARCGIS_KEY as string;

      const map = new Map({
        basemap: 'arcgis-topographic',
      });

      view = new MapView({
        map,
        container: mapRef,
        center: [59, 18],
        zoom: 13,
      });
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
  }, [mapRef, loaded]);

  return (
    <div className={styles.container}>
      <div className={styles.viewDiv} ref={mapRef}></div>
    </div>
  );
}
