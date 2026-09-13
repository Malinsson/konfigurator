import styles from './NavigationButton.module.css';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

type NavigationButtonProps = {
  stepDirection: 'next' | 'back';
  onClick: () => void;
  buttonText?: string;
  className?: string;
};

export function NavigationButton({ stepDirection, onClick, buttonText = stepDirection === 'next' ? 'Next' : 'Back', className }: NavigationButtonProps) {

    if (stepDirection === 'next') {
        return (
            <button
                className={`${styles.navigationButton} ${className || ''}`}
                onClick={onClick}
            >
                {buttonText}
                <ChevronRightIcon className={styles.icon} />
            </button>
        );
    }

    return (
        <button
        className={`${styles.navigationButton} ${className || ''}`}
        onClick={onClick}
        >
                <ChevronLeftIcon className={styles.icon} />
                {buttonText}
        </button>
    );
}