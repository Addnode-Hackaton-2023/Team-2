import { StopPoint } from '@/types/StopPoint';
import { Adress } from '@/types/Adress';

export interface StopPointAdress {
  StopPointAdressId: string;
  StopPoint: StopPoint;
  Adress: Adress;
  StartDate: string;
  EndDate: string;
}
