import Layout from '@/layout/layout';
import { ReactElement, useEffect, useRef } from 'react';

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
