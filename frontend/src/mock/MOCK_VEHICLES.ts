import { Vehicle } from '@/types/Vehicle';

export function mockVehicles(): Array<Vehicle> {
  return [
    {
      MaxCargo: '200',
      VehicleId: '1',
    },
    {
      MaxCargo: '250',
      VehicleId: '2',
    },
  ];
}
