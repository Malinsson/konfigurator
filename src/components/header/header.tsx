import styles from './header.module.css'
import { ShoppingBagIcon } from '@heroicons/react/24/outline';


export function Header() {
  return (
    <header className={styles.header}>
      <h1>LOGO</h1>
      <nav>
        <ul>
          <li><a href="#">Products</a></li>
          <li><a href="#">About us</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <ShoppingBagIcon />
      </nav>
    </header>
  )
}