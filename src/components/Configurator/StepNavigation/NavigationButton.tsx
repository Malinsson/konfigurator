import styles from './NavigationButton.module.css';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

type NavigationButtonProps = {
  stepDirection: 'next' | 'back';
  onClick: () => void;
};

export function NavigationButton({ stepDirection, onClick }: NavigationButtonProps) {

    if (stepDirection === 'next') {
        return (
            <button
                className={`${styles.navigationButton}`}
                onClick={onClick}
            >
                Next
                <ChevronRightIcon className={styles.icon} />
            </button>
        );
    }

    return (
        <button
        className={`${styles.navigationButton}`}
        onClick={onClick}
        >
                <ChevronLeftIcon className={styles.icon} />
                Back
        </button>
    );
}