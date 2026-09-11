import styles from './StepItem.module.css';

export function StepItem({ step, isActive }: { step: string; isActive: boolean;}) {

    return (
        <div className={`${styles.step} ${isActive ? '' : styles.stepInactive}`}>
            {step}
        </div>
    );
}