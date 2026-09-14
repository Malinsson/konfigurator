import React from 'react';
import { useWatchConfig } from '../../../context/WatchConfigContext';
import { DIAL_DETAILS_OPTIONS } from '../types';
import OptionGroup from '../../../molecules/OptionGroup';
import styles from './StepContent.module.css';

/**
 * DialDetailsStep Component
 *
 * Fourth step of the watch configurator.
 * Allows user to select dial index lines and color.
 *
 * Flow:
 * 1. User selects an index option (with or without lines)
 * 2. User selects a color option (silver or gold)
 * 3. updateDialDetails updates context and 3D model
 */

export default function DialDetailsStep() {
  const { selections, updateDialDetails} = useWatchConfig();

  // Set defaults if not selected yet
  const selectedIndex = selections.dialDetails?.index || 'with';
  const selectedColor = selections.dialDetails?.color || 'silver';

  // Handle color selection
  const handleColorSelect = (colorId: string) => {
    updateDialDetails(colorId as 'silver' | 'gold', selectedIndex);
  };

  // Handle index selection
  const handleIndexSelect = (indexId: string) => {
    updateDialDetails(selectedColor, indexId as 'with' | 'without');
  };

  // Initialize defaults on first render
  React.useEffect(() => {
    if (!selections.dialDetails?.color || !selections.dialDetails?.index) {
      updateDialDetails('silver', 'with');
    }
  }, [selections.dialDetails, updateDialDetails]);



  return (
    <div className={styles.container}>

      <div className={styles.options}>

        {/* Step Header */}
        <div className={styles.stepHeader}>
          <h2>3. Index & Details</h2>
        </div>

        {/* Dial Index Options */}
        <div className={styles.optionsSection}>
          <OptionGroup
            label="Index"
            options={DIAL_DETAILS_OPTIONS.index.map(opt => ({ id: opt.id, label: opt.label }))}
            currentSelection={selectedIndex}
            onSelect={handleIndexSelect}
            cssClassPrefix="dial-index"
          />
        </div>

        {/* Dial Color Options */}
        <div className={styles.optionsSection}>
          <OptionGroup
            label="Color"
            options={DIAL_DETAILS_OPTIONS.color.map(opt => ({ id: opt.id, label: opt.label }))}
            currentSelection={selectedColor}
            onSelect={handleColorSelect}
            cssClassPrefix="dial"
          />
        </div>

      </div>

    </div>
  );
}
