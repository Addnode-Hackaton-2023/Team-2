import styles from '../styles/WebMap.module.css';
import { useEffect, useRef } from 'react';

async function loadMap(container: HTMLDivElement, filter: string) {
  const { initialize } = await import('../../data/mapping');
  return initialize(container, filter);
}

const WebMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let asyncCleanup: Promise<() => void>;
    if (mapRef.current) {
      console.log('Loading map');
      asyncCleanup = loadMap(mapRef.current, '');
    }
    return () => {
      asyncCleanup && asyncCleanup.then((cleanup) => cleanup());
    };
  }, [mapRef]);

  return (
    <div className={styles.container}>
      <div className={styles.viewDiv} ref={mapRef}></div>
    </div>
  );
};

export default WebMap;
