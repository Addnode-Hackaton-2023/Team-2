import { Driver } from '@/types/Driver';

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
