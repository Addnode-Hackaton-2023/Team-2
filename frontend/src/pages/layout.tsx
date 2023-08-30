import { PropsWithChildren, useCallback } from 'react';
import { useRouter } from 'next/router';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

const PAGES = [
  { title: 'Home', path: '/' },
  { title: 'Admin', path: '/admin' },
  { title: 'Store', path: '/store' },
  { title: 'Recipient', path: '/recipient' },
];

const Navbar = () => {
  const { pathname, push } = useRouter();
  const onClick = useCallback((newPath: string) => push(newPath), [push]);

  return (
    <nav className='flex justify-center items-center h-10 gap-4'>
      {PAGES.map(({ title, path }) => (
        <div
          key={path}
          className={`px-2 py-1 cursor-pointer ${
            pathname === path ? 'border-b border-gray-100' : ''
          } hover:bg-gray-500`}
          onClick={() => onClick(path)}
        >
          {title}
        </div>
      ))}
    </nav>
  );
};
