import styles from './header.module.css'
import unicaLogo from '../../assets/logos/unica-logo.svg'
import cartIcon from '../../assets/icons/cart-icon.svg'


export function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <img src={unicaLogo} alt="UNICA" className={styles.logo} />
        <ul>
          <li><a href="#">Products</a></li>
          <li><a href="#">About us</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
      <img src={cartIcon} alt="Shopping cart" className={styles.shoppingBagIcon} />
    </header>
  )
}