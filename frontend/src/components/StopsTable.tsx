import Link from 'next/link';
import { StopPointAdress } from '@/types/StopPointAdress';

export function TableHeader({ name }: { name: string }) {
  return (
    <th className='text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
      {name}
    </th>
  );
}

export function TableBody({ children }: { children: JSX.Element[] }) {
  return <tbody className='divide-y divide-gray-200'>{children}</tbody>;
}

export function StopTableRow({ stop }: { stop: StopPointAdress }) {
  return (
    <tr>
      <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
        {stop.StopPoint.Brand.Name}
      </td>
      <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
        {stop.Adress.Adress}
      </td>
      <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900 flex gap-2 w-fit'>
        <Link
          href={`/stops/${stop.StopPointAdressId}`}
          className='inline-block ml-auto rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700'
        >
          Länk till Stopp
        </Link>
        <button
          type={'button'}
          className='inline-ml-auto rounded bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-700'
        >
          Ta bort
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
