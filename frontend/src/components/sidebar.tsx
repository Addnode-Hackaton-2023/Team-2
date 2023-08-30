import { useRouter } from 'next/router';
import { useCallback } from 'react';
import Link from 'next/link';

export function Sidebar() {
  return (
    <div className='flex h-full flex-col justify-between bg-white min-w-fit'>
      <div className='px-4 py-6'>
        <SidebarLogo />
        <ul className='mt-6 space-y-1'>
          <SidebarRow text='Dashboard' url={'/'} />
          <SidebarRow text='Förare' url={'/driver'} />
          <SidebarRow indent text='Boka förare' url={'/calendar'} />
          <SidebarRow text='Karta' url={'/map'} />
          <SidebarRow text='Mottagare' url={'/recipient'} />
          <SidebarRow indent text='Ny Mottagare' url={'/recipient/add'} />
          <SidebarRow text='Affär' url={'/store'} />
          <SidebarRow text='Fordon' url={'/vehicle'} />
        </ul>
      </div>
      <SidebarUser avatar='' email='user@example.com' name='Example User' />
    </div>
  );
}

interface SidebarRow {
  text: string;
  url: string;
  indent?: boolean;
}

function SidebarRow({ text, url, indent }: SidebarRow) {
  return (
    <li>
      <Link
        href={url}
        className={`block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 ${
          indent ? 'pl-4' : 'pl-0'
        }`}
      >
        {text}
      </Link>
    </li>
  );
}

function SidebarLogo() {
  return (
    <span className='grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600'>
      Team FLYT
    </span>
  );
}

interface SidebarUserProps {
  name: string;
  email: string;
  avatar: string;
}

function SidebarUser({ name, email, avatar }: SidebarUserProps) {
  return (
    <div className='sticky inset-x-0 bottom-0 border-t border-gray-100 text-black'>
      <a
        href='#'
        className='flex items-center gap-2 bg-white p-4 hover:bg-gray-50'
      >
        <img
          alt='Man'
          src='https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
          className='h-10 w-10 rounded-full object-cover'
        />

        <div>
          <p className='text-xs'>
            <strong className='block font-medium'>{name}</strong>

            <span>{email}</span>
          </p>
        </div>
      </a>
    </div>
  );
}
