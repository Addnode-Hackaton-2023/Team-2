import config from '@arcgis/core/config';
import ArcGISMap from '@arcgis/core/Map';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import MapView from '@arcgis/core/views/MapView';
// import { watch } from '@arcgis/core/core/reactiveUtils';
import Expand from '@arcgis/core/widgets/Expand';

config.apiKey = process.env.NEXT_PUBLIC_ARCGIS_KEY as string;
console.log(config.apiKey);

interface MapApp {
  view?: MapView;
  map?: ArcGISMap;
  layer?: FeatureLayer;
  savedExtent?: any;
}

const app: MapApp = {};

let handler: IHandle;

export async function initialize(container: HTMLDivElement, filter: string) {
  if (app.view) {
    app.view.destroy();
  }

  const map = new ArcGISMap({
    basemap: 'arcgis-dark-gray',
  });

  console.log('test');

  const view = new MapView({
    map,
    container,
    center: [0, 0],
    zoom: 13,
  });

  // handler = watch(
  //   () => view.stationary && view.extent,
  //   () => {
  //     app.savedExtent = view.extent.toJSON();
  //   }
  // );

  view.when(async () => {
    const element = document.createElement('div');
    element.classList.add(
      'esri-component',
      'esri-widget',
      'esri-widget--panel',
      'item-description'
    );
    const expand = new Expand({
      content: element,
      expandIconClass: 'esri-icon-description',
    });
    view.ui.add(expand, 'bottom-right');
  });

  app.map = map;
  app.view = view;

  return cleanup;
}

function cleanup() {
  handler?.remove();
  app.view?.destroy();
}
