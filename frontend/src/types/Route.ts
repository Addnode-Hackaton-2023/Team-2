import { Driver } from '@/types/Driver';
import { Vehicle } from '@/types/Vehicle';
import { StopPoint } from '@/types/StopPoint';

export interface Route {
  RouteId: string;
  Driver: Driver;
  Vehicle: Vehicle;
  Recipient: StopPoint;
  Date: Date;
}
