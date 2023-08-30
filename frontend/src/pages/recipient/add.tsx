import Map, { SearchResult } from '@/components/map';
import { Brand } from '@/types/Brand';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

type CreateRecipientForm = {
  address: string;
  comment: string;
  name: string;
  brand: Brand;
};

export default function RecipientPage() {
  const { register, handleSubmit, setValue } = useForm<CreateRecipientForm>();
  const onSubmit = handleSubmit((data) => console.log(data));
  const searchCallback = useCallback(
    (result: SearchResult) => {
      if (result && result.result.name) {
        setValue('address', result.result.name);
      }
    },
    [setValue]
  );
  return (
    <div>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8'>
        <div className='p-8'>
          <h1 className='text-3xl font-bold'>Skapa ny mottagare</h1>
          <form onSubmit={onSubmit}>
            <div className='flex'>
              <div className=''>
                <label className='mt-4 block'>Namn</label>
                <input
                  type='text'
                  {...register('name')}
                  placeholder='ICA Maxi..'
                  className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm px-4 py-2'
                />
                <label className='mt-4 block'>Kommentar</label>
                <input
                  type='text'
                  {...register('comment')}
                  placeholder='Något speciellt att tänka på'
                  className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm px-4 py-2'
                />
                <label htmlFor='brand-select' className='mt-4 block'>
                  Butikskedja
                </label>

                <select
                  name='brand-select'
                  id='brand-select'
                  className='p-2 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm'
                >
                  <option value=''>Välj butikskedja</option>
                  <option value='1'>Lidl</option>
                  <option value='2'>SJ Bistro</option>
                </select>

                <label className='mt-4 block'>Address</label>
                <input
                  type='text'
                  {...register('address')}
                  placeholder='Stadsvägen 123'
                  className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm px-4 py-2'
                />
                <small>
                  Skriv en address själv eller välj (och sök) ur kartan
                </small>
              </div>
            </div>
            <input
              className='my-8 ml-auto rounded bg-indigo-600 text-xs font-medium text-white hover:bg-indigo-700 h-fit py-4 px-4'
              type='submit'
              value='Skapa ny mottagare'
            />
          </form>
        </div>
        <div>
          <Map enableSearch searchCallback={searchCallback} />
        </div>
      </div>
    </div>
  );
}
