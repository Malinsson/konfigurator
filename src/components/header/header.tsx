import styles from './header.module.css'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import unicaLogo from '../../assets/logos/unica-logo.png'


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
      <ShoppingBagIcon className={styles.shoppingBagIcon} />
    </header>
  )
}