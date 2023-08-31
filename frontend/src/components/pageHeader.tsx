type PageHeaderProps = {
  title: string;
  subtitle: string;
};

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className='bg-gray-50 mb-8'>
      <div className='max-w-screen-xl px-8 py-6'>
        <h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>
          {title}
        </h1>
        <p className='mt-1.5 text-sm text-gray-500'>{subtitle}</p>
      </div>
    </header>
  );
}
