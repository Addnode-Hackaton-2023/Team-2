import { Route } from '@/types/Route';
import { StopPoint } from '@/types/StopPoint';

export interface Destination {
  DestinationId: string;
  Route: Route;
  StopPoint: StopPoint;
  Sekvens: string;
  ETA: Date;
  ArrivalTime: Date;
  LeaveTime: Date;
  Kg: number;
}
