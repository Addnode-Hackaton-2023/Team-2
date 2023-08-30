import { Driver } from '@/types/Driver';
import { Vehicle } from '@/types/Vehicle';

export function mockDrivers(): Array<Driver> {
  return [
    {
      DriverId: '1',
      Namn: 'Allan',
    },
    {
      DriverId: '2',
      Namn: 'Bianca',
    },
    {
      DriverId: '3',
      Namn: 'Carl',
    },
    {
      DriverId: '4',
      Namn: 'Diana',
    },
  ];
}

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
