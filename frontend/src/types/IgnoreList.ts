import { StopPoint } from '@/types/StopPoint';

export interface IgnoreList {
  IgnoreId: string;
  StopPoint: StopPoint;
  StartDate: Date;
  EndDate: Date;
}
