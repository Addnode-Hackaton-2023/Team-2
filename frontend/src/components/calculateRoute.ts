
import { loadModules } from 'esri-loader';
let depotLocation: any;
  let depotLayer: any;
  let routeLayer: any;
  let deliveryLayer: any;

export const start = async (map:any, locations:any, mapView: any) => {
    await createGraphicLayer();
    map.addMany([depotLayer,routeLayer,deliveryLayer]);
    depotLocation = {
        type: "point",
        latitude: locations[0].location.y,
        longitude:  locations[0].location.x,
      };
   const sp =   {
    spatialReference: {
        "wkid": mapView.spatialReference.wkid
      }
    };
    showDepot(depotLocation);
    getfleetRoutes(locations,sp);
  }
  


const createGraphicLayer = async() => {
    const modules = ['esri/layers/GraphicsLayer'];
    const [GraphicsLayer] = await loadModules(modules);
   depotLayer = new GraphicsLayer();
  routeLayer = new GraphicsLayer();
  deliveryLayer = new GraphicsLayer();
}

  
  
const  showDepot = async(point:any) => {
    const modules = ['esri/Graphic'];
    const [Graphic] = await loadModules(modules);
    const longitude = point.longitude.toFixed(5);
    const latitude = point.latitude.toFixed(5);
    depotLayer.add(
      new Graphic({
        attributes: {
          Trucks: 2,
          Deliveries: 6
        },
        geometry: point,
        symbol: {
          type: "web-style",
          name: "bus-station",
          styleName: "Esri2DPointSymbolsStyle"
        },
        popupTemplate: {
          title: "Depot",
          content: `Trucks: 2<br>Deliveries: 6<br>Longitude: ${longitude}°<br>Latitude: ${latitude}°`
        }
      })
    );
  }

  async function getfleetRoutes(locations: any, sp: any) {
    const modules = ['esri/rest/support/FeatureSet', "esri/rest/geoprocessor"];
    const [FeatureSet, geoprocessor] = await loadModules(modules);
    const features = locations.map((l:any)=> ({
        attributes: { Name: l.address, ServiceTime: 10 },
        geometry: {
            type: "point",
            latitude: l.location.y,
            longitude: l.location.x
          },
    }))
    const orders = new FeatureSet({
        spatialReference: sp,
      features,
    });

    const depots = new FeatureSet({
        spatialReference: sp,
      features: [features[0]]
    });

    const routes = new FeatureSet({
        spatialReference: sp,
      features: [
        {
          attributes: {
            Name: "Route 1",
            Description: "vehicle 1",
            StartDepotName: "Bay Cities Kitchens and Appliances",
            EndDepotName: "Bay Cities Kitchens and Appliances",
            Capacities: "4",
            MaxOrderCount: 3,
            MaxTotalTime: 60
          }
        },
        {
          attributes: {
            Name: "Route 2",
            Description: "vehicle 2",
            StartDepotName: "Bay Cities Kitchens and Appliances",
            EndDepotName: "Bay Cities Kitchens and Appliances",
            Capacities: "4",
            MaxOrderCount: 3,
            MaxTotalTime: 60
          }
        }
      ]
    });



    const geoprocessorUrl = "https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblemSync/GPServer/EditVehicleRoutingProblem"

    const params = {
      orders,                    // Feature Set
      depots,                    // Feature Set
      routes,                    // Feature Set
      populate_directions: true  // "Generate driving directions for the routes"
    };

    const { results } = await geoprocessor.execute(geoprocessorUrl, params);

    const outStops = results[1].value.features;  // Graphics[]
    const outRoutes = results[2].value.features; // Graphics[]

    showStops(outStops);
    showRoutes(outRoutes);
  }


  function showStops(stops: any) {
    for (let stop of stops) {
      const { SnapY, SnapX, RouteName, Sequence} = stop.attributes;
      stop.set({
        geometry: {
          type: "point",
          latitude: SnapY,
          longitude: SnapX
        },
        symbol: {
          type: "simple-marker",
          color: [255, 255, 255],
          outline: {
            color: [0, 0, 0],
            width: 1
          },
          size: "18px"
        },
        popupTemplate: {
          title: "{Name}",
          content: `${RouteName}<br>Stop: ${parseInt(Sequence) - 1}<br>Delivery Items: 1`
        }
      });
    }

    const labels = stops.map((stop: any) => stop.clone());
    for (let label of labels) {
      label.set({
        symbol: {
          type: "text",
          text: label.attributes.Sequence - 1,
          font: { size: 11, weight: "bold" },
          yoffset: -4,
          color: [50, 50, 50]
        },
        popupTemplate: null
      });
    }

    deliveryLayer.addMany(stops);
    deliveryLayer.addMany(labels);
  }

  function showRoutes(routes:any) {
    for (let route of routes) {
      route.symbol = {
        type: "simple-line",
        color:
          route.attributes.Name === "Route 1"
            ? [50, 150, 255, 0.75]
            : [180, 69, 255, 0.75],
        width: "4px"
      }
    }
    routeLayer.addMany(routes);
  }