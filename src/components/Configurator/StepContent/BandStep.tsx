import React from 'react';
import { useWatchConfig } from '../../../context/WatchConfigContext';
import { BAND_OPTIONS } from '../types';
import OptionGroup from '../../../molecules/OptionGroup';
import styles from './StepContent.module.css';

/**
 * BandStep Component
 *
 * First step of the watch configurator.
 * Allows user to select band material (Metal, Leather) and color.
 *
 * Flow:
 * 1. User selects material category (Metal or Leather)
 * 2. OptionGroup shows sub-options (Gold/Silver for Metal, Brown/Black for Leather)
 * 3. User selects specific color
 * 4. updateBandSelection updates context and 3D model
 */

export default function BandStep() {
  const { selections, updateBandSelection } = useWatchConfig();

  // Set defaults if not selected yet
  const selectedCategory = selections.band.category || 'steel';
  const selectedColor = selections.band.type || 'silver';
  const colorOptions = BAND_OPTIONS.subOptions?.[selectedCategory] || [];

  // Initialize defaults on first render
  React.useEffect(() => {
    if (!selections.band.category) {
      updateBandSelection('steel', 'silver');
    }
  }, []);

  // Handle material category selection
  const handleMaterialSelect = (materialId: string) => {
    // Get the default color for this material (first option)
    const defaultColor = BAND_OPTIONS.subOptions?.[materialId as 'steel' | 'leather']?.[0]?.id || 'silver';
    updateBandSelection(materialId as 'steel' | 'leather', defaultColor);
  };

  // Handle color selection for the selected material
  const handleColorSelect = (colorId: string) => {
    updateBandSelection(selectedCategory as 'steel' | 'leather', colorId);
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.options}>

        {/* Step Header */}
        <div className={styles.stepHeader}>
          <h2>1. Strap Material & Color</h2>
        </div>

        {/* Band Material Options (Row 1) */}
        <div className={styles.optionsSection}>
          <OptionGroup
            label="Material"
            options={BAND_OPTIONS.options} // [Steel, Leather]
            currentSelection={selectedCategory}
            onSelect={handleMaterialSelect}
            cssClassPrefix="" // Material options use just their id as class (steel, leather)
          />
        </div>

        {/* Band Color Options (Row 2) - Always shown */}
        <div className={styles.optionsSection}>
          <OptionGroup
            label="Color"
            options={colorOptions}
            currentSelection={selectedColor}
            onSelect={handleColorSelect}
            cssClassPrefix={selectedCategory} // For CSS class naming: steel-silver, leather-black, etc
          />
        </div>

      </div>

    </div>
  );
}
