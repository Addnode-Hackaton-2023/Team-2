import { PropsWithChildren } from 'react';
import { Sidebar } from '@/components/sidebar';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <main className='w-screen overflow-y-auto bg-gray-200 text-black'>
        {children}
      </main>
    </div>
  );
}
