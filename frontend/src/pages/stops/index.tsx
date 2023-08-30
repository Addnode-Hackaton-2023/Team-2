import Table, {
  StopTableRow,
  TableBody,
  TableHeader,
} from '@/components/StopsTable';
import { MOCK_ADDRESSES } from '@/mock/MOCK_ADDRESSES';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import { StopPointAdress } from '@/types/StopPointAdress';
import { Brand } from '@/types/Brand';

export const getServerSideProps: GetServerSideProps<{
  stops: StopPointAdress[];
}> = async () => {
  return { props: { stops: MOCK_ADDRESSES } };
};

type StoreForm = {
  address: string;
  brand: Brand['Name'];
  startDate: Date;
  endDate: Date;
};

export default function StoresPage({
  stops,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { register, handleSubmit } = useForm<StoreForm>();
  const onSubmit = handleSubmit((data: any) => console.log(data));

  return (
    <div className='p-8'>
      <Table>
        <thead>
          <tr>
            <TableHeader name={'Brand'} />
            <TableHeader name={'Address'} />
            <TableHeader name={'Åtgärder'} />
          </tr>
        </thead>
        <TableBody>
          {stops.map((s) => (
            <StopTableRow key={s.StopPointAdressId} stop={s} />
          ))}
        </TableBody>
      </Table>

      <div>
        <h1 className='text-3xl py-8'>Lägg till ett nytt stopp</h1>
        <form onSubmit={onSubmit}>
          <div className='flex flex-col w-1/2 gap-4'>
            <div>
              <label>Address</label>
              <input
                type='text'
                {...register('address')}
                placeholder='Vasagatan 45, Göteborg'
                className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm px-4 py-2'
              />
            </div>
            <div>
              <label>Brand</label>
              <select
                {...register('brand')}
                className='rounded py-2 mt-1.5 w-full border-gray-300 text-gray-700 sm:text-sm'
              >
                <option value='LIDL'>Lidl</option>
                <option value='SJ'>SJ</option>
                <option value='KYRKAN'>Kyrkan</option>
              </select>
            </div>

            <div>
              <label>Active dates</label>
              <div className='flex gap-4'>
                <div className='flex-grow'>
                  <label className='text-sm'>Start</label>
                  <input
                    type='date'
                    {...register('startDate')}
                    className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm px-4 py-2'
                  />
                </div>
                <div className='flex-grow'>
                  <label className='text-sm'>End</label>
                  <input
                    type='date'
                    {...register('endDate')}
                    className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm px-4 py-2'
                  />
                </div>
              </div>
            </div>
            <input
              className='ml-auto rounded bg-indigo-600 text-xs font-medium text-white hover:bg-indigo-700 h-fit py-4 px-4 mt-auto'
              type='submit'
              value='Lägg till stopp'
            />
          </div>
        </form>
      </div>
    </div>
  );
}
