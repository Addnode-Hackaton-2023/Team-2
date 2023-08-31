import { useRouter } from 'next/router';
import { MOCK_ADDRESSES } from '@/mock/MOCK_ADDRESSES';

export default function DonorPage() {
  const { query } = useRouter();
  const stopPoint = getDonorData(query.donorId);

  if (!stopPoint) {
    return (
      <div className='p-8'>
        No donor with the id <code>{query.stopPointAdressId}</code>
      </div>
    );
  }

  return (
    <div className='p-8 flex flex-col items-start'>
      <div className='rounded bg-blue-400 text-3xl px-2 py-1 mb-2'>Donator</div>
      <h1>{stopPoint.Adress.Adress}</h1>
      <h2>{stopPoint.StopPoint.Brand.Name}</h2>
      <small>{stopPoint.StopPointAdressId}</small>
    </div>
  );
}

const getDonorData = (donorId?: string | string[]) => {
  const id = Array.isArray(donorId) ? donorId[0] : donorId;
  return MOCK_ADDRESSES.find((adr) => adr.StopPointAdressId === id);
};
