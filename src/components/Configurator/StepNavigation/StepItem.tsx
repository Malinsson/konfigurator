import styles from './StepItem.module.css';
import { forwardRef } from 'react';

export const StepItem = forwardRef<HTMLDivElement, { step: string; isActive: boolean }>(
  ({ step, isActive }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.step} ${isActive ? '' : styles.stepInactive}`}
      >
        {step}
      </div>
    );
  }
);