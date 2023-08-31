import { addressByName } from '@/components/loctatorToAddress';
import { StopPointAdress } from '@/types/StopPointAdress';
import { Vehicle } from '@/types/Vehicle';
import { loadModules } from 'esri-loader';
import { temporaryToken } from './auth';
import { emitter } from '@/components/map';

export type RoutingProps = {
  stops: StopPointAdress[];
  recipients: StopPointAdress[];
  vehicles: Vehicle[];
};

export async function doTheRouting({
  stops,
  recipients,
  vehicles,
}: RoutingProps): any {
  console.log('stops', stops.length);
  console.log('recipients', recipients.length, recipients);
  console.log('vehicles', vehicles.length);

  const modules = [
    'esri/rest/support/FeatureSet',
    'esri/rest/geoprocessor',
    'esri/layers/GraphicsLayer',
    'esri/Graphic',
    'esri/config',
  ];
  const [FeatureSet, geoprocessor, GraphicsLayer, Graphic, esriConfig] =
    await loadModules(modules);

  esriConfig.apiKey = temporaryToken;

  const features = stops
    .map((s) => {
      const address = addressByName(s.Adress);

      if (!address) {
        console.log('Failed to find address by name');
        return null;
      }

      return {
        attributes: { Name: address.formatted, ServiceTime: 10 },
        geometry: {
          type: 'point',
          longitude: address.lon,
          latitude: address.lat,
        },
      };
    })
    .filter(Boolean);
  const orders = new FeatureSet({
    features,
  });

  // Recipient is a single stop right now, we need to use the same place as start and stop.
  // recipients.push(recipients[0]);
  const depots = new FeatureSet({
    features: [
      {
        attributes: {
          Name: 'Hudiksvallsgatan 4, 113 30 Stockholm',
        },
        geometry: {
          type: 'point',
          x: 18.038037682397015,
          y: 59.34592661089257,
        },
        symbol: {
          type: 'simple-marker',
          color: [0, 0, 0],
          outline: {
            color: [255, 255, 255],
            width: 2,
          },
          size: '18px',
        },
      },
      {
        attributes: {
          Name: 'Värmevägen 1A, 177 57 Järfälla',
        },
        geometry: {
          type: 'point',
          x: 17.847384184307526,
          y: 59.42934369442978,
        },
        symbol: {
          type: 'simple-marker',
          color: [0, 0, 0],
          outline: {
            color: [255, 255, 255],
            width: 2,
          },
          size: '18px',
        },
      },
    ],
  });

  const routes = new FeatureSet({
    features: vehicles.map((v) => {
      return {
        attributes: {
          Name: `Rutt för ${v.RegistrationNumber}`,
          Description: 'Vehicle',
          StartDepotName: 'Hudiksvallsgatan 4, 113 30 Stockholm',
          EndDepotName: 'Värmevägen 1A, 177 57 Järfälla',
          Capacity: 12,
        },
      };
    }),
  });

  const geoprocessorUrl =
    'https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblemSync/GPServer/EditVehicleRoutingProblem';

  const params = {
    orders, // Feature Set
    depots, // Feature Set
    routes, // Feature Set
    populate_directions: true, // "Generate driving directions for the routes"
  };

  const { results } = await geoprocessor.execute(geoprocessorUrl, params);
  const outStops = results[1].value.features; // Graphics[]
  const outRoutes = results[2].value.features; // Graphics[]

  console.log(depots);
  return { stops: outStops, routes: outRoutes, depots: depots };
}
