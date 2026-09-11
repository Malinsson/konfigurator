import styles from './NavigationButton.module.css';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

type NavigationButtonProps = {
  stepDirection: 'next' | 'back';
  isActive: boolean;
  onClick: () => void;
};

export function NavigationButton({ stepDirection, isActive, onClick }: NavigationButtonProps) {

    if (stepDirection === 'next') {
        return (
            <button
                className={`${styles.navigationButton} ${isActive ? styles.active : ''}`}
                onClick={onClick}
            >
                Next
                <ChevronRightIcon className={styles.icon} />
            </button>
        );
    }

    return (
        <button
        className={`${styles.navigationButton} ${isActive ? styles.active : ''}`}
        onClick={onClick}
        >
                <ChevronLeftIcon className={styles.icon} />
                Back
        </button>
    );
}