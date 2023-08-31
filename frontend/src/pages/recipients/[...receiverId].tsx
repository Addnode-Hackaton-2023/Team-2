import { useRouter } from 'next/router';
import { MOCK_ADDRESSES } from '@/mock/MOCK_ADDRESSES';

export default function ReceiverPage() {
  const { query } = useRouter();
  const stopPoint = getReceiverData(query.receiverId);

  if (!stopPoint) {
    return (
      <div className='p-8'>
        No receiver with the id <code>{query.receiverId}</code>
      </div>
    );
  }

  return (
    <div className='p-8 flex flex-col items-start'>
      <div className='rounded bg-green-400 text-3xl px-2 py-1 mb-2'>
        Mottagare
      </div>
      <h1>{stopPoint.Adress.Adress}</h1>
      <h2>{stopPoint.StopPoint.Brand.Name}</h2>
      <small>{stopPoint.StopPointAdressId}</small>
    </div>
  );
}

const getReceiverData = (receiverId?: string | string[]) => {
  const id = Array.isArray(receiverId) ? receiverId[0] : receiverId;
  return MOCK_ADDRESSES.find((adr) => adr.StopPointAdressId === id);
};
