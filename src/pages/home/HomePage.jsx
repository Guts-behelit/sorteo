import Banner from '../../components/Banner';
import styles from './styles/homePage.module.css'
import bannerImage from '../../../public/img/banner.png'

export default function HomePage(){
  return (
    <div className={styles.container}>
      <Banner src={bannerImage} alt={'imagen de banner'}/>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Crea, gestiona<br />
          y comparte tus<br />
          sorteos fácilmente
        </h1>
        
        <div className={styles.heroButtons}>
          <button className={styles.primaryButton}>
            Crea tu sorteo
          </button>
          <button className={styles.secondaryButton}>
            Ver ejemplos
          </button>
        </div>
      </div>

      <div className={styles.features}>
        <div className={`${styles.featureCard} ${styles.featureCardGreen}`}>
          <div className={styles.featureIcon}>
            <div className={styles.giftIcon}>
              <div className={styles.giftBox}></div>
              <div className={styles.giftRibbon}></div>
              <div className={styles.giftBow}></div>
            </div>
          </div>
          <h3 className={styles.featureTitle}>
            Gestión<br />
            simple<br />
            de sorteos
          </h3>
          <p className={styles.featureDescription}>
            Sube premios,<br />
            reglas, fechas
          </p>
        </div>

        <div className={`${styles.featureCard} ${styles.featureCardPink}`}>
          <div className={styles.featureIcon}>
            <div className={styles.mailIcon}>
              <div className={styles.mailBody}></div>
              <div className={styles.mailFlap}></div>
              <div className={styles.mailPerson}></div>
            </div>
          </div>
          <h3 className={styles.featureTitle}>
            Correos<br />
            automáticos<br />
            a compradores
          </h3>
        </div>

        <div className={`${styles.featureCard} ${styles.featureCardBlue}`}>
          <div className={styles.featureIcon}>
            <div className={styles.securityIcon}>
              <div className={styles.personCircle}></div>
              <div className={styles.personBody}></div>
              <div className={styles.shieldBadge}></div>
            </div>
          </div>
          <h3 className={styles.featureTitle}>
            Seguridad<br />
            y transp-<br />
            arencia
          </h3>
        </div>
      </div>

      <div className={styles.examples}>
        <h2 className={styles.examplesTitle}>
          Ejemplos de sorteos destacados
        </h2>
        
        <div className={styles.exampleCards}>
          <div className={`${styles.exampleCard} ${styles.exampleCardBlue}`}>
            <div className={styles.exampleIcon}>
              <div className={styles.phoneIcon}>
                <div className={styles.phoneBody}></div>
                <div className={styles.phoneButton}></div>
              </div>
            </div>
            <h3 className={styles.exampleTitle}>
              Sorteo iPhone 15
            </h3>
            <p className={styles.exampleTime}>
              9 días
            </p>
            <button className={styles.participateButton}>
              Participar
            </button>
          </div>

          <div className={`${styles.exampleCard} ${styles.exampleCardPink}`}>
            <div className={styles.exampleIcon}>
              <div className={styles.shieldIcon}>
                <div className={styles.shieldBody}></div>
                <div className={styles.shieldCheck}>✓</div>
              </div>
            </div>
            <h3 className={styles.exampleTitle}>
              Seguridad y<br />
              transparencia
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

