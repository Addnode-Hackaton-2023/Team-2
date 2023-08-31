import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col gap-3 justify-center items-center p-24 ${inter.className}`}
    >
      <h1 className='border-4 border-black pl-6 pr-10 py-4 text-blue-600 text-8xl italic font-bold'>
        FLYT
      </h1>
      <div>Fleet Management Tool™</div>
      <h3 className='text-2xl'>
        <b>F</b>ood <b>L</b>ogistics <b>Y</b>ou <b>T</b>rust
      </h3>
    </main>
  );
}
