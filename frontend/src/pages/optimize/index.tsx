import { SelectableStopTableRow } from '@/components/StopsTable';
import Map from '@/components/map';
import { PageHeader } from '@/components/pageHeader';
import { MOCK_ADDRESSES } from '@/mock/MOCK_ADDRESSES';
import { MOCK_VEHICLES } from '@/mock/MOCK_VEHICLES';
import { Vehicle } from '@/types/Vehicle';
import { useMemo, useState } from 'react';
import Table, { TableHeader, TableBody } from '@/components/table';
import stops from '../stops';
import { StopPointAdress } from '@/types/StopPointAdress';
import { doTheRouting } from '@/util/routing';

export default function Optimize() {
  const [selectedVehicles, setSelectedVehicles] = useState<Vehicle[]>([]);
  const [selectedStops, setSelectedStops] = useState<StopPointAdress[]>([]);

  const STOPS = useMemo(() => {
    return MOCK_ADDRESSES.filter((stop) => !stop.StopPoint.IsRecipient);
  }, []);

  const RECIPIENTS = useMemo(() => {
    return MOCK_ADDRESSES.filter((stop) => stop.StopPoint.IsRecipient);
  }, []);

  function addSelectedStop(stop: StopPointAdress) {
    if (selectedStops.includes(stop)) {
      setSelectedStops(
        selectedStops.filter((s) => s.StopPointAdressId !== s.StopPointAdressId)
      );
      return;
    }

    setSelectedStops(selectedStops.concat([stop]));
  }

  function addVehicle(vehicle: Vehicle) {
    if (selectedVehicles.includes(vehicle)) {
      setSelectedVehicles(
        selectedVehicles.filter((v) => v.VehicleId !== vehicle.VehicleId)
      );
      return;
    }

    setSelectedVehicles(selectedVehicles.concat([vehicle]));
  }

  function isVehicleSelected(vehicle: Vehicle) {
    return selectedVehicles.includes(vehicle);
  }
  return (
    <div>
      <div className='grid grid-cols-2 relative'>
        <div className='overflow-y-auto'>
          <PageHeader
            title='Optimera upphämtning'
            subtitle='Välj vilka bilar som du vill arbeta med'
          />
          <div className='p-8 flex flex-row items-center justify-center'>
            {MOCK_VEHICLES.map((vehicle) => {
              const selected = isVehicleSelected(vehicle);
              return (
                <div
                  key={vehicle.VehicleId}
                  className={`h-32 w-48 mx-2 border ${
                    selected
                      ? 'border-indigo-900 bg-indigo-200'
                      : 'border-indigo-600'
                  } p-6 shadow-sm ring-1 ring-indigo rounded flex flex-col justify-center items-center gap-2 text-center`}
                >
                  <span className='font-bold text-lg'>
                    {vehicle.RegistrationNumber}
                  </span>
                  <img
                    alt='Man'
                    src='https://cdn.xxl.thumbs.canstockphoto.com/small-truck-for-transportation-cargo-vector-illustration-isolated-on-white-background-eps-vector_csp23136842.jpg'
                    className='h-10 w-10 rounded-full object-cover m-auto'
                  />
                  <button
                    type={'button'}
                    onClick={() => addVehicle(vehicle)}
                    className={`rounded bg-indigo-500 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700`}
                  >
                    {selected ? 'Välj bort fordon' : 'Välj fordon'}
                  </button>
                </div>
              );
            })}
          </div>
          {!!selectedVehicles.length && (
            <div>
              <Table>
                <thead>
                  <tr>
                    <TableHeader name={'Optimera'} />
                    <TableHeader name={'Brand'} />
                    <TableHeader name={'Address'} />
                  </tr>
                </thead>
                <TableBody>
                  {STOPS.map((s) => (
                    <SelectableStopTableRow
                      key={s.StopPointAdressId}
                      stop={s}
                      value={selectedStops.includes(s)}
                      onSelect={(stop) => {
                        addSelectedStop(stop);
                      }}
                    />
                  ))}
                </TableBody>
              </Table>
              <div className='flex w-full items-center justify-center mt-4 mb-8'>
                <button
                  type={'button'}
                  onClick={() => setSelectedStops(STOPS)}
                  className={`rounded bg-indigo-500 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700`}
                >
                  Välj alla stopp
                </button>
              </div>
            </div>
          )}
          {!!selectedStops.length && (
            <div>
              <PageHeader
                title='Redo att optimera'
                subtitle='Nu är det bara att trycka på knappen'
              />
              <div className='flex w-full items-center justify-center mt-4 mb-8'>
                <button
                  type={'button'}
                  onClick={() =>
                    doTheRouting({
                      stops: selectedStops,
                      recipients: RECIPIENTS,
                      vehicles: selectedVehicles,
                    })
                  }
                  className={`rounded bg-indigo-500 px-4 py-2 text-lg font-medium text-white hover:bg-indigo-700`}
                >
                  Knappen
                </button>
              </div>
            </div>
          )}
        </div>
        <div className='h-full'>
          <Map />
        </div>
      </div>
    </div>
  );
}
