import Table, {
  DriverTableRow,
  TableBody,
  TableHeader,
} from '@/components/table';
import { MOCK_DRIVERS } from '@/mock/MOCK_DRIVERS';
import { Driver } from '@/types/Driver';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';

export const getServerSideProps: GetServerSideProps<{
  drivers: Driver[];
}> = async () => {
  return { props: { drivers: MOCK_DRIVERS } };
};

type DriverForm = {
  name: string;
};

export default function DriverPage({
  drivers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DriverForm>();
  const onSubmit = handleSubmit((data: any) => console.log(data));

  return (
    <div className='p-8'>
      <h1 className='text-3xl py-8'>Förare</h1>
      <Table>
        <thead>
          <tr>
            <TableHeader name={'Förare'} />
            <TableHeader name={'Åtgärder'} />
          </tr>
        </thead>
        <TableBody>
          {drivers.map((driver) => (
            <DriverTableRow key={driver.DriverId} driver={driver} />
          ))}
        </TableBody>
      </Table>
      <div>
        <h1 className='text-3xl py-8'>Lägg till ny förare</h1>
        <form onSubmit={onSubmit}>
          <div className='flex'>
            <div className='w-fit'>
              <label>Namn</label>
              <input
                type='text'
                {...register('name')}
                placeholder='Exempel Exempelsson'
                className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm px-4 py-2'
              />
            </div>

            <input
              className=' ml-auto rounded bg-indigo-600 text-xs font-medium text-white hover:bg-indigo-700 h-fit py-4 px-4 mt-auto'
              type='submit'
              value='Skapa ny förare'
            />
          </div>
        </form>
      </div>
    </div>
  );
}
