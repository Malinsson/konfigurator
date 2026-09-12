import React from 'react';
import { useWatchConfig } from '../../../context/WatchConfigContext';
import { DIAL_COLOR_OPTIONS } from '../types';
import OptionGroup from '../../../molecules/OptionGroup';
import styles from './StepContent.module.css';

/**
 * DialColorStep Component
 *
 * Second step of the watch configurator.
 * Allows user to select dial color (Silver or Gold).
 *
 * Flow:
 * 1. User selects a color option
 * 2. updateDialColor updates context and 3D model
 */

export default function DialColorStep() {
  const { selections, updateDialColor } = useWatchConfig();

  // Set defaults if not selected yet
  const selectedColor = selections.dialColor || 'silver';

  // Handle color selection
  const handleColorSelect = (colorId: string) => {
    updateDialColor(colorId as 'gold' | 'silver');
  };

  // Initialize defaults on first render
  React.useEffect(() => {
    if (!selections.dialColor) {
      updateDialColor('silver');
    }
  }, [selections.dialColor, updateDialColor]);



  return (
    <div className={styles.container}>
      
      {/* Section Header */}
      <div className={styles.sectionHeader}>
        <div className={styles.header}>
          <h1>Nord</h1>
          <span>Defined by you</span>
        </div>
        <p>Refined proportions and considered details give Unica its timeless character. Designed to adapt effortlessly to your style.</p>
      </div>

      <div className={styles.options}>

        {/* Step Header */}
        <div className={styles.stepHeader}>
          <h2>2. Dial Color</h2>
        </div>

        {/* Dial Color Options */}
        <div className={styles.optionsSection}>
          <OptionGroup
            label="Color"
            options={DIAL_COLOR_OPTIONS.map(opt => ({ id: opt.id, label: opt.label }))}
            currentSelection={selectedColor}
            onSelect={handleColorSelect}
            cssClassPrefix="dial"
          />
        </div>

      </div>
      <div className={styles.stepFooter}>
        <span>Placeholder for NavButtons</span>
      </div>
    </div>
  );
}
