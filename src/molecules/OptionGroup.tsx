import { type Option } from '../components/Configurator/types';
import OptionButton from './OptionButton';
import styles from './OptionGroup.module.css';

/**
 * OptionGroup Component
 *
 * Displays a group of selectable options with an optional label.
 * Supports nested options (subOptions) for hierarchical selections.
 *
 * Props:
 * - label: Title for the option group (e.g., "Material", "Band Type")
 * - options: Array of Option objects to display
 * - subOptions: (optional) Record of nested options keyed by parent option id
 * - currentSelection: Currently selected option id (or category for nested)
 * - onSelect: Callback when an option is selected, receives the selected option id
 * - cssClassPrefix: (optional) Prefix for CSS classes applied to buttons
 *
 * Usage:
 * <OptionGroup
 *   label="Material"
 *   options={BAND_OPTIONS.options}
 *   subOptions={BAND_OPTIONS.subOptions}
 *   currentSelection={selections.band.category}
 *   onSelect={(id) => updateBandSelection(id, null)}
 *   cssClassPrefix="metal"
 * />
 */

interface OptionGroupProps {
  label: string;
  options: Option[];
  subOptions?: Record<string, Option[]>;
  currentSelection?: string | null;
  onSelect: (selection: string) => void;
  cssClassPrefix?: string;
}

export default function OptionGroup({
  label,
  options,
  subOptions,
  currentSelection,
  onSelect,
  cssClassPrefix,
}: OptionGroupProps) {
  // Use prop directly - parent component (BandStep) manages the selection state
  const selectedCategory = currentSelection || null;

  // Determine which options to display
  const displayOptions = selectedCategory && subOptions?.[selectedCategory]
    ? subOptions[selectedCategory]
    : options;

  // Determine if we're showing nested options
  const isShowingSubOptions = selectedCategory && subOptions?.[selectedCategory];

  const handleOptionSelect = (optionId: string) => {
    // Simply pass selection to parent - parent handles state management
    onSelect(optionId);
  };

  // Get the label of the currently selected option for subtext
  const selectedOptionLabel = displayOptions.find(
    (opt) => opt.id === currentSelection
  )?.label;

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      {selectedOptionLabel && (
        <span className={styles.subtext}>{selectedOptionLabel}</span>
      )}

      <div className={styles.optionsGrid}>
        {displayOptions.map((option) => {
          // Determine if this option is selected
          const isSelected = isShowingSubOptions
            ? option.id === currentSelection
            : option.id === selectedCategory;

          // Build CSS class name for styling (e.g., "steel-silver", "leather-black")
          const cssClass = cssClassPrefix
            ? `${cssClassPrefix}-${option.id}`
            : option.id;

          return (
            <div key={option.id} className={styles.optionButtonWrapper}>
              <OptionButton
                label={option.label}
                isSelected={isSelected}
                onClick={() => handleOptionSelect(option.id)}
                cssClass={cssClass}
              />
            </div>
          );
        })}
      </div>

    </div>
  );
}
