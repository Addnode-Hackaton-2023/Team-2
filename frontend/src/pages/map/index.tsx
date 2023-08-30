'use client';

import Layout from '@/layout/layout';
import { ReactElement } from 'react';
import Map from '@/components/map';

export default function MapPage() {
  return (
    <div>
      <Map />
    </div>
  );
}

MapPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
