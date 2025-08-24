import styles from './styles/banner.module.css'

export default function Banner({ src, alt }) {
  return (
    <figure className={styles.card}>
      <img src={src} alt={alt} className={styles.image} />
    </figure>
  );
}