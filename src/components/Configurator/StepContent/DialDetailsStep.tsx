import React from 'react';
import { useWatchConfig } from '../../../context/WatchConfigContext';
import { DIAL_DETAILS_OPTIONS } from '../types';
import OptionGroup from '../../../molecules/OptionGroup';
import styles from './StepContent.module.css';

/**
 * DialDetailsStep Component
 *
 * Third step of the watch configurator.
 * Allows user to select dial details (background and index lines).
 *
 * Flow:
 * 1. User selects an index option (with or without lines)
 * 2. User selects a background option (west, white, or black)
 * 3. updateDialDetails updates context and 3D model
 */

export default function DialDetailsStep() {
  const { selections, updateDialDetails} = useWatchConfig();

  // Set defaults if not selected yet
  const selectedIndex = selections.dialDetails?.index || 'with';
  const selectedBackground = selections.dialDetails?.background || 'west';

  // Handle background selection
  const handleBackgroundSelect = (backgroundId: string) => {
    updateDialDetails(backgroundId as 'west' | 'black' | 'white', selectedIndex);
  };

  // Handle index selection
  const handleIndexSelect = (indexId: string) => {
    updateDialDetails(selectedBackground, indexId as 'with' | 'without');
  };

  // Initialize defaults on first render
  React.useEffect(() => {
    if (!selections.dialDetails?.background || !selections.dialDetails?.index) {
      updateDialDetails('west', 'with');
    }
  }, [selections.dialDetails, updateDialDetails]);



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
          <h2>3. Dial Styles & Details</h2>
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

        {/* Dial Background Options */}
        <div className={styles.optionsSection}>
          <OptionGroup
            label="Background"
            options={DIAL_DETAILS_OPTIONS.background.map(opt => ({ id: opt.id, label: opt.label }))}
            currentSelection={selectedBackground}
            onSelect={handleBackgroundSelect}
            cssClassPrefix="dial-details"
          />
        </div>

      </div>
      <div className={styles.stepFooter}>
        <span>Placeholder for NavButtons</span>
      </div>
    </div>
  );
}
