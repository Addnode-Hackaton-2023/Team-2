import { getToken, oauthHref } from '@/util/auth';

export default function LoginPage() {
  return (
    <div className='m-8'>
      {/* <button
        type='button'
        onClick={() => getToken()}
        className='inline-ml-auto rounded bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-700'
      >
        Log in
      </button> */}
      <a
        href={oauthHref}
        className='inline-ml-auto rounded bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-700'
      >
        Log in
      </a>
    </div>
  );
}
