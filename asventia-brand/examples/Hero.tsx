/**
 * Example: the asventia.com hero rebuilt with the brand kit (copy taken from the live site).
 * Navy ground, the Estela ribbon drifting in a band under the content, one accent button.
 * Use it as a reference implementation; adapt the markup to the site's own components.
 */
import { Estela } from '../components/Estela';
import { Logo } from '../components/Logo';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.wave} aria-hidden="true">
        <Estela variant="cinta" tone="inverse" width={1200} height={230} animate period={24} />
      </div>

      <nav className={styles.nav} aria-label="Main">
        <Logo height={26} color="var(--on-inverse)" />
        <ul className={styles.links}>
          <li><a href="#agents">Agents</a></li>
          <li><a href="#math">The math</a></li>
          <li><a href="#rollout">Rollout</a></li>
          <li><a href="#team">Team</a></li>
        </ul>
        <a className={`${styles.button} ${styles.small}`} href="#contact">Book a call</a>
      </nav>

      <div className={styles.content}>
        <p className={`type-eyebrow ${styles.eyebrow}`}><span className={styles.rule} />Intelligence in motion</p>
        <h1 className={styles.title}>
          AI systems that run <strong>real business operations.</strong>
        </h1>
        <p className={styles.lead}>
          Asventia designs and runs AI agents for mid-sized companies. They take orders on WhatsApp, process supplier
          invoices and answer the phone, inside your ERP, with your team keeping the final say.
        </p>
        <div className={styles.cta}>
          <a className={styles.button} href="#contact">
            Book a 30-minute call
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </a>
          <a className={styles.link} href="#agents">Or see the agents at work</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
