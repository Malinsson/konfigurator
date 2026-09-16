import styles from './NavigationButton.module.css';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

type NavigationButtonProps = {
  stepDirection: 'next' | 'back';
  active?: boolean;
  onClick?: () => void;
  buttonText?: string;
  className?: string;
};

export function NavigationButton({ 
    stepDirection, 
    active = true,
    onClick, 
    buttonText = stepDirection === 'next' ? 'Next' : 'Back', 
    className }: NavigationButtonProps) {

    if (stepDirection === 'next') {
        return (
            <button
                className={`${styles.navigationButton} ${className || ''} ${!active ? styles.disabled : ''}`}
                onClick={onClick}
                disabled={!active}
            >
                {buttonText}
                <ChevronRightIcon className={styles.icon} aria-hidden="true" />
            </button>
        );
    }

    return (
        <button
        className={`${styles.navigationButton} ${className || ''} ${!active ? styles.disabled : ''}`}
        onClick={onClick}
        disabled={!active}
        >
                <ChevronLeftIcon className={styles.icon} aria-hidden="true" />
                {buttonText}
        </button>
    );
}