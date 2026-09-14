import React from 'react';
import { useWatchConfig } from '../../../context/WatchConfigContext';
import { DIAL_COLOR_OPTIONS } from '../types';
import OptionGroup from '../../../molecules/OptionGroup';
import styles from './StepContent.module.css';

/**
 * WatchCaseStep Component
 *
 * Second step of the watch configurator.
 * Allows user to select watch case color (Silver or Gold).
 *
 * Flow:
 * 1. User selects a color option
 * 2. updateWatchCaseColor updates context and 3D model
 */

export default function WatchCaseStep() {
  const { selections, updateWatchCaseColor } = useWatchConfig();

  // Set defaults if not selected yet
  const selectedColor = selections.watchCaseColor || 'silver';

  // Handle color selection
  const handleColorSelect = (colorId: string) => {
    updateWatchCaseColor(colorId as 'gold' | 'silver');
  };

  // Initialize defaults on first render
  React.useEffect(() => {
    if (!selections.watchCaseColor) {
      updateWatchCaseColor('silver');
    }
  }, [selections.watchCaseColor, updateWatchCaseColor]);

  return (
    <div className={styles.container}>

      <div className={styles.options}>

        {/* Step Header */}
        <div className={styles.stepHeader}>
          <h2>2. Watch Case</h2>
        </div>

        {/* Watch Case Color Options */}
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

    </div>
  );
}
