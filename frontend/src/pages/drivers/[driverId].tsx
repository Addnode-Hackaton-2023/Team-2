import { useRouter } from 'next/router';
import { MOCK_DRIVERS } from '@/mock/MOCK_DRIVERS';

export default function DriverPage() {
  const { query } = useRouter();
  const driver = getDriverData(query.driverId);

  if (!driver) {
    return (
      <div className='p-8'>
        No driver with the id <code>{query.driverId}</code>
      </div>
    );
  }

  return (
    <div className='p-8'>
      <h1>{driver.Namn}</h1>
      <small>{driver.DriverId}</small>
    </div>
  );
}

const getDriverData = (driverId?: string | string[]) => {
  const id = Array.isArray(driverId) ? driverId[0] : driverId;
  return MOCK_DRIVERS.find((d) => d.DriverId === id);
};
