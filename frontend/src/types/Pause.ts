import { Route } from '@/types/Route';

export interface Pause {
  PauseId: string;
  Route: Route;
  StartTime: Date;
  Duration: number;
}
