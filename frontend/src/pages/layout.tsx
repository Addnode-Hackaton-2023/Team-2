import { PropsWithChildren, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Sidebar } from '@/components/sidebar';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className='flex'>
      <Sidebar />
      <main className='w-screen bg-gray-200 text-black'>{children}</main>
    </div>
  );
}
const Navbar = () => {
  return (
    <Sidebar />
    // <nav className='flex justify-center items-center h-10 gap-4'>
    //   {PAGES.map(({ title, path }) => (
    //     <div
    //       key={path}
    //       className={`px-2 py-1 cursor-pointer ${
    //         pathname === path ? 'border-b border-gray-100' : ''
    //       } hover:bg-gray-500`}
    //       onClick={() => onClick(path)}
    //     >
    //       {title}
    //     </div>
    //   ))}
    // </nav>
  );
};
