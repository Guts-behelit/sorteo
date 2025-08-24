
import styles from './styles/mainLayout.module.css'
import Navbar from '../components/Navbar';

export default function MainLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}
