import Table, {
  StopTableRow,
  TableBody,
  TableHeader,
} from '@/components/StopsTable';
import { MOCK_ADDRESSES } from '@/mock/MOCK_ADDRESSES';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { StopPointAdress } from '@/types/StopPointAdress';
import { PageHeader } from '@/components/pageHeader';

export const getServerSideProps: GetServerSideProps<{
  donors: StopPointAdress[];
}> = async () => {
  const donors = MOCK_ADDRESSES.filter((a) => !a.StopPoint.IsRecipient);
  return { props: { donors } };
};

export default function StoresPage({
  donors,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className='p-8'>
      <PageHeader
        title='Donatorer'
        subtitle='Denna sida listar alla de donatorer som finns registrerade'
      />
      <Table>
        <thead>
          <tr>
            <TableHeader name={'Donator'} />
            <TableHeader name={'Address'} />
            <TableHeader name={'Åtgärder'} />
          </tr>
        </thead>
        <TableBody>
          {donors.map((s) => (
            <StopTableRow key={s.StopPointAdressId} stop={s} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
