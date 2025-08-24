import styles from './styles/navbar.module.css'

// src/components/Navbar.jsx
import { useState } from "react";
import { Link,NavLink } from 'react-router';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(o => !o);
  const close = () => setOpen(false);

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>

        <div className={styles.menuMobile}>
          <Link to="/" className={styles.brand} onClick={close}>
          <span aria-hidden>🎉</span> SorteaPE
        </Link>

        <button
          className={styles.toggle}
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={toggle}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
        </div>
        <nav className={styles.nav} role="navigation" aria-label="Principal">
          <ul
            id="primary-nav"
            className={[styles.menu, open ? styles.menuOpen : ""].join(" ")}
            onClick={close}
          >
            <li><NavLink to="/" className={({isActive}) =>
              [styles.link, isActive ? styles.active : ""].join(" ")}>Inicio</NavLink></li>

            <li><NavLink to="/raffles/create" className={({isActive}) =>
              [styles.link, isActive ? styles.active : ""].join(" ")}>Crear Sorteo</NavLink></li>

            <li><NavLink to="/raffles" className={({isActive}) =>
              [styles.link, isActive ? styles.active : ""].join(" ")}>Sorteos</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
