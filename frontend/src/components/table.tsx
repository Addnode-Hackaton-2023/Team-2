import { Driver } from '@/types/Driver';
import { Vehicle } from '@/types/Vehicle';
import Link from 'next/link';

export function TableHeader({ name }: { name: string }) {
  return (
    <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left'>
      {name}
    </th>
  );
}

export function TableBody({ children }: { children: JSX.Element[] }) {
  return <tbody className='divide-y divide-gray-200'>{children}</tbody>;
}

export function DriverTableRow({ driver }: { driver: Driver }) {
  return (
    <tr>
      <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
        {driver.Namn}
      </td>
      <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900 flex gap-2'>
        <Link
          href={`/driver/${driver.DriverId}`}
          className='inline-block ml-auto rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700'
        >
          Länk till Förare
        </Link>
        <button
          type={'button'}
          disabled
          className='inline-ml-auto rounded bg-red-500 px-4 py-2 text-xs font-medium text-white pointer'
        >
          Ta bort Förare
        </button>
      </td>
    </tr>
  );
}

export function VehicleTableRow({ vehicle }: { vehicle: Vehicle }) {
  const regNummer = vehicle.RegistrationNumber;
  return (
    <tr>
      <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
        {vehicle.MaxCargo}
      </td>
      <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
        <span className='rounded border-2 border-black px-2 py-1'>
          {`${regNummer.substring(0, 3)} ${regNummer.substring(3, 6)}`}
        </span>
      </td>
      <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900 flex gap-2'>
        <Link
          href={`/vehicles/${vehicle.VehicleId}`}
          className='inline-block ml-auto rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700'
        >
          Länk till Fordon
        </Link>
        <button
          type={'button'}
          className='inline-ml-auto rounded bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-700'
        >
          Ta bort Fordon
        </button>
      </td>
    </tr>
  );
}

export default function Table({ children }: { children: JSX.Element[] }) {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
        {children}
      </table>
    </div>
  );
}
