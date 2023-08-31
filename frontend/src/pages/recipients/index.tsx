import Table, {
  StopTableRow,
  TableBody,
  TableHeader,
} from '@/components/StopsTable';
import { MOCK_ADDRESSES } from '@/mock/MOCK_ADDRESSES';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { StopPointAdress } from '@/types/StopPointAdress';
import { PageHeader } from '@/components/pageHeader';
import { StupidMap } from '@/components/stupidmap';

export const getServerSideProps: GetServerSideProps<{
  recipients: StopPointAdress[];
}> = async () => {
  const recipients = MOCK_ADDRESSES.filter((a) => a.StopPoint.IsRecipient);
  return { props: { recipients } };
};

export default function RecipientsPage({
  recipients,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className='p-8'>
      <PageHeader
        title='Mottagare'
        subtitle='Denna sida listar alla de mottagare som finns registrerade'
      />

      <div className='flex flex-col lg:flex-row gap-8'>
        <Table>
          <thead>
            <tr>
              <TableHeader name={'Mottagare'} />
              <TableHeader name={'Address'} />
              <TableHeader name={'Åtgärder'} />
            </tr>
          </thead>
          <TableBody>
            {recipients.map((r) => (
              <StopTableRow key={r.StopPointAdressId} stop={r} />
            ))}
          </TableBody>
        </Table>
        <StupidMap locations={recipients} center={[17.846941, 59.4279679]} />
      </div>
    </div>
  );
}
