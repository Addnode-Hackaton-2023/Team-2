import Head from 'next/head';
import styles from '../styles/layout.module.css';

export default function Layout({ children }: any) {
  return (
    <>
      <Head>
        <title>Team Flyt</title>
      </Head>
      <div className={styles.layout}>
        <header className={styles.header}>Placeholder</header>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
}
