import { addressByName } from '@/components/loctatorToAddress';
import { StopPointAdress } from '@/types/StopPointAdress';
import { Vehicle } from '@/types/Vehicle';
import { loadModules } from 'esri-loader';

export type RoutingProps = {
  stops: StopPointAdress[];
  recipients: StopPointAdress[];
  vehicles: Vehicle[];
};

export async function doTheRouting({
  stops,
  recipients,
  vehicles,
}: RoutingProps) {
  const modules = [
    'esri/rest/support/FeatureSet',
    'esri/rest/geoprocessor',
    'esri/layers/GraphicsLayer',
    'esri/Graphic',
  ];
  const [FeatureSet, geoprocessor, GraphicsLayer, Graphic] =
    await loadModules(modules);

  const features = stops
    .map((s) => {
      console.log(s.Adress);
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
  recipients.push(recipients[0]);
  const depots = new FeatureSet({
    features: recipients.map((r) => {
      const address = addressByName(r.Adress);

      if (!address) {
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
    }),
  });

  const routes = new FeatureSet({
    features: vehicles.map((v) => {
      return {
        attributes: {
          Name: `Rutt för ${v.RegistrationNumber}`,
          Description: 'Vehicle',
          StartDepotName: 'Värmevägen, 177 37 Järfälla kommun, Sverige',
          EndDepotName: 'Värmevägen, 177 37 Järfälla kommun, Sverige',
          Capacity: 25,
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
  console.log(results);
}
