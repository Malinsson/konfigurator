import React from 'react';
import { useWatchConfig } from '../../../context/WatchConfigContext';
import { DIAL_COLOR_OPTIONS } from '../types';
import OptionGroup from '../../../molecules/OptionGroup';
import styles from './StepContent.module.css';

/**
 * DialColorStep Component
 *
 * Fourth step of the watch configurator.
 * Allows user to select dial color (Silver or Gold).
 *
 * Flow:
 * 1. User selects a color option
 * 2. updateDialColor updates context and 3D model
 */

export default function DialColorStep() {
  const { selections, updateDialColor } = useWatchConfig();

  // Set defaults if not selected yet
  const selectedColor = selections.dialColor || 'white';

  // Handle color selection
  const handleColorSelect = (colorId: string) => {
    updateDialColor(colorId as 'black' | 'white');
  };

  // Initialize defaults on first render
  React.useEffect(() => {
    if (!selections.dialColor) {
      updateDialColor('white');
    }
  }, [selections.dialColor, updateDialColor]);



  return (
    <div className={styles.container}>

      <div className={styles.options}>

        {/* Step Header */}
        <div className={styles.stepHeader}>
          <h2>4. Dial Color</h2>
        </div>

        {/* Dial Color Options */}
        <div className={styles.optionsSection}>
          <OptionGroup
            label="Dial Color"
            options={DIAL_COLOR_OPTIONS.map(opt => ({ id: opt.id, label: opt.label }))}
            currentSelection={selectedColor}
            onSelect={handleColorSelect}
            cssClassPrefix="dial"
          />
        </div>

      </div>

    </div>
  );
}
