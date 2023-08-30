import { useRouter } from 'next/router';
import { MOCK_ADDRESSES } from '@/mock/MOCK_ADDRESSES';

export default function StopPage() {
  const { query } = useRouter();
  const stopPoint = getStopData(query.stopPointAdressId);

  if (!stopPoint) {
    return (
      <div className='p-8'>
        No stop with the name <code>{query.stopPointAdressId}</code>
      </div>
    );
  }

  return (
    <div className='p-8'>
      <h1>{stopPoint.Adress.Adress}</h1>
      <h2>{stopPoint.StopPoint.Brand.Name}</h2>
      <small>{stopPoint.StopPointAdressId}</small>
    </div>
  );
}

const getStopData = (stopPointAdressId?: string | string[]) => {
  const id = Array.isArray(stopPointAdressId)
    ? stopPointAdressId[0]
    : stopPointAdressId;
  return MOCK_ADDRESSES.find((adr) => adr.StopPointAdressId === id);
};
