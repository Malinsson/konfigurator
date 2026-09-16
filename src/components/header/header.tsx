import styles from './header.module.css'
import unicaLogo from '../../assets/logos/unica-logo.svg'
import cartIcon from '../../assets/icons/cart-icon.svg'


export function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <a href="/" className={styles.logoLink} aria-label="UNICA Home">
          <img src={unicaLogo} alt="" className={styles.logo} />
        </a>
        <ul>
          <li><a href="#products">Products</a></li>
          <li><a href="#about">About us</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <button
        className={styles.cartButton}
        aria-label="Shopping cart"
      >
        <img src={cartIcon} alt="" />
      </button>
    </header>
  )
}