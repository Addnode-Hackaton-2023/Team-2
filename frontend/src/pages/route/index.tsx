import Layout from '@/layout/layout';
import { ReactElement, useEffect, useRef } from 'react';
import Map from '../../components/map';

import { setDefaultOptions } from 'esri-loader';
setDefaultOptions({ css: true });

export default function RoutePage() {
  return (
    <div>
      <h1>Route Page</h1>
    </div>
  );
}

RoutePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
