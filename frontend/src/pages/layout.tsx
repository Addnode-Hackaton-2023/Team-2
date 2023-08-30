import { PropsWithChildren } from 'react';
import { Sidebar } from '@/components/sidebar';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className='flex'>
      <Sidebar />
      <main className='w-screen bg-gray-200 text-black'>{children}</main>
    </div>
  );
}
