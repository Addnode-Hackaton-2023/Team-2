'use client';

import { MOCK_DRIVERS } from '@/mock/MOCK_DRIVERS';
import { Driver } from '@/types/Driver';
import { randomChoice } from '@/util/random';
import { parseDate } from '@internationalized/date';
import { addDays, format } from 'date-fns';
import { useEffect, useState } from 'react';
import {
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  Button,
  Calendar,
  Heading,
  CalendarGrid,
  CalendarCell,
} from 'react-aria-components';

type BookedDrivers = {
  [key: string]: {
    driverName: string;
    date: Date;
  };
};

function mockBookedDrivers(drivers: Array<Driver>): BookedDrivers {
  const bookedDrivers: BookedDrivers = {};

  Array.from({ length: 10 }).map((_, i) => {
    const now = new Date();
    const randomDriver = randomChoice(drivers);
    bookedDrivers[format(addDays(now, i + 1), 'yyyy-MM-dd')] = {
      driverName: randomDriver.Namn,
      date: addDays(now, i + 1),
    };
  });
  return bookedDrivers;
}

export default function CalendarPage() {
  const [date, setDate] = useState(parseDate('2023-08-30'));
  const [drivers, setDrivers] = useState<Driver[]>();
  const [bookedDrivers, setBookedDrivers] = useState<BookedDrivers>({});

  useEffect(() => {
    const drivers = MOCK_DRIVERS;
    setBookedDrivers(mockBookedDrivers(drivers));
    setDrivers(drivers);
  }, []);

  function getDriverForDate(dateStr: string) {
    if (bookedDrivers[dateStr]) {
      return bookedDrivers[dateStr].driverName;
    }

    return '-';
  }

  function bookDriver(driver: Driver) {
    setBookedDrivers({
      ...bookedDrivers,
      ...{
        [date.toString()]: {
          driverName: driver.Namn,
          date: date.toDate('UTC'),
        },
      },
    });
  }

  const valueSelected = !!date && drivers && drivers.length;

  return (
    <>
      <Calendar
        aria-label='Appointment date'
        className={'w-full'}
        value={date}
        onChange={(date) => setDate(date)}
      >
        <header className='flex flex-row items-center justify-center gap-4 m-4'>
          <Button
            slot='previous'
            className='rounded bg-indigo-500 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700'
          >
            Föregående
          </Button>
          <Heading />

          <Button
            slot='next'
            className='rounded bg-indigo-500 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700'
          >
            Nästa
          </Button>
        </header>
        <CalendarGrid className='w-full'>
          <CalendarGridHeader>
            {(day) => (
              <CalendarHeaderCell style={{ color: 'var(--blue)' }}>
                {day}
              </CalendarHeaderCell>
            )}
          </CalendarGridHeader>
          <CalendarGridBody>
            {(date) => (
              <CalendarCell
                date={date}
                className='h-32 bg-slate-400 border-sky-100 flex flex-col items-center justify-center'
              >
                <div className='align-self-start'>{date.toString()}</div>
                <div>{getDriverForDate(date.toString())}</div>
              </CalendarCell>
            )}
          </CalendarGridBody>
        </CalendarGrid>
      </Calendar>
      {valueSelected && (
        <>
          <h1 className='text-3xl font-bold pt-8 px-4'>
            Planera förare {date.toString()}
          </h1>
          <div className='flex flex-row items-center justify-center'>
            {drivers.map((driver) => {
              return (
                <div
                  key={driver.DriverId}
                  className='h-32 w-48 mx-2 bg-slate-400 border-sky-100 rounded flex flex-col justify-center items-center gap-2 text-center'
                >
                  <span className='font-bold text-lg'>{driver.Namn}</span>
                  <img
                    alt='Man'
                    src='https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                    className='h-10 w-10 rounded-full object-cover'
                  />
                  <button
                    type={'button'}
                    onClick={() => bookDriver(driver)}
                    className='rounded bg-indigo-500 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700'
                  >
                    Välj förare
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

function Driver({ driver }: { driver: Driver }) {}
