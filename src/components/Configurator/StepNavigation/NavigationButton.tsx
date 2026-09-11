import styles from './NavigationButton.module.css';

type NavigationButtonProps = {
  stepDirection: 'next' | 'back';
  isActive: boolean;
  onClick: () => void;
};

export function NavigationButton({ stepDirection, isActive, onClick }: NavigationButtonProps) {
  return (
    <button
      className={`${styles.navigationButton} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      {stepDirection === 'next' ? 'Next' : 'Back'}
    </button>
  );
}