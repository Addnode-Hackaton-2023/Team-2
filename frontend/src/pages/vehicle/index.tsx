import Table, {
  DriverTableRow,
  TableBody,
  TableHeader,
  VehicleTableRow,
} from '@/components/table';
import { mockVehicles } from '@/mock/stores';
import { Vehicle } from '@/types/Vehicle';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';

export const getServerSideProps: GetServerSideProps<{
  vehicles: Vehicle[];
}> = async () => {
  return { props: { vehicles: mockVehicles() } };
};

type VehicleForm = {
  name: string;
};

export default function VehiclePage({
  vehicles,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleForm>();
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <div className='p-8'>
      <h1 className='text-3xl py-8'>Bilar</h1>
      <Table>
        <thead>
          <tr>
            <TableHeader name={'Maxlast'} />
          </tr>
        </thead>
        <TableBody>
          {vehicles.map((vehicle) => (
            <VehicleTableRow key={vehicle.VehicleId} vehicle={vehicle} />
          ))}
        </TableBody>
      </Table>
      <div>
        <h1 className='text-3xl py-8'>Lägg till nytt fordon</h1>
        <form onSubmit={onSubmit}>
          <div className='flex'>
            <div className='w-fit'>
              <label>Maxlast</label>
              <input
                type='number'
                {...register('name')}
                placeholder='100'
                className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm px-4 py-2'
              />
            </div>

            <input
              className=' ml-auto rounded bg-indigo-600 text-xs font-medium text-white hover:bg-indigo-700 h-fit py-4 px-4 mt-auto'
              type='submit'
              value='Skapa nytt fordon'
            />
          </div>
        </form>
      </div>
    </div>
  );
}
